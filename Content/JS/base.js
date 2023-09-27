const extString = (function () {
    /**
     * 判斷字串是否為test開頭
     * @param {string} input 輸入值
     * @param {string} test 比對值
     * @return {boolean} 判斷結果
     */
    var startsWith = function (input, test) {
        return input.startsWith(test);
    };

    /**
     * 刪除字串開頭文字
     * @param {string} input 輸入值
     * @param {string} prefix 開頭文字
     * @return {string} 刪除後字串
     */
    var removePrefix = function (input, prefix) {
        var str = input;
        if (this.StartsWith(input, prefix)) {
            str = input.substr(prefix.length);
        }
        return str;
    };

    /**
     * 替換字串中指定的位置
     * @param {string} text 輸入值
     * @param {number} start 起始位置(會被替換)
     * @param {number} stop 結束位置(不會被替換)
     * @param {string} replacetext 替換文字
     */
    function replacepos(text, start, stop, replacetext){
        var mystr = text.substring(0, start) + replacetext + text.substring(stop);
        return mystr;
    }

    return {
        startsWith: startsWith,
        removePrefix: removePrefix,
        replacepos: replacepos,
    };
}());

const extMath = (function() {
    /**
     * 數字格式化
     * @param {(string|number)} number 數字
     * @param {number} decimals 取到小數X位
     * @param {string} dec_point 小數點符號
     * @param {string} thousands_sep 千分位符號
     * @returns {string}
     */
    var numberFormat = function (number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }

        var num = s.join(dec);
        num     = removeZerosAfterDecimal(num);

        return num;
    }

    /**
     * 無條件捨去到指定位數
     * @param {(string|number)} number 數字
     * @param {number} decimals 捨去到第幾位
     */
    var floorDecimal = function (number, decimal){
        number = parseFloat(number);
        return Math.floor( ( number + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal );
    }

    /**
     * 去除小數後面的零
     * @param {(string|number)} number 數字
     */
    var removeZerosAfterDecimal = function (number){
        var number  = number.toString();
        var integer = number.split(".")[0];
        var decimal = number.split(".")[1];

        if(typeof decimal != "undefined"){
            decimal = decimal.replace(/0+$/, '');
            if(decimal.trim() == ""){
                number = integer.trim();
            }else{
                number = integer.trim() + "." + decimal.trim();
            }
        }

        return number;
    }

    /**
     * 浮點數相加
     */
    var floatAdd = function (arg1, arg2){
        var r1, r2, m;
        try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
        try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
        m = Math.pow(10, Math.max(r1, r2));
        return (float_mul(arg1, m) + float_mul(arg2, m)) / m;
    }

    /**
     * 浮點數相減
     */
    var floatSub = function (arg1, arg2){
        var r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    /**
     * 浮點數相乘
     */
    var floatMul = function (arg1, arg2){
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { m += s1.split(".")[1].length; } catch (e) { }
        try { m += s2.split(".")[1].length; } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    /**
     * 浮點數相除
     */
    var floatDiv = function (arg1, arg2){
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
        try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
        with (Math)
        {
            r1 = Number(arg1.toString().replace(".", ""))
            r2 = Number(arg2.toString().replace(".", ""))
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }

    return {
        numberFormat: numberFormat,
        floorDecimal: floorDecimal,
        removeZerosAfterDecimal: removeZerosAfterDecimal,
        floatAdd: floatAdd,
        floatSub: floatSub,
        floatMul: floatMul,
        floatDiv: floatDiv,
    };
}());

const extDate = (function(){
    var toHHMMSS = function(sec_num){
        var sec_num = parseInt(sec_num, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }

    return {
        toHHMMSS: toHHMMSS,
    }
}());

const extCookie = (function(){
    /**
     * 設定 Cookie
     * @param {string} cname 名稱
     * @param {(string|number)} value 資料
     * @param {(string|number)} second_to_live 存在秒數
     */
    var setCookie = function (cname, value, second_to_live){
        let cookie = cname + "=" + encodeURIComponent(value);
        if (typeof second_to_live === "number"){
            cookie += ";max-age =" + second_to_live;
        }
        cookie += ";path=/";
        document.cookie = cookie;
    }

    /**
     * 取得 Cookie
     * @param {string} cname 名稱
     */
    var getCookie = function (cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /**
     * 刪除 Cookie
     * @param {string} cname 名稱
     */
    var delCookie = function (cname){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(cname);
        if (cval != "") 
            document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
    }

    /**
     * 檢查 Cookie 是否存在
     * @param {string} cname 名稱
     */
    var checkCookieExist = function (cname){
        if(getCookie(cname) === ""){
            return false;
        }
        return true;
    }

    return {
        setCookie: setCookie,
        getCookie: getCookie,
        delCookie: delCookie,
        checkCookieExist: checkCookieExist,
    };
}());


const extDebug = (function(){
    var consoleGroup = function (group_title_name, ...print_params){
        if(print_params.indexOf("is_collapsed") !== -1){
            print_params.splice(print_params.indexOf("is_collapsed"), 1);

            //摺疊
            console.groupCollapsed(group_title_name);
        }else{
            console.group(group_title_name);
        }

        print_params.forEach(function(params){
            console.log(params);
        });

        console.groupEnd();
    }

    return {
        consoleGroup: consoleGroup,
    };
});

/* -------------------- */
/* -------------------- */
/* -------------------- */
const jQueryAjax = (function (factory) {
    if(typeof jQuery === "function"){
        return factory(jQuery);
    }else{
        return {};
    }
}(function($){
    var RequsetGet = function (url, callback, fail, comple, before) {
        url = url || "";
        callback = callback || function () {};
        before = before || function () {};
        comple = comple || function () {};
        fail = fail || function (e) {
            console.log(url);
        };
        var callurl = url;

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: callurl,
            timeout: 30 * 1000,
            beforeSend: function () {
                before();
            },
            complete: function () {
                comple();
            },
            success: function (result) {
                callback(result);
                if (typeof result.IsSuccess === "undefined") {
                    console.log(result);
                }
            },
            error: function (e) {
                fail(e);
            }
        });
    };

    var RequsetPost = function (url, data, callback, fail, comple, before) {
        url = url || "";
        data = data || {};
        callback = callback || function () {};
        before = before || function () {};
        comple = comple || function () {};
        fail = fail || function (e) {
            console.log(url);
        };

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            timeout: 30 * 1000,
            beforeSend: function () {
                before();
            },
            complete: function () {
                comple();
            },
            success: function (result) {
                callback(result);
                if (typeof result.IsSuccess === "undefined") {
                    console.log(result);
                }
            },
            error: function (e) {
                fail(e);
            }
        });
    };

    var RequsetPostFile = function (url, data, callback, fail, comple, before, xhr) {
        url = url || "";
        data = data || {};
        callback = callback || function () {};
        before = before || function () {};
        comple = comple || function () {};
        fail = fail || function (e) {
            console.log(url);
        };
        xhr = xhr || function () {};

        $.ajax({
            xhr: xhr,
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            timeout: 30 * 1000,
            async: true,
            beforeSend: function () {
                before();
            },
            complete: function () {
                comple();
            },
            success: function (result) {
                callback(result);
                if (typeof result.IsSuccess === "undefined") {
                    console.log(result);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                fail(xhr, ajaxOptions, thrownError);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    };

    return {
        RequsetGet: RequsetGet,
        RequsetPost: RequsetPost,
        RequsetPostFile: RequsetPostFile
    };
}));

/* -------------------- */
/* -------------------- */
/* -------------------- */
const axiosAjax = (function (factory) {
    if(typeof axios === "function"){
        return factory(axios);
    }else{
        return {};
    }
}(function(axios){
    var RequsetGet = function(url, _params){
        let params = _params || {};

        return axios({
            method: 'get',
            url: url,
            params: params,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    };

    var RequsetPost = function(url, _params, _data){
        let params = _params || {};
        let data   = _data || {};

        return axios({
            method: 'post',
            url: url,
            params: params,
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    };

    var RequsetPostFile = function(url, _params, _data){
        let params = _params || {};
        let data   = _data || {};

        return axios({
            method: 'post',
            url: url,
            params: params,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return {
        RequsetGet: RequsetGet,
        RequsetPost: RequsetPost,
        RequsetPostFile: RequsetPostFile
    };
}));
