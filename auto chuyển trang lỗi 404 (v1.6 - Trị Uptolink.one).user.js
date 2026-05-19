// ==UserScript==
// @name         auto chuyển trang lỗi 404 (v1.6 - Trị Uptolink.one)
// @namespace    datcn.pro
// @version      1.6
// @description  Bắt chính xác lỗi 404 của uptolink.one và quay xe
// @match        *://*.uptolink.*/*
// @match        *://uptolink.*/*
// @match        *://uptolink.one/*
// @match        *://*.maxtask.net/*
// @match        *://*.clickmoney.online/*
// @match        *://*.datcn.pro/*
// @match        *://*.linkhuongdan.online/*
// @grant        none
// @run-at       document-idle
// @icon         https://truyentranhmoi.edu.vn/upload/2025/08/anh-choso-01.webp
// ==/UserScript==

(function () {
    'use strict';

    const TARGET = "https://clickmoney.online/home/tasks";

    function checkAndRedirect() {
        const text = document.body ? document.body.innerText.toLowerCase() : "";
        const title = document.title.toLowerCase();

        // Chỉ đích danh dòng chữ lỗi trong ảnh của Tùng
        if (
            text.includes("404 not found. 111") ||
            text.includes("không tìm thấy trên máy chủ này") ||
            text.includes("404 not found") ||
            title.includes("404") ||
            title.includes("not found")
        ) {
            console.log("⚠️ Bắt được lỗi 404 trên Uptolink - Quay xe...");
            // Dùng replace để nó chuyển thẳng về Clickmoney mà không bị kẹt lại lịch sử duyệt web
            window.location.replace(TARGET);
        }
    }

    // Cho tool quét liên tục nửa giây 1 lần, thấy lỗi là bế đi luôn
    setInterval(checkAndRedirect, 500);

})();
