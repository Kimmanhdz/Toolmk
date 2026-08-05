(function() {
    'use strict';
    
    if (window.MkFinalScriptLoaded) return;
    window.MkFinalScriptLoaded = true;
    
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    
    (function speedUpTimers() {
        console.log('%c[Mk] đã tăng tốc bypass (x5) | Script by Mk', 'color: #a955ff; font-weight: bold');
        const speedMultiplier = 5;   // x5 như mày bảo
        const applySpeedHack = () => {
            window.setTimeout = (fn, delay) => originalSetTimeout(fn, delay / speedMultiplier);
            window.setInterval = (fn, delay) => originalSetInterval(fn, delay / speedMultiplier);
        };
        applySpeedHack();
        originalSetInterval(applySpeedHack, 100);
    })();
    
    function createNotification() {
        const notificationId = 'Mk-notification';
        if (document.getElementById(notificationId)) return;
        
        const container = document.createElement('div');
        container.id = notificationId;
        container.innerHTML = `
            <div class="mk-icon-wrapper">
                <svg class="mk-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            </div>
            <div class="mk-content">
                <div class="mk-title">⚡ Mk đã sẵn sàng</div>
                <div class="mk-message">Tăng tốc x5 thành công. Bạn đang dùng script by Mk.</div>
                <div class="mk-credit" style="font-size: 10px; opacity: 0.6; margin-top: 6px; letter-spacing: 0.5px;">Script by Mk — Bản quyền thuộc về CAC</div>
            </div>
            <div class="mk-close" title="Đóng">✕</div>
        `;
        
        const style = document.createElement('style');
        style.innerHTML = `
            #Mk-notification {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: rgba(15, 20, 30, 0.75);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                padding: 18px 24px;
                z-index: 2147483647;
                display: flex;
                align-items: center;
                gap: 18px;
                min-width: 340px;
                max-width: 500px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(169, 85, 255, 0.2);
                font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif;
                opacity: 0;
                transform: translateY(40px) scale(0.96);
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                color: #f0f0f0;
            }
            #Mk-notification.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            #Mk-notification:hover {
                border-color: rgba(169, 85, 255, 0.5);
                box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(169, 85, 255, 0.3);
            }
            .mk-icon-wrapper {
                flex-shrink: 0;
                width: 44px;
                height: 44px;
                border-radius: 14px;
                background: linear-gradient(135deg, #a955ff, #7c3aed);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 20px rgba(169, 85, 255, 0.4);
            }
            .mk-icon-svg {
                width: 26px;
                height: 26px;
                color: #ffffff;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            }
            .mk-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            .mk-title {
                font-size: 17px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.2px;
                background: linear-gradient(90deg, #c084fc, #a955ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .mk-message {
                font-size: 13px;
                color: #c8c8d0;
                font-weight: 400;
                line-height: 1.4;
            }
            .mk-credit {
                font-size: 10px;
                color: #8888a0;
                letter-spacing: 0.3px;
            }
            .mk-close {
                flex-shrink: 0;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: 300;
                color: #8888a0;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.2s ease;
                background: rgba(255,255,255,0.04);
                line-height: 1;
                margin-left: 4px;
            }
            .mk-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
                transform: rotate(90deg);
            }
            @media (max-width: 600px) {
                #Mk-notification {
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    min-width: unset;
                    padding: 14px 18px;
                    border-radius: 16px;
                }
                .mk-icon-wrapper {
                    width: 36px;
                    height: 36px;
                }
                .mk-icon-svg {
                    width: 20px;
                    height: 20px;
                }
                .mk-title {
                    font-size: 15px;
                }
                .mk-message {
                    font-size: 12px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(container);
        
        const closeNotification = () => {
            container.classList.remove('visible');
            originalSetTimeout(() => {
                container.remove();
                style.remove();
            }, 500);
        };
        
        container.querySelector('.mk-close').addEventListener('click', closeNotification);
        
        originalSetTimeout(() => {
            container.classList.add('visible');
        }, 200);
        
        // Tự đóng sau 3 giây
        originalSetTimeout(closeNotification, 3000);
        
        console.log('%c[Mk] thông báo x5 đã hiện, tự tắt sau 3s | Script by Mk', 'color: #a955ff; font-weight: bold');
    }
    
    function init() {
        if (document.body) {
            createNotification();
        } else {
            originalSetTimeout(init, 100);
        }
    }
    
    init();
})();
