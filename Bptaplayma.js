javascript:(function(){
    // ===== 1. KHỞI TẠO VÀ CHÈN UI STYLES (MODERN FONT SYSTEM) =====
    const styles = `
        #mk-bypass-ui {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 320px;
            background: rgba(25, 35, 55, 0.65);
            backdrop-filter: blur(12px) saturate(160%);
            -webkit-backdrop-filter: blur(12px) saturate(160%);
            border-radius: 16px;
            padding: 20px;
            border: 1px solid rgba(56, 189, 248, 0.4);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 20px rgba(56, 189, 248, 0.2);
            /* Thay đổi bộ font hiện đại, tối giản */
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #e0f2fe;
            z-index: 999999;
            animation: mk-slide 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes mk-slide {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        #mk-bypass-ui .mk-header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px solid rgba(56, 189, 248, 0.2);
            padding-bottom: 10px;
        }
        #mk-bypass-ui .mk-title {
            font-size: 1.25em;
            font-weight: 800; /* Đậm nét kiểu hiện đại */
            letter-spacing: 1.5px;
            background: linear-gradient(45deg, #7dd3fc, #38bdf8, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
        }
        #mk-bypass-ui .mk-subtitle {
            font-size: 0.7em;
            font-weight: 600;
            color: #7dd3fc;
            opacity: 0.8;
            margin-top: 5px;
            letter-spacing: 2px;
        }
        
        /* ===== THANH TRẠNG THÁI KÍNH MỜ XANH LÁ ===== */
        #mk-bypass-ui .mk-status {
            margin: 10px 0;
            padding: 10px;
            background: rgba(16, 185, 129, 0.1);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 8px;
            border-left: 3px solid rgba(52, 211, 153, 0.4);
            font-size: 0.85em;
            font-weight: 500;
            color: #d1fae5;
            transition: all 0.3s ease;
        }
        #mk-bypass-ui .mk-status.active {
            background: rgba(52, 211, 153, 0.25);
            box-shadow: 0 0 15px rgba(52, 211, 153, 0.35);
            border-left-color: #34d399;
            color: #ffffff;
            font-weight: 600;
        }
        #mk-bypass-ui .mk-status-icon {
            display: inline-block;
            font-size: 13px;
            margin-right: 8px;
            color: #a7f3d0;
            transition: all 0.3s;
        }
        #mk-bypass-ui .mk-status.active .mk-status-icon {
            color: #34d399;
            text-shadow: 0 0 8px #34d399;
            animation: mk-pulse 1s infinite;
        }
        
        @keyframes mk-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
        #mk-bypass-ui .mk-loader {
            height: 4px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 2px;
            margin: 15px 0;
            overflow: hidden;
        }
        #mk-bypass-ui .mk-loader-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #34d399, #7dd3fc);
            border-radius: 2px;
            transition: width 0.3s;
        }
        #mk-bypass-ui .mk-loader-bar.animate {
            animation: mk-load 1.5s infinite;
        }
        @keyframes mk-load {
            0% { width: 0%; margin-left: 0; }
            50% { width: 70%; }
            100% { width: 0%; margin-left: 100%; }
        }
        #mk-bypass-ui .mk-result {
            display: none;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.4);
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            margin-top: 15px;
            animation: mk-glow 2s infinite alternate;
        }
        #mk-bypass-ui .mk-result.show {
            display: block;
            animation: mk-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes mk-glow {
            from { box-shadow: 0 0 10px rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.3); }
            to { box-shadow: 0 0 20px rgba(56, 189, 248, 0.4); border-color: rgba(125, 211, 252, 0.6); }
        }
        @keyframes mk-pop {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        #mk-bypass-ui .mk-result-label {
            color: #bae6fd;
            font-size: 0.75em;
            font-weight: 700;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
        }
        #mk-bypass-ui .mk-code {
            font-size: 1.3em;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
            word-break: break-all;
            letter-spacing: 0.5px;
        }
        #mk-bypass-ui .mk-copy {
            background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
            border: none;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-family: inherit;
            font-weight: 700;
            margin-top: 10px;
            font-size: 0.8em;
            letter-spacing: 0.5px;
            transition: all 0.3s;
            box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
        }
        #mk-bypass-ui .mk-copy:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(56, 189, 248, 0.5);
        }
        #mk-bypass-ui .mk-log {
            margin-top: 15px;
            padding: 10px;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 8px;
            max-height: 120px;
            overflow-y: auto;
            /* Log giữ lại kiểu chữ lập trình để dễ nhìn thông số */
            font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 0.75em;
            color: #94a3b8;
        }
        #mk-bypass-ui .mk-log-entry { margin-bottom: 4px; padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
        #mk-bypass-ui .mk-log-entry.info { color: #7dd3fc; }
        #mk-bypass-ui .mk-log-entry.success { color: #34d399; }
        #mk-bypass-ui .mk-log-entry.error { color: #f87171; }
        #mk-bypass-ui .mk-log-entry.bypass { color: #38bdf8; font-weight: 600; }
        
        #mk-bypass-ui .mk-footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid rgba(56, 189, 248, 0.2);
            font-size: 0.75em;
            color: #7dd3fc;
            font-weight: 700;
            letter-spacing: 1.5px;
            opacity: 0.9;
        }
        #mk-bypass-ui .mk-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 25px;
            height: 25px;
            background: rgba(56, 189, 248, 0.15);
            border: none;
            border-radius: 50%;
            color: #7dd3fc;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        #mk-bypass-ui .mk-close:hover {
            background: #38bdf8;
            color: #0f172a;
        }
        #mk-bypass-ui ::-webkit-scrollbar { width: 6px; }
        #mk-bypass-ui ::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        #mk-bypass-ui ::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.5); border-radius: 3px; }
    `;

    // Chèn Stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // ===== 2. KHỞI TẠO DOM UI =====
    const oldUi = document.getElementById('mk-bypass-ui');
    if(oldUi) oldUi.remove();

    const ui = document.createElement('div');
    ui.id = 'mk-bypass-ui';
    ui.innerHTML = `
        <button class="mk-close" onclick="this.parentElement.remove()">✕</button>
        <div class="mk-header">
            <div class="mk-title">⬢ BP TAPLAYMA ⬢</div>
            <div class="mk-subtitle">『 AUTO CLAIM SYSTEM 』</div>
        </div>
        <div class="mk-status" id="mk-step1">
            <span class="mk-status-icon">①</span>
            <strong>Khởi tạo hệ thống...</strong>
        </div>
        <div class="mk-status" id="mk-step2">
            <span class="mk-status-icon">②</span>
            <strong>Đang xử lý...</strong>
        </div>
        <div class="mk-status" id="mk-step3">
            <span class="mk-status-icon">③</span>
            <strong>Hoàn tất...</strong>
        </div>
        <div class="mk-loader">
            <div class="mk-loader-bar" id="mk-loader"></div>
        </div>
        <div class="mk-result" id="mk-result">
            <div class="mk-result-label">◈ TAPLAYMA CODE ◈</div>
            <div class="mk-code" id="mk-code">---</div>
            <button class="mk-copy" id="mk-copybtn">⎘ COPY CODE</button>
        </div>
        <div class="mk-log" id="mk-log"></div>
        <div class="mk-footer">❖ BP TAPLAYMA v2.0 ❖</div>
    `;
    document.body.appendChild(ui);

    // ===== 3. HÀM ĐIỀU KHIỂN UI LOGIC =====
    function log(msg, type='info') {
        const box = document.getElementById('mk-log');
        if (!box) return;
        const entry = document.createElement('div');
        entry.className = `mk-log-entry ${type}`;
        const time = new Date().toLocaleTimeString('vi-VN', {hour12:false});
        entry.textContent = `[${time}] ${msg}`;
        box.appendChild(entry);
        box.scrollTop = box.scrollHeight;
        console.log(`%c[BP-TAPLAYMA] ${msg}`, 'color: #34d399; font-weight: bold');
    }

    function setStatus(step, active=true) {
        const el = document.getElementById(`mk-step${step}`);
        const loader = document.getElementById('mk-loader');
        if (!el) return;
        
        if (active) {
            for(let i=1; i<=3; i++) {
                const stepEl = document.getElementById(`mk-step${i}`);
                if(stepEl) stepEl.classList.remove('active');
            }
            el.classList.add('active');
            if (loader) loader.classList.add('animate');
        } else {
            el.classList.remove('active');
        }
    }

    function showResult(code) {
        const codeEl = document.getElementById('mk-code');
        const resEl = document.getElementById('mk-result');
        if (codeEl) codeEl.textContent = code;
        if (resEl) resEl.classList.add('show');
        
        setStatus(3, false);
        const loader = document.getElementById('mk-loader');
        if (loader) {
            loader.classList.remove('animate');
            loader.style.width = '100%';
        }
        
        log('✅ THÀNH CÔNG: ' + code, 'success');
        copyToClipboard(code);
    }

    // ===== 4. HÀM XỬ LÝ COPY =====
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                log('📋 Đã copy: ' + text, 'success');
                showCopyNotification(text);
            }).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        try {
            if (document.execCommand('copy')) {
                log('📋 Đã copy (fallback): ' + text, 'success');
                showCopyNotification(text);
            } else {
                log('❌ Không thể copy', 'error');
            }
        } catch (err) {
            log('❌ Lỗi copy: ' + err, 'error');
        }
        document.body.removeChild(textarea);
    }

    function showCopyNotification(text) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #34d399, #059669);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: bold;
            z-index: 1000000;
            box-shadow: 0 4px 15px rgba(52,211,153,0.4);
            animation: mk-slideUp 0.3s ease;
        `;
        notification.textContent = '✅ Đã copy: ' + text;
        document.body.appendChild(notification);

        if (!document.querySelector('#mk-animations')) {
            const animStyle = document.createElement('style');
            animStyle.id = 'mk-animations';
            animStyle.textContent = `
                @keyframes mk-slideUp { from { bottom: 0; opacity: 0; } to { bottom: 20px; opacity: 1; } }
                @keyframes mk-fadeOut { from { opacity: 1; } to { opacity: 0; } }
            `;
            document.head.appendChild(animStyle);
        }

        setTimeout(() => {
            notification.style.animation = 'mk-fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    document.getElementById('mk-copybtn').addEventListener('click', function() {
        const code = document.getElementById('mk-code').textContent;
        if (code && code !== '---') copyToClipboard(code);
    });

    // ===== 5. LOGIC HOOK MẠNG =====
    log('Khởi động mạng lưới bypass...', 'bypass');

    let giftCode = null;
    let giftToken = null;
    let polling = false;
    const origin = location.origin;
    const referer = location.href;

    function tryStart() {
        if (giftCode && giftToken && !polling) {
            polling = true;
            log(`✓ Đủ dữ liệu - Code: ${giftCode}, Token: ${giftToken}`, 'success');
            setStatus(3);
            startPolling();
        }
    }

    function hook(win) {
        try {
            const nativeFetch = win.fetch;
            win.fetch = async function(...args) {
                const [url, opt] = args;
                if (typeof url === 'string' && url.includes('/step') && opt?.body) {
                    try {
                        if (opt.body instanceof FormData) giftCode = opt.body.get('code');
                        else if (typeof opt.body === 'string') giftCode = new URLSearchParams(opt.body).get('code');
                        if (giftCode) { log(`📤 Hook /step - Code: ${giftCode}`, 'info'); setStatus(2); }
                    } catch(e){}
                }
                const response = await nativeFetch.apply(this, args);
                if (typeof url === 'string' && url.includes('/step')) {
                    try {
                        const data = await response.clone().json();
                        if (data?.success && data.token !== undefined) {
                            giftToken = String(data.token);
                            log(`📥 Response - Token: ${giftToken}`, 'info');
                            tryStart();
                        }
                    } catch(e){}
                }
                return response;
            };

            const xhrOpen = win.XMLHttpRequest.prototype.open;
            win.XMLHttpRequest.prototype.open = function(m, u) { this._url = u; return xhrOpen.apply(this, arguments); };
            const xhrSend = win.XMLHttpRequest.prototype.send;
            win.XMLHttpRequest.prototype.send = function(body) {
                if (this._url?.includes('/step') && body) {
                    try {
                        if (body instanceof FormData) giftCode = body.get('code');
                        else if (typeof body === 'string') giftCode = new URLSearchParams(body).get('code');
                        if (giftCode) { log(`📤 XHR /step - Code: ${giftCode}`, 'info'); setStatus(2); }
                    } catch(e){}
                }
                this.addEventListener('load', function() {
                    if (this._url?.includes('/step')) {
                        try {
                            const data = JSON.parse(this.responseText);
                            if (data?.success && data.token !== undefined) {
                                giftToken = String(data.token);
                                log(`📥 XHR Response - Token: ${giftToken}`, 'info');
                                tryStart();
                            }
                        } catch(e){}
                    }
                });
                return xhrSend.apply(this, arguments);
            };
        } catch(e) {}
    }

    hook(window);
    new MutationObserver(() => {
        document.querySelectorAll('iframe').forEach(f => {
            try { if (f.contentWindow) hook(f.contentWindow); } catch {}
        });
    }).observe(document.body, { childList: true, subtree: true });

    // ===== 6. TỰ ĐỘNG CLICK NÚT 170X54 =====
    function autoClick() {
        setStatus(1);
        log('🔍 Quét tìm phần tử đích (170x54)...', 'info');
        
        const findAndClickButton = () => {
            const elements = [...document.querySelectorAll('button, a, div[role="button"], input[type="button"], input[type="submit"], .btn, .button')];
            const targetButton = elements.find(el => {
                const rect = el.getBoundingClientRect();
                return Math.abs(Math.round(rect.width) - 170) <= 2 && Math.abs(Math.round(rect.height) - 54) <= 2;
            });

            if (targetButton) {
                log(`🖱️ Đã định vị phần tử đích kích thước chuẩn`, 'bypass');
                targetButton.disabled = false;
                targetButton.style.pointerEvents = 'auto';
                targetButton.click();
                setTimeout(() => {
                    targetButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                    targetButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                }, 100);
                log('✅ Đã thực hiện click tự động', 'success');
                return true;
            }
            return false;
        };

        if (!findAndClickButton()) {
            const observer = new MutationObserver(() => { if (findAndClickButton()) observer.disconnect(); });
            observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
            setTimeout(() => observer.disconnect(), 10000);
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoClick);
    else autoClick();

    // ===== 7. POLLING APIS =====
    function startPolling() {
        let attempts = 0;
        const iv = setInterval(async () => {
            attempts++;
            try {
                const res = await fetch('https://api.taplayma.com/continue', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'origin': origin,
                        'referer': referer
                    },
                    body: `code=${encodeURIComponent(giftCode)}&token=${encodeURIComponent(giftToken)}`
                });
                const data = await res.json();
                log(`📤 Gửi Request #${attempts}: ${data.success ? 'OK' : 'WAIT'}`, 'info');
                
                if (data?.success && data.code) {
                    clearInterval(iv);
                    polling = false;
                    showResult(data.code);
                    return;
                }
                if (data?.message) log(`⏳ ${data.message}`, 'info');
            } catch(e) {
                log(`❌ Thất bại kết nối: ${e.message}`, 'error');
            }
        }, 1000);

        setTimeout(() => {
            if (polling) { clearInterval(iv); polling = false; log('⛔ Quá thời gian chờ (5 phút)!', 'error'); }
        }, 300000);
    }
})();
