/*!
 * jQuery Plugin: centerView v0.0.1
 *
 * Copyright (c) 2007 Cyber Design : Kyow (http://cyber-design.jp/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * LastUpdate: 2013-11-12 14:40 +09:00
 */
(function($) {

    $.fn.centerView = function()
    {
        /* Arguments Check */
        if (0 === $(this).length) {
            console.error("jquery.centerView() : The element is undefined.");
            return false;
        }
        /* Main */
        var the = new Object();
        the.w = $(this).width();
        the.h = $(this).height();
        the.elm = $(this);
        var win_w = $(window).width();
        var win_h = $(window).height();
        var t = 50 - (((the.h / win_h) * 100) / 2);
        var l = 50 - (((the.w / win_w) * 100) / 2);
        $(this).css({position: "fixed", top: t+"%", left: l+"%"});
        $(window).resize(function()
        {
            var win_w = $(window).width();
            var win_h = $(window).height();
            var t = 50 - (((the.h / win_h) * 100) / 2);
            var l = 50 - (((the.w / win_w) * 100) / 2);
            the.elm.css({position: "fixed", top: t+"%", left: l+"%"});
        });
        return the.elm;
    };

})(jQuery);