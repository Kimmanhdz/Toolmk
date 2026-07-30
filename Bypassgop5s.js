(function() {
    'use strict';
    if (window.datcnFinalScriptLoaded) return;
    window.datcnFinalScriptLoaded = true;

    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    let speedMultiplier = 1;

    // === CẤU HÌNH GIAO DIỆN ===
    const config = {
        position: 'bottom-right', // hoặc 'bottom-left', 'top-right', 'top-left'
        theme: {
            bg: 'rgba(20,25,40,0.92)',
            text: '#fff',
            accent: '#a955ff',
            border: 'rgba(255,255,255,0.12)',
            borderRadius: '14px',
            fontFamily: "'Segoe UI', sans-serif"
        }
    };

    // Hàm áp dụng tốc độ
    function applySpeedHack() {
        window.setTimeout = (fn, delay) => originalSetTimeout(fn, delay / speedMultiplier);
        window.setInterval = (fn, delay) => originalSetInterval(fn, delay / speedMultiplier);
    }
    applySpeedHack();

    // Tạo menu
    function createSpeedMenu() {
        if (document.getElementById('datcn-speed-menu')) return;

        // Xác định vị trí
        let posStyle = '';
        switch(config.position) {
            case 'bottom-right': posStyle = 'bottom:80px; right:20px;'; break;
            case 'bottom-left': posStyle = 'bottom:80px; left:20px;'; break;
            case 'top-right': posStyle = 'top:80px; right:20px;'; break;
            case 'top-left': posStyle = 'top:80px; left:20px;'; break;
            default: posStyle = 'bottom:80px; right:20px;';
        }
        const togglePos = config.position.replace('-',' ');
        const toggleStyle = togglePos.includes('bottom') ? 'bottom:20px;' : 'top:20px;';
        const toggleStyle2 = togglePos.includes('right') ? 'right:20px;' : 'left:20px;';

        const style = document.createElement('style');
        style.id = 'datcn-speed-menu-style';
        style.textContent = `
            #datcn-speed-toggle {
                position: fixed;
                ${toggleStyle}
                ${toggleStyle2}
                z-index: 999999;
                background: ${config.theme.bg};
                color: ${config.theme.text};
                border: 1px solid ${config.theme.border};
                border-radius: 8px;
                padding: 8px 14px;
                font: 600 14px ${config.theme.fontFamily};
                cursor: pointer;
                backdrop-filter: blur(6px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                user-select: none;
                transition: 0.2s;
            }
            #datcn-speed-toggle:hover { transform: scale(1.05); }

            #datcn-speed-menu {
                position: fixed;
                ${posStyle}
                z-index: 999998;
                background: ${config.theme.bg};
                backdrop-filter: blur(12px);
                border: 1px solid ${config.theme.border};
                border-radius: ${config.theme.borderRadius};
                padding: 18px 20px 20px;
                min-width: 210px;
                display: none;
                flex-direction: column;
                gap: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.6);
                font-family: ${config.theme.fontFamily};
                color: ${config.theme.text};
            }
            #datcn-speed-menu.visible { display: flex; }

            #datcn-speed-menu .menu-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
            }
            #datcn-speed-menu .menu-header span:first-child { color: ${config.theme.accent}; }

            #datcn-speed-menu .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
            }
            #datcn-speed-menu .grid button,
            #datcn-speed-menu .row-10 button {
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 6px;
                padding: 8px 0;
                color: #ddd;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: 0.15s;
                font-family: inherit;
                text-align: center;
            }
            #datcn-speed-menu .grid button:hover,
            #datcn-speed-menu .row-10 button:hover {
                background: rgba(255,255,255,0.2);
                color: #fff;
            }
            #datcn-speed-menu .grid button.active {
                background: ${config.theme.accent};
                color: #fff;
                border-color: ${config.theme.accent};
                box-shadow: 0 0 12px ${config.theme.accent}4D;
            }

            #datcn-speed-menu .row-10 {
                display: flex;
                gap: 8px;
                align-items: center;
            }
            #datcn-speed-menu .row-10 button.luu {
                flex: 0.6;
                background: ${config.theme.accent};
                color: #fff;
                border: none;
                font-weight: 600;
            }
            #datcn-speed-menu .row-10 button.luu:hover {
                background: #8f3fe0;
            }

            #datcn-speed-menu .current-speed {
                text-align: center;
                font-size: 13px;
                color: #aaa;
                margin-top: 2px;
            }
        `;
        document.head.appendChild(style);

        const toggle = document.createElement('div');
        toggle.id = 'datcn-speed-toggle';
        toggle.textContent = '⚡ Speed';
        document.body.appendChild(toggle);

        const menu = document.createElement('div');
        menu.id = 'datcn-speed-menu';
        menu.innerHTML = `
            <div class="menu-header">
                <span>Speed</span>
                <span id="speed-indicator">${speedMultiplier}X</span>
            </div>
            <div class="grid">
                ${[1,2,3,4,5,6,7,8,9].map(i => `<button data-speed="${i}">${i}X</button>`).join('')}
            </div>
            <div class="row-10">
                <button data-speed="10">10X</button>
                <button class="luu" id="speed-luu">LUU</button>
            </div>
            <div class="current-speed" id="current-speed-label">Current: ${speedMultiplier}x</div>
        `;
        document.body.appendChild(menu);

        function updateUI() {
            const buttons = menu.querySelectorAll('button[data-speed]');
            buttons.forEach(btn => {
                const spd = parseInt(btn.dataset.speed);
                btn.classList.toggle('active', spd === speedMultiplier);
            });
            document.getElementById('speed-indicator').textContent = speedMultiplier + 'X';
            document.getElementById('current-speed-label').textContent = `Current: ${speedMultiplier}x`;
            toggle.textContent = `⚡ ${speedMultiplier}X`;
        }

        function setSpeed(speed) {
            if (speed < 1) speed = 1;
            speedMultiplier = speed;
            applySpeedHack();
            updateUI();
            try { localStorage.setItem('datcn_speed', speed); } catch(_) {}
        }

        menu.querySelectorAll('button[data-speed]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                setSpeed(parseInt(this.dataset.speed));
            });
        });

        document.getElementById('speed-luu').addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.remove('visible');
            toggle.textContent = `⚡ ${speedMultiplier}X`;
        });

        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = menu.classList.contains('visible');
            if (isVisible) {
                menu.classList.remove('visible');
                toggle.textContent = `⚡ ${speedMultiplier}X`;
            } else {
                menu.classList.add('visible');
                updateUI();
            }
        });

        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('visible');
                toggle.textContent = `⚡ ${speedMultiplier}X`;
            }
        });

        try {
            const saved = localStorage.getItem('datcn_speed');
            if (saved) {
                const spd = parseInt(saved);
                if (spd >= 1 && spd <= 10) setSpeed(spd);
            }
        } catch(_) {}
        updateUI();
        console.log('[datcn] Speed menu ready');
    }

    function init() {
        if (document.body) createSpeedMenu();
        else setTimeout(init, 50);
    }
    init();
})();
