/*
 * 
 * 
 *
 * Copyright (c) 2016 
 * Licensed under the MIT license.
 */
(function ($) {

  var cache = [],
        signBegin = "<%",
        signEnd = "%>",
      filters = []


    var tmpl= (function (cache, $) { 
    return function (str, data) { 
        var endRegx = new RegExp("((^|"+signEnd+")[^\\t]*)'","g")
        console.log(endRegx)
        var varRegx = new RegExp("\t=(.*?)"+signEnd,"g")
        console.log(varRegx)
        var fn = !/\s/.test(str) 
        ? cache[str] = cache[str] 
        || tmpl(document.getElementById(str).innerHTML) 
        : function (data) { 
            var i, variable = [$], value = [[]]; 
            for (i in data) { 
                variable.push(i); 
                value.push(data[i]); 
            }; 
            return (new Function(variable, fn.$)) 
            .apply(data, value).join(""); 
        }; 
        fn.$ = fn.$ || $ + ".push('" 
        + str.replace(/\\/g, "\\\\") 
        .replace(/[\r\t\n]/g, " ") 
        .split(signBegin).join("\t") 
        .replace(endRegx, "$1\r") 
        // .replace(/((^|%>)[^\t]*)'/g, "$1\r")
        .replace(varRegx, "',$1,'") 
        // console.error(fn.$)

        // .replace(/\t=(.*?)%>/g, "',$1,'") 
        .split("\t").join("');") 
        .split(signEnd).join($ + ".push('") 
        .split("\r")
        .join("\\'") 
        + "');return " + $; 
        console.log(fn.$)
        // fn.$=fn.$.join("\\'") 
        console.log(fn.$)
        return data ? fn(data) : fn; 
    }})({}, '$' + (+ new Date));


    $.SimpleTmpl = tmpl
    $.SimpleTmpl.prototype = {

    }

}(jQuery));
