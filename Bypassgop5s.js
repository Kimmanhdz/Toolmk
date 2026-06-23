(function () {
    'use strict';

    if (window.MKFinalScriptLoaded) return;
    window.MKFinalScriptLoaded = true;

    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;

    // Tăng tốc timer x5
    (function speedUpTimers() {
        console.log(
            '%c[MK] đã tăng tốc bypass x5 | Script by MK',
            'color:#4fc3f7;font-weight:bold'
        );

        const speedMultiplier = 5;

        const applySpeedHack = () => {
            window.setTimeout = (fn, delay = 0) =>
                originalSetTimeout(fn, delay / speedMultiplier);

            window.setInterval = (fn, delay = 0) =>
                originalSetInterval(fn, delay / speedMultiplier);
        };

        applySpeedHack();
        originalSetInterval(applySpeedHack, 100);
    })();

    function createNotification() {
        const notificationId = 'MK-notification';

        if (document.getElementById(notificationId)) return;

        const container = document.createElement('div');
        container.id = notificationId;

        container.innerHTML = `
            <div class="MK-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.829 15.632l-1.98-1.144c-.23-.132-.383-.377-.383-.644v-2.288c0-1.851-1.202-3.436-2.92-3.992.052-.224.079-.456.079-.691 0-.968-.38-1.851-.989-2.497-.61-.647-1.488-1.03-2.45-1.03s-1.84.383-2.45 1.03c-.61.646-.99 1.529-.99 2.497 0 .235.028.467.08.691-1.719.556-2.92 2.141-2.92 3.992v2.288c0 .267-.154.512-.384.644l-1.98 1.144c-.293.17-.41.536-.295.861.114.324.418.536.758.536h14.9c.34 0 .644-.212.758-.536.115-.325-.002-.691-.295-.861zM12 22c1.104 0 2-.896 2-2h-4c0 1.104.895 2 2 2z"/>
                </svg>
            </div>

            <div class="MK-content">
                <div class="MK-title">MK Đã Kích Hoạt</div>
                <div class="MK-message">Cảm ơn bạn đã sử dụng code by MK.</div>
                <div class="MK-credit">Script by MK</div>
            </div>

            <div class="MK-close" title="Đóng">&times;</div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #MK-notification{
                position:fixed;
                top:25px;
                right:25px;
                background:rgba(135,206,235,0.18);
                color:#ffffff;
                padding:12px 18px;
                border-radius:14px;
                z-index:2147483647;
                box-shadow:0 8px 32px rgba(135,206,235,0.25);
                font-family:'Segoe UI','Roboto',sans-serif;
                backdrop-filter:blur(14px);
                -webkit-backdrop-filter:blur(14px);
                border:1px solid rgba(255,255,255,0.35);
                display:flex;
                align-items:center;
                gap:15px;
                opacity:0;
                transform:translateX(120%);
                transition:all .5s cubic-bezier(.25,1,.5,1);
            }

            #MK-notification.visible{
                opacity:1;
                transform:translateX(0);
            }

            .MK-icon{
                width:24px;
                height:24px;
                color:#87ceeb;
            }

            .MK-content{
                display:flex;
                flex-direction:column;
            }

            .MK-title{
                font-size:15px;
                font-weight:600;
                color:#fff;
            }

            .MK-message{
                font-size:13px;
                color:#eef9ff;
            }

            .MK-credit{
                font-size:10px;
                color:#d7f3ff;
                margin-top:4px;
                font-style:italic;
            }

            .MK-close{
                font-size:24px;
                color:#dff6ff;
                cursor:pointer;
                padding:0 5px;
                margin-left:10px;
                transition:.2s;
            }

            .MK-close:hover{
                color:#ffffff;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(container);

        const closeNotification = () => {
            container.classList.remove('visible');

            originalSetTimeout(() => {
                container.remove();
                style.remove();
            }, 600);
        };

        container.querySelector('.MK-close')
            .addEventListener('click', closeNotification);

        originalSetTimeout(() => {
            container.classList.add('visible');
        }, 100);

        originalSetTimeout(closeNotification, 5000);
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
