$(document).ready(function () {
    $('body').append('<div id="tooltip"><div id="tooltipArrow"></div><div id="tooltipText"></div></div>');
});
(function ($) {
    $.fn.tooltip = function () {
        this.each(function () {
            var attr = $(this).attr('title');
            $(this).data('title', attr);
            $(this).removeAttr('title');
        });

        this.hover(function () {
            var top = $(this).offset().top;
            var left = $(this).offset().left;
            var width = $(this).width();
            var height = $(this).height();
            var text = $(this).data('title');

            $('#tooltip #tooltipArrow').css('margin', '0px');
            $('#tooltip #tooltipText').empty().text(text);
            $('#tooltip').show();

            var tooltipWidth = $('#tooltip').width();

            var leftPos = left + (width / 2) - (tooltipWidth / 2);
            if (leftPos < 0) {
                $('#tooltip #tooltipArrow').css({
                    'margin-left': leftPos - 5 + 'px'
                });
                leftPos = 5;
            }
            if (leftPos + tooltipWidth > $(window).width()) {
                $('#tooltip #tooltipArrow').css({
                    'margin-left': (leftPos + tooltipWidth - $(window).width()) + 15 + 'px'
                });
                leftPos = $(window).width() - tooltipWidth - 15;
            }

            $('#tooltip').css({
                'top': top + height + 10,
                'left': leftPos
            });
        }, function () {
            $('#tooltip #tooltipText').empty();
            $('#tooltip').hide();
            $('#tooltip #tooltipArrow').css('margin', '0px');
        });
        return this;
    };
})(jQuery);