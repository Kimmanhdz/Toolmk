(function () {
    'use strict';

    if (window.MKFinalScriptLoaded) return;
    window.MKFinalScriptLoaded = true;

    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;

    // Tăng tốc timer x5
    console.log(
        '%c[MK] đã tăng tốc bypass x5 | Script by MK',
        'color:#a955ff;font-weight:bold'
    );

    const speedMultiplier = 5;

    window.setTimeout = function (fn, delay = 0, ...args) {
        return originalSetTimeout(fn, delay / speedMultiplier, ...args);
    };

    window.setInterval = function (fn, delay = 0, ...args) {
        return originalSetInterval(fn, delay / speedMultiplier, ...args);
    };

    function createNotification() {
        if (document.getElementById('MK-notification')) return;

        const style = document.createElement('style');
        style.textContent = `
            #MK-notification{
                position:fixed;
                top:25px;
                right:25px;
                background:rgba(30,35,50,.75);
                color:#fff;
                padding:12px 18px;
                border-radius:12px;
                z-index:2147483647;
                backdrop-filter:blur(10px);
                box-shadow:0 8px 32px rgba(0,0,0,.35);
                font-family:Segoe UI,sans-serif;
                opacity:0;
                transform:translateX(120%);
                transition:.5s;
            }
            #MK-notification.visible{
                opacity:1;
                transform:translateX(0);
            }
        `;

        const div = document.createElement('div');
        div.id = 'MK-notification';

        div.innerHTML = `
            <div style="font-size:15px;font-weight:600;">MK Đã Kích Hoạt</div>
            <div style="font-size:13px;color:#d0d0d0;">Cảm ơn bạn đã sử dụng code by MK.</div>
            <div style="font-size:10px;color:#999;">Script by MK</div>
        `;

        document.head.appendChild(style);
        document.body.appendChild(div);

        setTimeout(() => div.classList.add('visible'), 100);

        setTimeout(() => {
            div.classList.remove('visible');
            setTimeout(() => {
                div.remove();
                style.remove();
            }, 500);
        }, 5000);
    }

    if (document.body) {
        createNotification();
    } else {
        document.addEventListener('DOMContentLoaded', createNotification);
    }
})();
