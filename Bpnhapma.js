(function() {
    'use strict';

    // ==========================================
    // 1. CẤU HÌNH HỆ THỐNG (CONFIG)
    // ==========================================
    const CONFIG = {
        apiBase: 'https://api.dis-giveaway.com',
        endpoints: {
            step: '/api/step',
            continue: '/api/continue',
            countdown: '/api/countdown'
        },
        targetWidth: 170,        // Chiều rộng mục tiêu (0xaa = 170)
        targetHeight: 46,        // Chiều cao mục tiêu (0x2e = 46)
        pollingInterval: 2000,   // Thời gian lặp kiểm tra (0x7d0 = 2000ms)
        maxPollAttempts: 30      // Số lần thử tối đa (0x1e = 30)
    };

    // Trạng thái hoạt động nội bộ của Bot
    let STATE = {
        giftCode: null,
        giftToken: null,
        isPolling: false,
        attempts: 0,
        debugMode: true
    };

    // Hệ thống Log dữ liệu ra Console (với CSS định dạng màu sắc)
    const Logger = {
        log: (...args) => STATE.debugMode && console.log('%c[Bot]', 'color: #7289da; font-weight: bold;', ...args, ''),
        warn: (...args) => console.warn('%c[Bot Warn]', 'color: #faa61a; font-weight: bold;', ...args, ''),
        error: (...args) => console.error('%c[Bot Error]', 'color: #f04747; font-weight: bold;', ...args, ''),
        success: (...args) => console.log('%c[Bot Success]', 'color: #43b581; font-weight: bold;', ...args, '')
    };

    Logger.log('Hệ thống đang khởi tạo...');

    // ==========================================
    // 2. TỰ ĐỘNG CLICK PHẦN TỬ MỤC TIÊU (AUTO CLICK)
    // ==========================================
    function autoClickTargetElement() {
        const allElements = document.getElementsByTagName('*');
        let targetElement = null;
        let elementSizeText = '';

        for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            
            // Bỏ qua các phần tử ẩn hoặc không có kích thước
            if (rect.width === 0 || rect.height === 0) continue;

            // Kiểm tra xem kích thước phần tử có khớp với cấu hình không (Cho phép sai số nhỏ)
            const isMatchWidth = Math.abs(rect.width - CONFIG.targetWidth) <= 5;
            const isMatchHeight = Math.abs(rect.height - CONFIG.targetHeight) <= 5;

            // Đoạn mã gốc có thêm một điều kiện kiểm tra kích thước dự phòng (ví dụ khác)
            const isAlternativeMatch = Math.abs(rect.width - 170) <= 5 && Math.abs(rect.height - 46) <= 5;

            if (isMatchWidth || isAlternativeMatch) {
                targetElement = el;
                elementSizeText = Math.round(rect.width) + '×' + Math.round(rect.height);
                break;
            }
        }

        if (!targetElement) {
            Logger.warn('Không tìm thấy phần tử mục tiêu phù hợp.');
            return false;
        }

        // Thực hiện hành động click tự động
        targetElement.click();
        Logger.success('Đã tìm thấy phần tử ' + elementSizeText + ' và tự động Click!');
        
        // Tạo viền đỏ xung quanh nút bấm vừa click để đánh dấu trực quan
        targetElement.style.outline = '3px solid #f04747';
        setTimeout(() => targetElement.style.outline = '', 1000);
        return true;
    }

    // ==========================================
    // 3. CAN THIỆP PHƯƠNG THỨC MẠNG (NETWORK INTERCEPTORS)
    // ==========================================
    
    // Can thiệp AJAX (XMLHttpRequest) để bắt mã token/code ngầm
    function hookXMLHttpRequest() {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url) {
            this._url = url;
            this._method = method;
            return originalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function(body) {
            if (this._url && this._url.includes(CONFIG.endpoints.step)) {
                Logger.log('Đang chặn bắt gói tin XHR: ' + this._method + ' ' + this._url, '...');
                
                try {
                    const urlObj = new URL(this._url, window.location.origin);
                    STATE.giftCode = urlObj.searchParams.get('code') || STATE.giftCode;
                    STATE.giftToken = urlObj.searchParams.get('token') || STATE.giftToken;
                } catch (e) {}

                if (body && typeof body === 'string') {
                    try {
                        const searchParams = new URLSearchParams(body);
                        STATE.giftCode = searchParams.get('code') || STATE.giftCode;
                        STATE.giftToken = searchParams.get('token') || STATE.giftToken;
                    } catch (e) {}
                }

                const originalOnReadyStateChange = this.onreadystatechange;
                this.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        try {
                            const jsonResponse = JSON.parse(this.responseText);
                            if (jsonResponse.success) {
                                if (jsonResponse.token) STATE.giftToken = jsonResponse.token;
                                
                                // Nếu thu thập đủ Code và Token, tiến hành kích hoạt vòng lặp gửi ngầm
                                if (STATE.giftCode && STATE.giftToken && !STATE.isPolling) {
                                    setTimeout(startPollingServer, 500);
                                }
                            }
                        } catch (err) {}
                    }
                    if (originalOnReadyStateChange) originalOnReadyStateChange.apply(this, arguments);
                };
            }
            return originalSend.apply(this, arguments);
        };
    }

    // Can thiệp Fetch API hiện đại để bắt dữ liệu ngầm
    function hookFetch() {
        const originalFetch = window.fetch;
        window.fetch = async function(...args) {
            const [resource] = args;
            const url = typeof resource === 'string' ? resource : resource.url;

            if (url && url.includes(CONFIG.endpoints.step)) {
                const response = await originalFetch.apply(this, args);
                const cloneResponse = response.clone();

                try {
                    const jsonResponse = await cloneResponse.json();
                    if (jsonResponse.success) {
                        if (jsonResponse.token) STATE.giftToken = jsonResponse.token;
                        try {
                            const urlObj = new URL(url, window.location.origin);
                            STATE.giftCode = urlObj.searchParams.get('code') || STATE.giftCode;
                        } catch (err) {}

                        if (STATE.giftCode && STATE.giftToken && !STATE.isPolling) {
                            setTimeout(startPollingServer, 500);
                        }
                    }
                } catch (e) {}
                return response;
            }
            return originalFetch.apply(this, args);
        };
    }

    // ==========================================
    // 4. VÒNG LẶP KIỂM TRA TRẠNG THÁI (POLLING)
    // ==========================================
    function startPollingServer() {
        if (STATE.isPolling || !STATE.giftCode || !STATE.giftToken) return;

        STATE.isPolling = true;
        STATE.attempts = 0;
        Logger.success('Đã cấu hình vòng lặp tự động xác minh...');
        Logger.log('Code: ' + STATE.giftCode + ' | Token: ' + STATE.giftToken, '...');

        const sendPollRequest = async () => {
            if (STATE.attempts >= CONFIG.maxPollAttempts) {
                Logger.error('Quá thời gian chờ phản hồi từ Server!');
                STATE.isPolling = false;
                return;
            }

            STATE.attempts++;
            try {
                const response = await fetch('' + CONFIG.apiBase + CONFIG.endpoints.continue, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'code=' + encodeURIComponent(STATE.giftCode) + '&token=' + encodeURIComponent(STATE.giftToken)
                });

                const data = await response.json();
                
                // Nếu vượt qua thành công bước check và nhận về code cuối cùng
                if (data.success && data.code) {
                    Logger.success('Bẻ khóa thành công! Mã nhận được: ' + data.code, '...');
                    handleSuccess(data.code);
                    STATE.isPolling = false;
                    return;
                }
                setTimeout(sendPollRequest, CONFIG.pollingInterval);
            } catch (error) {
                // Nếu lỗi kết nối, thử lại sau một khoảng thời gian dài hơn (nhân với hệ số từ công thức gốc)
                setTimeout(sendPollRequest, CONFIG.pollingInterval * 2);
            }
        };

        setTimeout(sendPollRequest, 500);
    }

    // ==========================================
    // 5. XỬ LÝ KHI THÀNH CÔNG (SUCCESS OUTPUT)
    // ==========================================
    function handleSuccess(finalCode) {
        console.log('%c[Bot Success] MÃ QUÀ TẶNG: ' + finalCode + ' %c', 'color: #43b581; font-weight: bold;', 'color: default;');
        
        // Tạo một phần tử HTML (giao diện thô) hiển thị mã quà tặng lên màn hình
        const displayDiv = document.createElement('div');
        displayDiv.innerHTML = '<div style="position:fixed;top:10px;right:10px;z-index:9999;background:green;color:white;padding:20px;">Mã của bạn: ' + finalCode + '<br><input type="text" value="' + finalCode + '" id="copyInput"></div>';
        document.body.appendChild(displayDiv);

        // Tự động sao chép mã cuối cùng vào bộ nhớ tạm (Clipboard)
        navigator.clipboard.writeText(finalCode);
    }

    // ==========================================
    // 6. KHỞI CHẠY BOT
    // ==========================================
    hookXMLHttpRequest();
    hookFetch();

    // Thực hiện tìm nút bấm để click sau 1 giây (1000ms)
    setTimeout(() => {
        if (!autoClickTargetElement()) {
            setTimeout(autoClickTargetElement, 1500);
        }
    }, 1000);

    Logger.success('Bot đã được tiêm (Inject) thành công và đang hoạt động.');
    
    // Xuất hàm ra ngoài window để người dùng có thể kích hoạt thủ công bằng Console nếu cần
    window.forceCheckElement = autoClickTargetElement;
})();
