/*!
 * jQuery Plugin: mask v3.0.0
 *
 * Copyright (c) 2007 Cyber Design : Kyow (http://cyber-design.jp/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * LastUpdate: 2013-11-12 11:12 +09:00
 */
(function($) {


    $.fn.mask = function(_bgcolor, _opacity, _class)
    {
        /* Arguments Check */
        if (_bgcolor === undefined) {
            _bgcolor = "#000000";
        }
        if (_opacity === undefined) {
            _opacity = 0.5;
        } else if (false === isFinite(_opacity) || _opacity < 0 || _opacity > 1) {
            console.error("jquery.mask() : The 2nd argument is invalid number.");
            return false;
        }
        if (_class === undefined) {
            _class = "jquery_mask";
        } else if (_class.match(/[^\-\.:_0-9a-z]|^[^a-z]/i)) {
            console.error("jquery.mask() : The 3rd argument is not class attribute format.");
            return false;
        }
        if (0 === $(this).length) {
            console.error("jquery.mask() : The element is undefined.");
            return false;
        }
        /* Main */
        var w = $(this).outerWidth();
        var h = $(this).outerHeight();
        var p = $(this).position();
        var mask = $('<div class="'+_class+'"></div>').appendTo($(this));
        mask.css(
        {
            width: w+"px",
            height: h+"px",
            position: "absolute",
            left: p.left+"px",
            top: p.top+"px",
            backgroundColor: _bgcolor,
            opacity: _opacity
        });
        return mask;
    },


    $.fn.maskAll = function(_bgcolor, _opacity, _class)
    {
        /* Arguments Check */
        if (_bgcolor === undefined) {
            _bgcolor = "#000000";
        }
        if (_opacity === undefined) {
            _opacity = 0.5;
        } else if (false === isFinite(_opacity) || _opacity < 0 || _opacity > 1) {
            console.error("jquery.maskAll() : The 2nd argument is invalid number.");
            return false;
        }
        if (_class === undefined) {
            _class = "jquery_maskAll";
        } else if (_class.match(/[^\-\.:_0-9a-z]|^[^a-z]/i)) {
            console.error("jquery.maskAll() : The 3rd argument is not class attribute format.");
            return false;
        }
        /* Main */
        $("body").css("overflow", "hidden");
        var mask = $('<div class="'+_class+'"></div>').appendTo($("body"));
        mask.css({position: "fixed", left: "0px", top: "0px", width:"100%", height: "100%", backgroundColor: _bgcolor, opacity: _opacity});
        return mask;
    },


    $.fn.unmask = function(_scrollbar)
    {
        /* Arguments Check */
        if (_scrollbar === undefined) {
            _scrollbar = false;
        } else if ("boolean" !== typeof(_scrollbar)) {
            console.error("jquery.unmask() : The 1st argument is not boolean type.");
            return false;
        }
        if (0 === $(this).length) {
            console.error("jquery.unmask() : The element is undefined.");
            return false;
        }
        /* Main */
        $(this).remove();
        if (_scrollbar === true) {
            if ("hidden" === $("body").css("overflow")) {
                $("body").css("overflow", "auto");
            }
        }
        return true;
    };


})(jQuery);