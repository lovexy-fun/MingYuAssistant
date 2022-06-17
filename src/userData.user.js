// ==UserScript==
// @name         明御助手（userData）
// @namespace    http://lovexy.fun/
// @version      0.1
// @description  明御运维系统登录助手（用户数据）
// @author       lovexy-fun
// @match        https://127.0.0.1/*
// @icon         data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8B////Af///wEsHRQlLB0UwSwdFCP///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wEsHRQpLB0U5ywdFP8sHRTlLB0UKf///wH///8B////Af///wH///8B////Af///wH///8B////Af///wEsHRQxLB0U6SwdFOUsHRRPLB0U5SwdFOksHRQv////Af///wH///8B////Af///wH///8B////Af///wEsHRQ3LB0U7ywdFN8sHRQh////ASwdFCMsHRTfLB0U7SwdFDX///8B////Af///wH///8B////Af///wEsHRQ9LB0U8SwdFNssHRQfLB0UEywdFJssHRQRLB0UHywdFNssHRTxLB0UPf///wH///8B////Af///wEsHRRFLB0U9SwdFNcsHRQZLB0UFywdFM8sHRT/LB0UzSwdFBMsHRQZLB0U1ywdFPUsHRRF////Af///wH///8BLB0U9ywdFNEsHRQXLB0UGSwdFNcsHRT1LB0UfSwdFPUsHRTRLB0UFywdFBcsHRTRLB0U9////wH///8B////ASwdFP8sHRR5LB0UDSwdFNssHRTzLB0UP////wEsHRQ/LB0U8ywdFNcsHRQLLB0UeSwdFP////8B////Af///wEsHRT/LB0UeSwdFB8sHRT/LB0UZ////wH///8B////ASwdFGksHRT/LB0UHywdFHksHRT/////Af///wH///8BLB0U/ywdFHksHRQfLB0U/ywdFFssHRQ9LB0U/ywdFD0sHRRbLB0U/ywdFB8sHRR5LB0U/////wH///8B////ASwdFP8sHRR5LB0UHywdFP8sHRRbLB0UPSwdFP8sHRQ9LB0UWywdFP8sHRQfLB0UeSwdFP////8B////Af///wEsHRT/LB0UeSwdFB8sHRT/LB0UeywdFGMsHRT/LB0UPSwdFFssHRT/LB0UHywdFHksHRT/////Af///wH///8BLB0U/ywdFHksHRQfLB0U/ywdFP8sHRT/LB0U/ywdFD0sHRRbLB0U/ywdFB8sHRR5LB0U/////wH///8B////ASwdFP8sHRR5LB0UBywdFDMsHRQzLB0UMywdFDMsHRQNLB0UWywdFP8sHRQfLB0UeSwdFP////8B////Af///wEsHRT/LB0UrywdFGcsHRRnLB0UZywdFGcsHRRnLB0UZywdFJ0sHRT/LB0UHywdFHksHRT/////Af///wH///8BLB0U/ywdFP8sHRT/LB0U/ywdFP8sHRT/LB0U/ywdFP8sHRT/LB0U/ywdFB8sHRR5LB0U/////wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/lovexy-fun/MingYuAssistant/master/src/main.user.js
// @updateURL    https://raw.githubusercontent.com/lovexy-fun/MingYuAssistant/master/src/main.user.js
// @supportURL   https://github.com/lovexy-fun/MingYuAssistant/issues
// @homepage     https://github.com/lovexy-fun/MingYuAssistant
// ==/UserScript==

(function () {
    'use strict';

    var data = {
        //通用配置
        config: {
            //手机令牌刷新间隔，单位秒
            appKeyRefresh: 1,
            //页面刷新间隔，为了保持登录状态，0为不刷新，单位分钟
            pageRefresh: 0
        },
        //系统登录账户
        loginAccount: {
            username: "TestAccount",
            password: "TestPassword",
            //手机令牌密钥，可以为空
            appKey: ""
        },
        hostAccount: {
            "127.0.0.1": {
                //登录名
                acctname: "",
                //密码
                pwd: "",
                //数据库（oracle）或资产列表（db2），非必要字段可以不配置
                servicename: ""
            }
        }
    };

    window.MYUserData = data;
})();