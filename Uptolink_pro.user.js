// ==UserScript==
// @name         Cat Bell Pro + Google Task 100%
// @namespace    https://github.com/catdzs1vn
// @version      3.0
// @description  Auto Link + Menu Google Task (không OCR) — @catdzs1vn
// @author       @catdzs1vn
// @match        https://maxtask.net/*
// @match        https://kiemmoney.com/*
// @match        https://huongdangetlink.com/*
// @match        https://uptolink.net/*
// @match        https://*.uptolink.*/*
// @match        https://*/*
// @match        *://*.linkhuongdan.online/*
// @match        *://www.google.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_openInTab
// @run-at       document-idle
// ==/UserScript==

// ─────────────────────────────────────────────────────────────
// 1. DATABASE (GIỮ LẠI ĐỂ DÙNG SAU NẾU CẦN)
// ─────────────────────────────────────────────────────────────
const REDIRECT_DATABASE = {
    "248": "://cn.com", "22-2": "8xx-nhacai.casino", "50-2": "iwinclub.in.net", "61-2": "tv88-khuyenmai88k.com",
    "79-2": "c168okvip.com", "49-2": "c168vip14.online", "72-2": "entraide.jp.net", "85-2": "ok8386.info",
    "76-2": "sc88okvip.site", "89-2": "brainstormmarketingdigital.com", "77-2": "c168okvip.com", "20-2": "ee88-t2.com",
    "88-2": "789win88.site", "21-2": "linkvao-789win.com", "32-2": "8xx-nhacai.casino", "64-2": "://cn.com",
    "81-2": "://africa.com", "1-2": "://uk.com", "46-2": "win678-mobile.com", "24-2": "://libroslibres.com.mx",
    "55-2": "ok365-2.com", "70-2": "open881.org", "57-2": "lucky88", "40-2": "://sa.com",
    "25-2": "://us.com", "60-2": "://za.com", "65-2": "kuwin-khuyenmai288k.com", "8-2": "m.taixiuonline.rocks",
    "7-2": "m.gamebaidoithuong.toys", "11-2": "x88-link-mobile.com", "73-2": "ok8386n.net", "52-2": "98winvvy.com",
    "80-2": "3ogame.io", "14-2": "://za.com", "2-2": "://uk.com", "3-2": "://cn.com",
    "4-2": "go8-vip.com", "66-2": "c168-c168i.com", "6-2": "m.gamebaidoithuong.toys", "9-2": "m.taixiuonline.rocks",
    "10-2": "fpcm.com.mx", "13-2": "go8-vip.com", "68-2": "ok8386n.net", "15-2": "uu88-t3.com",
    "17-2": "fpcm.com.mx", "18-2": "23win-23win.site", "19-2": "flipcide.io", "23-2": "okvip68vn.com",
    "27-2": "://co.com", "29-2": "://mex.com", "30-2": "://sa.com", "31-2": "://sa.com",
    "33-2": "69vnn.shop", "35-2": "kermisdata.nl", "36-2": "://uk.com", "37-2": "://us.com",
    "41-2": "mv88-m.com", "42-2": "da88-dangnhap.com", "43-2": "fpcm.com.mx", "51-2": "c168vip8.online",
    "47-2": "://gr.com", "69-2": "c168-c168.com", "53-2": "heroum.io", "54-2": "sunxwin.mobi",
    "67-2": "airportsfo.org", "58-2": "tg88.ing", "59-2": "8kbet", "71-2": "kandikids.io",
    "74-2": "://sa.com", "75-2": "f8bet-vip5.com", "78-2": "://uk.com", "86-2": "://cn.com",
    "91-2": "open88a2-okvip.com", "92-click-3-trang": "open88a2-okvip.com", "93-click-3-trang": "://sa.com", "97-2": "c168vip12.online",
    "98-2": "saxaa.com.mx", "99-2": "://sa.com", "95-click-3-trang": "sunwin2009com", "34-2": "flyingdiscranchdates.com",
    "100-2": "ee88-02.com", "103-click-3-trang": "://ru.com", "104-2": "://za.com", "101-2": "c168-c168a.com",
    "105-2": "facelift.uk.net", "94-click-3-trang": "://sa.com", "102-2": "c168vip16.online", "106-click-3-trang": "://jpn.com",
    "107-2": "keonhacai9.io", "108-2": "://de.com", "109-2": "://uk.com", "110-2": "://za.com",
    "111-2": "ok8386i.com", "112-2": "tv88-khuyenmai88k.com", "90-click-3-trang": "79king-vn.com", "113-click-3-trang": "open881.org",
    "114-2": "8kbet-premiumm.com", "115-2": "://it.com", "116-2": "ww88-linkvip.cc", "117-2": "://westwind.com.mx",
    "sc8": "sc88okvip.store", "120-2": "mamai.co", "121-2": "ok365.org", "122-2": "://uk.com",
    "62-2": "saxaa.com.mx", "56-2": "://ru.com", "125-2": "://adolescencia.com.mx", "126-2": "c168top1.mobi",
    "127-2": "gilbertoleon.com.mx", "128-2": "://sa.com", "129-2": "c168-okvip1.com", "130-2": "88aa-2026.site",
    "131-2": "://cn.com", "133-2": "888new-trangchu.com", "134-2": "rr88-dangnhap.com", "135-2": "dragonbnb.co",
    "136-2": "kandikids.io", "137-2": "mmoo-app.info", "138-2": "cafecrush.org", "139-2": "proofofapes.com",
    "132-click-3-trang": "adsfacilityservices.in.net", "141-2": "c168vip16.online", "140-2": "www.ansh-vachhani.in.net", "142-click-3-trang": "c168trangchu.mobi",
    "143-click-3-trang": "c168trangchu.mobi", "124-click-3-trang": "899789bet.ink", "144-click-3-trang": "68win-khuyenmai168k.com", "119-click-3-trang": "c168nn.site",
    "118-2": "nohu90-3.com", "146-2": "suntwin.mobi", "145-2": "c168vip7.online", "147-2": "shbet800a.today",
    "148-click-3-trang": "thedailylove.gb.net", "149-click-3-trang": "nohu90-33.com", "150-2": "789club2026.io", "152-2": "tradecalc.in.net",
    "153-2": "paitojapan.nl/dang-nhap-go8", "154-2": "://sa.com", "155-2": "f8bet", "156-2": "://us.com",
    "157-2": "ok365mobi.ink", "158-2": "lv88mex.online", "160-2": "win678-nhacai.casino", "161-2": "shbet800e.click",
    "151-2": "98win.rip", "159-2": "98winvi.bet", "162-2": "seriesblog.tv", "163-2": "://za.com",
    "12238-2": "ok365mobi.ink", "166-click-3-trang": "1au88.chat", "164-2": "://adolescencia.com.mx", "167-click-3-trang": "nohu-khuyenmai99k.com",
    "168-2": "://za.com", "5-2": "28bet-e1.com", "28-2": "fpcm.com.mx", "39-2": "www-hay88.space",
    "142-2": "://sa.com", "45-2": "://co.com", "11738-2": "://essentialoilsme.com", "169-2": "://uk.com",
    "unknown_id": "c168trangchu.mobi", "171-2": "://ru.com", "172-2": "padeo.io", "29-3": "c168okvip.com",
    "170-2": "nohu-nohu90a.com", "173-2": "heroum.io", "175-2": "://za.com", "16-2": "://za.com",
    "178-2": "uu88-t3.com", "176-2": "://sa.com", "179-click-3-trang": "suntwin.mobi", "96-2": "://ru.com",
    "180-2": "://cn.com", "12740-2": "mb66i4.ink", "183-2": "98winvi.bet", "184-2": "899789bet.ink",
    "182-2": "XPAY.IN.NET", "26-2": "://us.com", "44-2": "://gr.com", "185-2": "://za.com",
    "187-2": "://it.com", "166-2": "://sa.com", "167-2": "suntwin.mobi", "193-2": "go99-go999.com",
    "190-2": "nohu-nohu90a.com", "192-2": "://za.com", "189-2": "s8.ick", "195-2": "://jpn.com",
    "196-2": "vinhomessaigonparkhocmon.com.vn", "194-2": "://co.com", "92-2": "mrs.radio.fm", "197-2": "23win-1.info",
    "94-2": "3ogame.io", "198-2": "uu8887.com", "199-2": "w-58win.com", "200-2": "://eu.com",
    "174-2": "://za.com", "203-2": "flipcide.io", "201-2": "mb66i3.ink", "202-2": "c168vip14.online",
    "204-2": "789pkhuyenmai.com", "205-2": "luck8-luck8.net", "188-2": "go8-vip.com", "206-2": "honglaumong.site",
    "207-2": "urban-rides.nl", "177-2": "c168vip10.online", "148-2": "://jpn.com", "208-2": "://za.com",
    "209-2": "://uk.com", "113-2": "go99-game.co", "211-2": "ok9-ok99.com", "214-2": "smartonline.com.mx",
    "213-2": "899789bet.ink", "212-2": "://sa.com", "218-2": "://us.com", "wp-content": "fly88-khuyenmai188k.com",
    "210-3": "lievelieselotte.nl", "209-3": "nohu90-nohu8386.online", "11441-2": "://gfk.com.tw", "212-3": "tablet2you.nl",
    "211-3": "creat-or.io", "214-3": "nohu68.app", "213-3": "za.com", "215-2": "luck8-luck8.net",
    "216-2": "c168vip13.online", "217-2": "28bet-t1.com", "218-3": "c168vip12.com", "219-2": "://uk.com",
    "220-2": "s666-chinhthuc.com", "222-2": "emmhospital.com", "221-2": "shbet800f.info", "223-2": "elecodesanluispotosi.com.mx",
    "224-2": "elecodesanluispotosi.com.mx", "215-3": "shbet800a.today", "186-2": "://za.com", "191-2": "ecomdev.in.net",
    "216-3": "ee88-t2.com", "227-2": "indiacheapestpanel.in.net", "218-4": "www.ok365.org", "217-3": "://ru.com",
    "219-3": "://jpn.com", "221-3": "heroum.io", "220-3": "f8bet-vnn.com", "222-3": "rikvip2026.com",
    "223-3": "sexorzn.io", "224-3": "platinumcoachingpoint.in.net", "225-2": "s8.taxi", "217-4": "skybus.com.mx",
    "226-2": "bulkbuy.in.net", "228-2": "praypub.radio.fm", "229-click-3-trang": "samurai-japan.co", "230-2": "28bet-club.com",
    "231-2": "playmob.io", "232-2": "://it.com", "233-2": "hz88-mobile.com", "totreview-10300": "luck8-luck8.online",
    "210-2": "heroum.io/vi-vn", "234-2": "c168vip11.com", "14607-2": "s8.ink", "236-2": "tt88-mobile.app",
    "238-2": "linkpower.io", "237-2": "kenhphim.io", "239-2": "fly88-khuyenmai188k.com", "241-2": "gk88-giftcodes.ink",
    "242-2": "://za.com", "240-2": "katalogfirm.london", "243-2": "28btjp-1.com", "244-2": "fret.gb.net",
    "245-2": "23win-02.com", "241-3": "cybersport.gb.net", "246-2": "://it.com", "247-2": "28bet-club.com",
    "143-2": "ao88-vip.com", "95-2": "kandikids.io", "photo_2026-05-15_13-57-01X.jpg": "://adolescencia.com.mx",
    "photo_2026-05-15_20-21-30X.jpg": "://us.com"
};

// ─────────────────────────────────────────────────────────────
// 2. HÀM GOOGLE TASK (MENU MỚI)
// ─────────────────────────────────────────────────────────────
function runGoogleTask() {
    const currentUrl = window.location.href;
    if (!currentUrl.includes("qq=complete")) return false;

    // Vẽ giao diện menu
    const menu = document.createElement('div');
    menu.id = 'menu-manual-trigger';
    menu.style = `
        position: fixed; top: 5px; right: 5px; z-index: 2147483647;
        background: #1a1a24; color: #ffffff; padding: 10px; border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.6); font-family: Arial, sans-serif;
        width: 230px; border: 2px solid #ff3b30; font-size: 12px;
    `;
    menu.innerHTML = `
        <div style="font-weight: bold; color: #ff3b30; text-align: center; margin-bottom: 6px; border-bottom: 1px solid #444; padding-bottom: 2px;">🤖 BỘ ĐIỀU KHIỂN</div>
        <div style="margin-bottom: 4px;"><b>🔍 Từ khóa gốc:</b> <span id="menu-key" style="color: #ffcc00; font-weight: bold;">Đang quét...</span></div>
        <div style="margin-bottom: 4px;"><b>🎯 Điền trang đích (Không bắt buộc):</b></div>
        <input type="text" id="manual-target-box" placeholder="Ví dụ: 22luck8.ltd" style="width:90%; padding:6px; border-radius:4px; border:1px solid #444; color:#000; font-weight:bold; font-size:12px; margin-bottom:5px;">
        <button id="start-search-btn" style="width:100%; padding:8px; background:#ff3b30; color:#fff; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:11px;">👉 CHUYỂN QUA TÌM KIẾM GOOGLE</button>
        <div id="menu-status" style="margin-top: 4px; font-size: 10px; color: #aaa; text-align: center; font-style: italic;">Sẵn sàng...</div>
    `;
    document.body.appendChild(menu);

    const txtKey = document.getElementById('menu-key');
    const inputTarget = document.getElementById('manual-target-box');
    const btnSearch = document.getElementById('start-search-btn');
    const txtStatus = document.getElementById('menu-status');

    // Tự động quét lấy từ khóa bước 1 trên trang
    let keyword = "";
    const boldElements = document.querySelectorAll('strong, code, b, span[style*="color"]');
    for (let el of boldElements) {
        let text = el.innerText.trim();
        if (text.length > 1 && text.length < 30 && !text.includes("Bước") && !text.includes("http") && !text.includes("CLICK")) {
            keyword = text;
            break;
        }
    }
    if (keyword) {
        txtKey.innerText = keyword;
    } else {
        txtKey.innerText = "LUCK8 (Dự phòng)";
        keyword = "LUCK8";
    }

    btnSearch.onclick = function() {
        let rawTarget = inputTarget.value.trim();
        let finalTarget = "";
        let searchQuery = keyword;

        if (rawTarget) {
            finalTarget = rawTarget.replace(/https?:\/\//g, "").replace(/www\./g, "").split('/')[0].trim().toLowerCase();
            searchQuery = keyword + " " + finalTarget;
            GM_setValue("GOOGLE_TARGET_DOMAIN", finalTarget);
        } else {
            GM_setValue("GOOGLE_TARGET_DOMAIN", null);
        }

        txtStatus.innerText = "Đang mở Google...";
        setTimeout(() => {
            const cleanQuery = encodeURIComponent(searchQuery);
            window.location.href = "https://www.google.com/search?q=" + cleanQuery;
        }, 200);
    };
    return true;
}

// ─────────────────────────────────────────────────────────────
// 3. TOÀN BỘ CODE GỐC CỦA CAT BELL BETA (GIỮ NGUYÊN)
//    (widget, countdown, auto link, step, captcha...)
// ─────────────────────────────────────────────────────────────
function initCatBell() {
    if (window._catbellLoaded) return;
    window._catbellLoaded = true;

    function el(id) { return document.getElementById(id); }

    function togglePanel() {
        var panel = el('cb-panel'), fab = el('cb-fab');
        if (!panel || !fab) return;
        var wasHidden = panel.classList.contains('hidden');
        panel.classList.toggle('hidden');
        fab.textContent = wasHidden ? 'Close' : 'Open';
        fab.classList.toggle('open', wasHidden);
    }

    var storage = {
        get: function (key, cb) {
            var val = GM_getValue(key, undefined);
            var obj = {}; obj[key] = val; cb(obj);
        },
        set: function (obj) { for (var k in obj) GM_setValue(k, obj[k]); },
        remove: function (key) { GM_setValue(key, undefined); }
    };

    // ─── CSS (giữ nguyên) ───
    GM_addStyle(`
        #cb-widget {
            position: fixed; bottom: 24px; right: 20px;
            z-index: 2147483647;
            font-family: 'Segoe UI', Inter, sans-serif;
            user-select: none;
        }
        #cb-panel {
            background: #07070d; border: 1px solid #ffffff0e;
            border-radius: 16px; width: 240px;
            box-shadow: 0 12px 40px #000000dd, 0 0 0 1px #ffffff05;
            transition: opacity .25s, transform .25s;
            margin-bottom: 8px; overflow: hidden;
        }
        #cb-panel.hidden {
            opacity: 0; transform: translateY(8px) scale(0.97);
            pointer-events: none;
        }
        #cb-drag {
            display: flex; align-items: center; justify-content: space-between;
            padding: 10px 13px 8px; cursor: grab;
            border-bottom: 1px solid #ffffff07; background: #0a0a14;
        }
        #cb-drag:active { cursor: grabbing; }
        .cb-drag-left { display: flex; align-items: center; gap: 8px; }
        .cb-name {
            font-size: 13px; font-weight: 900; line-height: 1;
            background: linear-gradient(90deg, #5aa8ff, #9d7aff);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cb-name-sub { font-size: 8.5px; color: #9d7aff55; margin-top: 2px; letter-spacing: 0.3px; }
        .cb-badge {
            font-size: 7.5px; font-weight: 700; color: #9d7aff;
            background: #9d7aff12; border: 1px solid #9d7aff22;
            padding: 2px 7px; border-radius: 20px;
        }
        .cb-body { padding: 11px 13px 12px; }
        .cb-toggleRow {
            display: flex; align-items: center; justify-content: space-between;
            background: #0d0d18; border: 1px solid #ffffff08;
            border-radius: 10px; padding: 9px 11px; margin-bottom: 9px;
            transition: border-color .3s, background .3s;
        }
        .cb-toggleRow.on { border-color: #3a6fc430; background: #0b1020; }
        .cb-tleft { display: flex; align-items: center; gap: 8px; }
        .cb-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: #1e1e2e; flex-shrink: 0; transition: all .3s;
        }
        .cb-dot.on { background: #00e676; box-shadow: 0 0 7px #00e676bb; }
        .cb-rlbl { font-size: 11px; font-weight: 700; color: #ffffffbb; line-height: 1; }
        .cb-statusSub { font-size: 9px; color: #ffffff28; margin-top: 2px; transition: color .3s; line-height: 1; }
        .cb-statusSub.on { color: #00e67666; }
        .cb-switch { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
        .cb-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
        .cb-slider {
            position: absolute; inset: 0; background: #111120;
            border-radius: 50px; cursor: pointer; border: 1px solid #ffffff10;
            transition: all .3s cubic-bezier(.4,0,.2,1);
        }
        .cb-slider::before {
            content: ''; position: absolute;
            width: 17px; height: 17px; left: 2px; top: 2px;
            background: #252538; border-radius: 50%;
            transition: all .3s cubic-bezier(.4,0,.2,1); box-shadow: 0 2px 5px #77;
        }
        .cb-switch input:checked + .cb-slider {
            background: linear-gradient(135deg, #112244, #1e0e44); border-color: #4a80c040;
        }
        .cb-switch input:checked + .cb-slider::before {
            transform: translateX(18px);
            background: linear-gradient(135deg, #5aa8ff, #9d7aff); box-shadow: 0 2px 8px #5a8fff99;
        }
        .cb-task-box {
            background: #0d0d18; border: 1px solid #ffffff07;
            border-radius: 10px; padding: 8px 11px; margin-bottom: 9px;
        }
        .cb-task-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .cb-task-lbl { font-size: 9px; color: #ffffff22; }
        .cb-task-name {
            font-size: 10px; font-weight: 700; color: #5aa8ff;
            max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cb-task-name.idle { color: #ffffff20; font-weight: 400; font-style: italic; }
        .cb-step-list { display: flex; gap: 5px; flex-wrap: wrap; }
        .cb-step {
            font-size: 8.5px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
            background: #151525; color: #ffffff20; border: 1px solid #ffffff08; transition: all .3s;
        }
        .cb-step.active {
            background: linear-gradient(135deg, #112244, #1e0e44);
            color: #5aa8ff; border-color: #5aa8ff44; box-shadow: 0 0 8px #5aa8ff22;
        }
        .cb-step.done { background: #0d2218; color: #00e676; border-color: #00e67628; }
        #cb-countdown-box {
            display: none; opacity: 0; align-items: center;
            background: #0d0d18; border: 1px solid #ffffff08;
            border-radius: 10px; padding: 8px 11px; margin-bottom: 9px; transition: opacity .3s;
        }
        #cb-countdown-box.show { display: flex; opacity: 1; }
        .cb-cd-right { flex: 1; min-width: 0; }
        .cb-cd-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
        .cb-cd-label { font-size: 8.5px; color: #ffffff22; white-space: nowrap; letter-spacing: 0.3px; }
        .cb-cd-text { font-size: 10px; font-weight: 800; color: #5aa8ff; white-space: nowrap; }
        .cb-cd-bar-wrap { height: 2px; background: #ffffff08; border-radius: 2px; overflow: hidden; width: 100%; }
        .cb-cd-bar {
            height: 100%; background: linear-gradient(90deg, #5aa8ff, #9d7aff);
            border-radius: 2px; transition: width 1s linear; width: 100%;
        }
        #cb-redirect-box { display: none; flex-direction: column; gap: 7px; margin-bottom: 9px; }
        #cb-redirect-box.show { display: flex; }
        .cb-redirect-label {
            font-size: 9px; font-weight: 500; color: #ffffff40;
            background: #0d0d18; border: 1px solid #ffffff0c;
            border-radius: 9px; padding: 8px 11px; line-height: 1.5;
        }
        .cb-redirect-label .cb-rd-title {
            font-size: 10px; font-weight: 800; color: #ff8080cc; margin-bottom: 3px; display: block;
        }
        .cb-redirect-label .cb-rd-sub { font-size: 8.5px; color: #ffffff28; display: block; }
        .cb-redirect-btns { display: flex; gap: 7px; }
        .cb-redir-btn {
            flex: 1; padding: 9px 6px; border-radius: 9px; cursor: pointer;
            font-size: 10px; font-weight: 800; transition: all .2s;
            text-align: center; border: 1px solid transparent; line-height: 1.2;
        }
        .cb-redir-btn .cb-btn-label { font-size: 8px; font-weight: 500; opacity: 0.6; display: block; margin-top: 1px; }
        .cb-redir-btn.maxtask { background: linear-gradient(135deg,#112244,#1e0e44); color:#5aa8ff; border-color:#5aa8ff33; }
        .cb-redir-btn.maxtask:hover { opacity: 0.85; }
        .cb-redir-btn.kiemoney { background: linear-gradient(135deg,#1e0e44,#112244); color:#9d7aff; border-color:#9d7aff33; }
        .cb-redir-btn.kiemoney:hover { opacity: 0.85; }
        .cb-redir-btn:active { transform: scale(0.96); }
        .cb-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid #ffffff06; }
        .cb-author { font-size: 9px; color: #ffffff15; font-weight: 500; }
        .cb-author el { color: #9d7aff35; font-weight: 700; }
        .cb-phase {
            font-size: 8px; color: #ffffff12; background: #ffffff05;
            border: 1px solid #ffffff07; padding: 1px 7px; border-radius: 20px; transition: all .3s;
        }
        .cb-phase.running { color: #00e67655; border-color: #00e67620; background: #00e6760a; }
        #cb-fab {
            display: flex; align-items: center; justify-content: center;
            margin-left: auto; height: 28px; padding: 0 14px;
            background: #0a0a14; border-radius: 20px; border: 1px solid #ffffff0e;
            box-shadow: 0 4px 16px #99; cursor: pointer;
            font-size: 10px; font-weight: 700; color: #ffffff35;
            letter-spacing: 0.5px; transition: all .2s; width: fit-content;
        }
        #cb-fab:hover { color: #5aa8ff99; border-color: #5aa8ff22; }
        #cb-fab.open { color: #ff444455; border-color: #ff444420; }
    `);

    function injectWidget() {
        if (el('cb-widget')) return;
        var widget = document.createElement('div');
        widget.id = 'cb-widget';
        widget.innerHTML = `
            <div id="cb-panel" class="hidden">
                <div id="cb-drag">
                    <div class="cb-drag-left">
                        <div>
                            <div class="cb-name">Cat Bell</div>
                            <div class="cb-name-sub">@catdzs1vn</div>
                        </div>
                    </div>
                    <div class="cb-badge">Small</div>
                </div>
                <div class="cb-body">
                    <div class="cb-toggleRow" id="cb-toggleRow">
                        <div class="cb-tleft">
                            <div class="cb-dot" id="cb-dot"></div>
                            <div>
                                <div class="cb-rlbl">Auto Link</div>
                                <div class="cb-statusSub" id="cb-statusSub">Dừng</div>
                            </div>
                        </div>
                        <label class="cb-switch">
                            <input type="checkbox" id="cb-tog">
                            <span class="cb-slider"></span>
                        </label>
                    </div>
                    <div class="cb-task-box">
                        <div class="cb-task-top">
                            <div class="cb-task-lbl">Nhiệm vụ</div>
                            <div class="cb-task-name idle" id="cb-taskname">Chưa chạy</div>
                        </div>
                        <div class="cb-step-list">
                            <div class="cb-step" id="cb-s1">Step 1</div>
                            <div class="cb-step" id="cb-s2">Step 2</div>
                            <div class="cb-step" id="cb-s3">Step 3</div>
                        </div>
                    </div>
                    <div id="cb-countdown-box">
                        <div class="cb-cd-right">
                            <div class="cb-cd-top">
                                <div class="cb-cd-label">VUI LÒNG ĐỢI TRONG</div>
                                <div class="cb-cd-text" id="cb-cd-text">--</div>
                            </div>
                            <div class="cb-cd-bar-wrap"><div class="cb-cd-bar" id="cb-cd-bar"></div></div>
                        </div>
                    </div>
                    <div id="cb-redirect-box">
                        <div class="cb-redirect-label">
                            <span class="cb-rd-title" id="cb-rd-title">⚠️ Không thể tiếp tục</span>
                            <span class="cb-rd-sub" id="cb-rd-sub">Chọn trang để tiếp tục làm nhiệm vụ</span>
                        </div>
                        <div class="cb-redirect-btns">
                            <div class="cb-redir-btn maxtask" id="cb-goto-maxtask">
                                MaxTask<span class="cb-btn-label">maxtask.net</span>
                            </div>
                            <div class="cb-redir-btn kiemoney" id="cb-goto-kiemoney">
                                KiemMoney<span class="cb-btn-label">kiemmoney.com</span>
                            </div>
                        </div>
                    </div>
                    <div class="cb-footer">
                        <div class="cb-author"><el>@</el>catdzs1vn</div>
                        <div class="cb-phase" id="cb-phase">Idle</div>
                    </div>
                </div>
            </div>
            <div id="cb-fab">Open</div>
        `;
        document.body.appendChild(widget);
        setupDrag(widget);
        // Mặc định bật Auto Link nếu chưa có giá trị
        storage.get('catbell_active', function (d) {
            let active = d.catbell_active;
            if (active === undefined) {
                active = true;
                storage.set({ catbell_active: true });
            }
            catbell19(active);
            if (active) catbell32();
        });
    }

    document.addEventListener('click', function (e) {
        var t = e.target;
        if (t.closest && t.closest('#cb-fab')) { togglePanel(); return; }
        if (t.id === 'cb-tog' || (t.closest && t.closest('.cb-switch') && el('cb-tog'))) {
            var tog = el('cb-tog');
            if (!tog) return;
            setTimeout(function () {
                var on = tog.checked;
                storage.set({ catbell_active: on });
                catbell19(on);
                if (on) catbell32();
            }, 0);
            return;
        }
        if (t.closest && t.closest('#cb-goto-maxtask')) { window.location.href = 'https://maxtask.net/home/tasks'; return; }
        if (t.closest && t.closest('#cb-goto-kiemoney')) { window.location.href = 'https://kiemmoney.com'; return; }
    });

    document.addEventListener('keydown', function (e) {
        if (e.altKey && e.key === 'c') togglePanel();
    });

    function setupDrag(widget) {
        var drag = el('cb-drag');
        if (!drag) return;
        var dragging = false, ox = 0, oy = 0;
        drag.addEventListener('mousedown', function (e) {
            dragging = true;
            var r = widget.getBoundingClientRect();
            ox = e.clientX - r.left; oy = e.clientY - r.top;
            e.preventDefault();
        });
        document.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            widget.style.left   = Math.max(0, Math.min(window.innerWidth  - widget.offsetWidth,  e.clientX - ox)) + 'px';
            widget.style.top    = Math.max(0, Math.min(window.innerHeight - widget.offsetHeight, e.clientY - oy)) + 'px';
            widget.style.right  = 'auto'; widget.style.bottom = 'auto';
        });
        document.addEventListener('mouseup', function () { dragging = false; });
        drag.addEventListener('touchstart', function (e) {
            dragging = true;
            var t = e.touches[0], r = widget.getBoundingClientRect();
            ox = t.clientX - r.left; oy = t.top - r.top;
        }, { passive: true });
        document.addEventListener('touchmove', function (e) {
            if (!dragging) return;
            var t = e.touches[0];
            widget.style.left   = Math.max(0, Math.min(window.innerWidth  - widget.offsetWidth,  t.clientX - ox)) + 'px';
            widget.style.top    = Math.max(0, Math.min(window.innerHeight - widget.offsetHeight, t.clientY - oy)) + 'px';
            widget.style.right  = 'auto'; widget.style.bottom = 'auto';
        }, { passive: true });
        document.addEventListener('touchend', function () { dragging = false; });
    }

    // ─── Countdown ───────────────────────────────────────────
    var _cd_max = 0, _cd_cur = 0, _cd_timer = null;
    function detectCountdown() {
        var secs = null, allEls = document.querySelectorAll('*');
        for (var i = 0; i < allEls.length; i++) {
            var e2 = allEls[i], txt = e2.textContent.trim();
            var m1 = txt.match(/vui lòng đợi(?: trong)?\s+(\d{1,3})\s*$/i);
            if (m1) { secs = parseInt(m1[1]); break; }
            var m2 = txt.match(/^đợi\s+(\d{1,3})\s*(?:giây)?$/i);
            if (m2) { secs = parseInt(m2[1]); break; }
        }
        if (!secs) {
            for (var i = 0; i < allEls.length; i++) {
                var e2 = allEls[i], txt = e2.textContent.trim();
                if (e2.childElementCount === 0 && /^\d{1,2}$/.test(txt)) {
                    var n = parseInt(txt);
                    if (n >= 1 && n <= 99) {
                        var p = e2.parentElement;
                        var pTxt = p ? p.textContent.toLowerCase() : '';
                        var pCls = p ? ((p.className || '') + (p.id || '')).toLowerCase() : '';
                        if (pTxt.includes('đợi') || pTxt.includes('wait') || pTxt.includes('timer') ||
                            pCls.includes('timer') || pCls.includes('count') || pCls.includes('wait')) {
                            secs = n; break;
                        }
                    }
                }
                var m3 = txt.match(/^(\d{1,2})\s*giây$/i);
                if (m3) { secs = parseInt(m3[1]); break; }
            }
        }
        if (secs && secs > 0) {
            if (_cd_max === 0 || secs > _cd_cur) _cd_max = secs;
            if (secs !== _cd_cur) { _cd_cur = secs; showCountdown(secs); }
        } else { hideCountdown(); }
    }
    function showCountdown(sec) {
        var box = el('cb-countdown-box'), txt = el('cb-cd-text'), bar = el('cb-cd-bar');
        if (!box) return;
        box.classList.add('show');
        if (txt) txt.textContent = sec + 's';
        if (bar) bar.style.width = Math.max(2, _cd_max > 0 ? (sec / _cd_max) * 100 : 100) + '%';
    }
    function hideCountdown() {
        var wasShowing = _cd_cur !== 0;
        _cd_cur = 0; _cd_max = 0;
        var box = el('cb-countdown-box');
        if (wasShowing && box) {
            box.style.opacity = '0';
            setTimeout(function () { box.classList.remove('show'); box.style.opacity = ''; }, 300);
            if (isOn()) setTimeout(function () { clickContinue(); }, 350);
        } else if (box) { box.classList.remove('show'); }
    }
    function startCountdownWatcher() { if (!_cd_timer) _cd_timer = setInterval(detectCountdown, 800); }
    function stopCountdownWatcher()  { if (_cd_timer) { clearInterval(_cd_timer); _cd_timer = null; } hideCountdown(); }

    // ─── UI state helpers ─────────────────────────────────────
    function isOn() { var t = el('cb-tog'); return t ? t.checked : false; }
    function setStep(n, state) {
        for (var k = 1; k <= 3; k++) { var s = el('cb-s' + k); if (s) s.className = 'cb-step'; }
        if (n && state) { var s = el('cb-s' + n); if (s) s.className = 'cb-step ' + state; }
    }
    function setTask(name) {
        var t = el('cb-taskname'); if (!t) return;
        if (name) { t.textContent = name; t.className = 'cb-task-name'; }
        else { t.textContent = 'Chưa chạy'; t.className = 'cb-task-name idle'; }
    }
    function setPhase(txt, running) {
        var p = el('cb-phase'); if (!p) return;
        p.textContent = txt; p.className = 'cb-phase' + (running ? ' running' : '');
    }
    function catbell19(on) {
        var tog = el('cb-tog'), dot = el('cb-dot'), sub = el('cb-statusSub'), row = el('cb-toggleRow');
        if (!tog) return;
        tog.checked = on;
        if (on) {
            if (dot) dot.className = 'cb-dot on';
            if (sub) { sub.textContent = 'Chạy'; sub.className = 'cb-statusSub on'; }
            if (row) row.classList.add('on');
            startCountdownWatcher();
        } else {
            if (dot) dot.className = 'cb-dot';
            if (sub) { sub.textContent = 'Dừng'; sub.className = 'cb-statusSub'; }
            if (row) row.classList.remove('on');
            setTask(null); setStep(null); setPhase('Idle', false);
            stopCountdownWatcher();
        }
    }
    function showRedirect(title, sub) {
        var box = el('cb-redirect-box'), t = el('cb-rd-title'), s = el('cb-rd-sub');
        if (t) t.textContent = title || '⚠️ Không thể tiếp tục';
        if (s) s.textContent = sub   || 'Chọn trang để tiếp tục làm nhiệm vụ';
        if (box) box.classList.add('show');
        var panel = el('cb-panel'), fab = el('cb-fab');
        if (panel && panel.classList.contains('hidden') && fab) {
            panel.classList.remove('hidden'); fab.textContent = 'Close'; fab.classList.add('open');
        }
    }

    // ─── Canvas captcha ───────────────────────────────────────
    function handleCanvas() {
        var canvas = document.querySelector('canvas'); if (!canvas) return false;
        setPhase('Xác thực...', true);
        var r = canvas.getBoundingClientRect(), cx = r.left + r.width/2, cy = r.top + r.height/2;
        canvas.dispatchEvent(new PointerEvent('pointerdown', { clientX:cx, clientY:cy, bubbles:true, isPrimary:true }));
        canvas.dispatchEvent(new MouseEvent('mousedown', { clientX:cx, clientY:cy, bubbles:true }));
        try { canvas.dispatchEvent(new TouchEvent('touchstart', { touches:[new Touch({identifier:1,target:canvas,clientX:cx,clientY:cy})], bubbles:true })); } catch(e) {}
        var h = setInterval(function () {
            if (!isOn()) { clearInterval(h); return; }
            var c2 = document.querySelector('canvas');
            if (!c2) { clearInterval(h); waitApproval(); }
            else { c2.dispatchEvent(new PointerEvent('pointermove', { clientX:cx, clientY:cy, bubbles:true, isPrimary:true })); }
        }, 300);
        return true;
    }
    function waitApproval() {
        setPhase('Chờ duyệt...', true);
        var t = setInterval(function () {
            if (!isOn()) { clearInterval(t); return; }
            if (document.body.innerText.includes('Quay về Nhiệm vụ')) {
                clearInterval(t); setStep(null); setTask(null); setPhase('Xong ✓', false);
                setTimeout(function () { window.location.href = 'https://maxtask.net/home/tasks'; }, 1200);
            }
        }, 500);
    }

    // ─── Click continue ───────────────────────────────────────
    function clickContinue() {
        var body = document.body.innerText;
        if (body.includes('NHẤN LINK BẤT KỲ')) { setPhase('Reload...', true); window.location.href = window.location.href; return true; }
        var els = document.querySelectorAll('*');
        for (var i = 0; i < els.length; i++) {
            var e2 = els[i];
            if (e2.childElementCount === 0 && e2.textContent.includes('NHẤN ĐỂ TIẾP TỤC')) {
                e2.scrollIntoView(); e2.click();
                try { if (e2.parentElement) e2.parentElement.click(); } catch(ex) {}
                try { var cl = e2.closest('button,a,[role=button],[onclick]'); if (cl) cl.click(); } catch(ex) {}
                setPhase('Đã click...', true); return true;
            }
        }
        return false;
    }
    function hasContinueBtn(txt) {
        return txt.includes('NHẤN LINK BẤT KỲ') || txt.includes('NHẤN ĐỂ TIẾP TỤC') || txt.includes('NHẤN LINK BẤT KỲ ĐỂ TIẾP TỤC');
    }
    function waitContinue(n, cb) {
        setPhase('Chờ nút tiếp tục...', true);
        var firstSeen = false, lastClick = 0;
        var t = setInterval(function () {
            if (!isOn()) { clearInterval(t); return; }
            var body = document.body.innerText;
            if (hasContinueBtn(body)) {
                var now = Date.now();
                if (!firstSeen || now - lastClick > 10000) { firstSeen = true; lastClick = now; clickContinue(); }
            } else if (body.includes('ĐANG XỬ LÝ') || body.includes('đang xử lý')) {
                setPhase('Đang xử lý...', true);
            } else if (firstSeen) { clearInterval(t); if (n) setStep(n, 'done'); cb(); }
        }, 600);
    }

    // ─── Step buttons ─────────────────────────────────────────
    function clickStep(n) {
        var els = document.querySelectorAll('*');
        for (var i = 0; i < els.length; i++) {
            var e2 = els[i], txt = e2.textContent;
            if (e2.childElementCount === 0 && (txt.includes('LẤY MÃ STEP ' + n) || (n === 1 && txt.includes('LẤY MÃ')))) {
                var target = e2.closest('[id]') || e2.parentElement;
                target.scrollIntoView(); target.click(); return true;
            }
        }
        return false;
    }
    function waitStep(n, cb) {
        setStep(n, 'active'); setTask('Uptolink — Step ' + n); setPhase('Step ' + n, true);
        var t = setInterval(function () {
            if (!isOn()) { clearInterval(t); return; }
            if (clickStep(n)) { clearInterval(t); cb(); }
        }, 1000);
    }

    // ─── hCaptcha ─────────────────────────────────────────────
    function captchaReady() {
        var e2 = document.querySelector('[name="wasHidden-captcha-response"]');
        if (e2 && e2.value && e2.value.length > 0) return true;
        return !document.querySelector('iframe[src*="hcaptcha"]');
    }
    function clickCaptcha() {
        if (!captchaReady()) return false;
        var btn = el('invisibleCaptchaShortlink');
        if (btn) { btn.scrollIntoView(); btn.click(); return true; }
        return false;
    }
    function waitCaptcha() {
        var t = setInterval(function () {
            if (!isOn()) { clearInterval(t); return; }
            if (captchaReady()) { if (clickCaptcha()) clearInterval(t); }
        }, 1000);
    }

    // ─── Find task link ───────────────────────────────────────
    function findTaskLink() {
        var links = document.querySelectorAll('a[href]');
        for (var i = 0; i < links.length; i++) {
            var h = links[i].href;
            if (h.includes('maxtask.net/task/') || h.includes('kiemmoney.com/rewards/')) {
                window.location.href = h; return true;
            }
        }
        return false;
    }
    function startUptolink() {
        var divs = document.querySelectorAll('div, section');
        for (var i = 0; i < divs.length; i++) {
            var d = divs[i];
            if (!d.innerText || !d.innerText.includes('Uptolink 3step')) continue;
            var btn = Array.from(d.querySelectorAll('button,a,span')).find(function(e2){ return e2.innerText && e2.innerText.includes('Làm nhiệm vụ'); });
            if (btn) { btn.scrollIntoView(); btn.click(); setTask('Uptolink 3step'); setPhase('Bắt đầu...', true); return true; }
        }
        return false;
    }
    function check404() {
        var body = document.body.innerText, u = window.location.href;
        if (!u.includes('uptolink')) return false;
        if (body.includes('Not Found') || body.includes('was not found on this server') || body.includes('404') || body.includes('không tìm thấy')) {
            showRedirect('404 — Quest không tồn tại', 'Link đã hết hạn hoặc sai — chọn trang tiếp theo');
            setPhase('404 Quest', false);
            storage.set({ catbell_active: false }); catbell19(false); return true;
        }
        return false;
    }
    function checkKiemMoney() {
        var cur = window.location.href;
        var pause = (cur.includes('kiemmoney.com') && !cur.includes('/rewards/') && !cur.includes('/task')) ||
                    (cur.includes('huongdangetlink.com') && cur.includes('complete'));
        if (pause) {
            if (isOn()) { storage.set({ catbell_active: false, catbell_paused_by_km: true }); catbell19(false); setPhase('Tạm dừng', false); }
            return true;
        }
        storage.get('catbell_paused_by_km', function (d) {
            if (d.catbell_paused_by_km) {
                storage.remove('catbell_paused_by_km');
                storage.set({ catbell_active: true }); catbell19(true); catbell32();
            }
        });
        return false;
    }

    // ─── Main logic ───────────────────────────────────────────
    var pageUrl = window.location.href;
    function runLogic() {
        if (!isOn()) return;
        if (document.readyState !== 'complete') {
            setPhase('Đợi trang load...', true);
            window.addEventListener('load', runLogic, { once: true }); return;
        }
        if (checkKiemMoney()) return;
        if (check404()) return;
        var body = document.body.innerText;
        if (document.querySelector('canvas')) { handleCanvas(); return; }
        if (body.includes('Quay về Nhiệm vụ')) { setTimeout(function(){ window.location.href='https://maxtask.net/home/tasks'; }, 1000); return; }
        if (pageUrl.includes('maxtask.net/home/tasks')) { setPhase('Tìm nhiệm vụ...', true); startUptolink(); return; }
        if (pageUrl.includes('maxtask.net/task/') || pageUrl.includes('kiemmoney.com/rewards/')) return;
        if (findTaskLink()) return;
        if (body.includes('Bấm vào đây để tiếp tục') || el('invisibleCaptchaShortlink')) {
            setPhase('Captcha...', true); waitCaptcha();
        } else if (body.includes('NHẤN LINK BẤT KỲ') || body.includes('NHẤN LINK BẤT KỲ ĐỂ TIẾP TỤC')) {
            setPhase('Reload...', true); window.location.href = window.location.href;
        } else if (hasContinueBtn(body)) {
            waitContinue(null, function(){ window.location.href = pageUrl; });
        } else if (body.includes('LẤY MÃ STEP 3')) {
            waitStep(3, function(){ waitContinue(3, function(){ window.location.href = pageUrl; }); });
        } else if (body.includes('LẤY MÃ STEP 2')) {
            waitStep(2, function(){ waitContinue(2, function(){ window.location.href = pageUrl; }); });
        } else if (body.includes('LẤY MÃ STEP 1') || body.includes('LẤY MÃ')) {
            waitStep(1, function(){ waitContinue(1, function(){ window.location.href = pageUrl; }); });
        } else if (body.includes('ĐANG XỬ LÝ') || body.includes('ĐANG XỬ LY') || body.includes('đang xử lý')) {
            setPhase('Đang xử lý...', true); setTimeout(runLogic, 1000);
        } else {
            setTimeout(runLogic, 1500);
        }
    }
    function catbell32() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') { runLogic(); }
        else { document.addEventListener('DOMContentLoaded', runLogic, { once: true }); }
    }

    // ─── Boot ─────────────────────────────────────────────────
    var _observer = new MutationObserver(function () {
        if (!el('cb-widget') && document.body) injectWidget();
    });
    if (document.body) {
        injectWidget();
        _observer.observe(document.body, { childList: true });
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            injectWidget();
            _observer.observe(document.body, { childList: true });
        }, { once: true });
    }
}

// ─────────────────────────────────────────────────────────────
// 4. KHỞI CHẠY: TRÊN linkhuongdan.online?qq=complete → CHẠY GOOGLE TASK
//    CÒN LẠI → CHẠY CAT BELL
// ─────────────────────────────────────────────────────────────
(async function() {
    const url = window.location.href;
    const isOcrPage = url.includes('linkhuongdan.online') && url.includes('qq=complete');
    if (isOcrPage) {
        runGoogleTask(); // Hiển thị menu Google Task
    } else {
        initCatBell();
    }
})();

// ─────────────────────────────────────────────────────────────
// 5. XỬ LÝ TRÊN GOOGLE.COM (TỰ ĐỘNG CLICK KẾT QUẢ) – TỪ SCRIPT MỚI
// ─────────────────────────────────────────────────────────────
(function() {
    const currentDomain = window.location.hostname;
    if (currentDomain.includes("google.com")) {
        const targetDomainToFind = GM_getValue("GOOGLE_TARGET_DOMAIN", null);
        if (!targetDomainToFind) return;

        console.log("[GoogleBot] Đang tìm trang đích:", targetDomainToFind);
        const autoInvisibleScan = () => {
            const allLinks = document.querySelectorAll('a');
            for (let link of allLinks) {
                const hrefUrl = link.href ? link.href.toLowerCase() : "";
                const linkText = link.innerText ? link.innerText.toLowerCase() : "";
                if ((hrefUrl.includes(targetDomainToFind) || linkText.includes(targetDomainToFind)) && !hrefUrl.includes("google.com")) {
                    console.log("[GoogleBot] Tìm thấy mục tiêu! Chuyển hướng...");
                    link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        let destinationUrl = link.href;
                        if (!destinationUrl || !destinationUrl.startsWith('http')) {
                            destinationUrl = "https://" + targetDomainToFind;
                        }
                        GM_setValue("GOOGLE_TARGET_DOMAIN", null);
                        window.location.href = destinationUrl;
                    }, 400);
                    return true;
                }
            }
            return false;
        };
        if (!autoInvisibleScan()) {
            const intervalId = setInterval(() => {
                if (autoInvisibleScan()) clearInterval(intervalId);
            }, 1000);
        }
    }
})();
