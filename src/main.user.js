// ==UserScript==
// @name         明御助手
// @namespace    http://lovexy.fun/
// @version      0.1
// @description  明御运维系统登录助手
// @author       lovexy-fun
// @match        https://127.0.0.1/*
// @icon         data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8B////Af///wEsHRQlLB0UwSwdFCP///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wEsHRQpLB0U5ywdFP8sHRTlLB0UKf///wH///8B////Af///wH///8B////Af///wH///8B////Af///wEsHRQxLB0U6SwdFOUsHRRPLB0U5SwdFOksHRQv////Af///wH///8B////Af///wH///8B////Af///wEsHRQ3LB0U7ywdFN8sHRQh////ASwdFCMsHRTfLB0U7SwdFDX///8B////Af///wH///8B////Af///wEsHRQ9LB0U8SwdFNssHRQfLB0UEywdFJssHRQRLB0UHywdFNssHRTxLB0UPf///wH///8B////Af///wEsHRRFLB0U9SwdFNcsHRQZLB0UFywdFM8sHRT/LB0UzSwdFBMsHRQZLB0U1ywdFPUsHRRF////Af///wH///8BLB0U9ywdFNEsHRQXLB0UGSwdFNcsHRT1LB0UfSwdFPUsHRTRLB0UFywdFBcsHRTRLB0U9////wH///8B////ASwdFP8sHRR5LB0UDSwdFNssHRTzLB0UP////wEsHRQ/LB0U8ywdFNcsHRQLLB0UeSwdFP////8B////Af///wEsHRT/LB0UeSwdFB8sHRT/LB0UZ////wH///8B////ASwdFGksHRT/LB0UHywdFHksHRT/////Af///wH///8BLB0U/ywdFHksHRQfLB0U/ywdFFssHRQ9LB0U/ywdFD0sHRRbLB0U/ywdFB8sHRR5LB0U/////wH///8B////ASwdFP8sHRR5LB0UHywdFP8sHRRbLB0UPSwdFP8sHRQ9LB0UWywdFP8sHRQfLB0UeSwdFP////8B////Af///wEsHRT/LB0UeSwdFB8sHRT/LB0UeywdFGMsHRT/LB0UPSwdFFssHRT/LB0UHywdFHksHRT/////Af///wH///8BLB0U/ywdFHksHRQfLB0U/ywdFP8sHRT/LB0U/ywdFD0sHRRbLB0U/ywdFB8sHRR5LB0U/////wH///8B////ASwdFP8sHRR5LB0UBywdFDMsHRQzLB0UMywdFDMsHRQNLB0UWywdFP8sHRQfLB0UeSwdFP////8B////Af///wEsHRT/LB0UrywdFGcsHRRnLB0UZywdFGcsHRRnLB0UZywdFJ0sHRT/LB0UHywdFHksHRT/////Af///wH///8BLB0U/ywdFP8sHRT/LB0U/ywdFP8sHRT/LB0U/ywdFP8sHRT/LB0U/ywdFB8sHRR5LB0U/////wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==
// @run-at       document-end
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/lovexy-fun/MingYuAssistant/master/src/userData.user.js
// @updateURL    https://raw.githubusercontent.com/lovexy-fun/MingYuAssistant/master/src/userData.user.js
// @supportURL   https://github.com/lovexy-fun/MingYuAssistant/issues
// ==/UserScript==

(function () {
    'use strict';

    //向页面置入填写帐号密码的按钮
    $('body').append('<div style="position: absolute;right: 0;bottom: 0;z-index: 1000;font-size: 20px;"><button onclick="window.fill()">填写账号密码</button></div>');
    window.totp = new jsOTP.totp();
    window.fill = function () {
        var pathname = window.location.pathname;
        if(pathname == "/index.php/om") {
            var hostAccount = MYUserData.hostAccount;

            /* 填写服务的登录名和密码 */
            var ip = $("#ip").text();
            $("[data-id=\'acctname\']").val(hostAccount[ip].acctname);
            $("[data-id=\'pwd\']").val(hostAccount[ip].pwd);

            /* 填充Oracle的数据库名或者DB2的资产列表 */
            var servicename = hostAccount[ip].servicename;
            if (servicename !== undefined && servicename !== "" && servicename.length !== 0) {
                $("[data-id=\'servicename\']").val(servicename);
            }

        } else if(pathname == "/index.php/login" || pathname == "/index.php" || pathname == "/") {
            var loginAccount = MYUserData.loginAccount;

            /* 填写帐号密码 */
            var prefix = $($("[class=\'active\']")[0].children[0]).attr("data-tab-toggle");
            $("#" + prefix + "_username").val(loginAccount.username);
            $("#" + prefix + "_pwd").val(loginAccount.password);

            /* 填写令牌验证码 */
            var appKey = loginAccount.appKey;//otp令牌key
            if(appKey !== undefined && appKey !== "" && appKey.length !== 0 && prefix === "ga") {
                $("#" + prefix + "_totp").val(totp.getOtp(appKey));
                setInterval(function () {
                    $("#" + prefix + "_totp").val(totp.getOtp(MYUserData.loginAccount.appKey));
                }, MYUserData.config.appKeyRefresh * 1000);
            }
        }
    }

    //定时刷新
    var pageRefresh = MYUserData.config.pageRefresh;
    if (window.location.pathname === "/index.php/om" && pageRefresh > 0) {
        setTimeout(function () {
            window.location.reload();
        }, pageRefresh * 1000 * 60);
    }

})();