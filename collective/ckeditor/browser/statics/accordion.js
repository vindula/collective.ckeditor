//retirado de ("http://www.ssdtutorials.com/tutorials/title/accordion-functionality.html")
$(document).ready(function() {

    if($(".acc").length > 0) {
        $(".acc dt").click(function() {

            var sel = $(this);

            // add class to the element
            // to indicate current selector
            sel.addClass("act current");

            // loop through all dd elements to slide them up
            // except the current one in case we simply want to slide it up
            sel.parent().children("dd").each(function() {
                if($(this).is(":visible") && !$(this).prev("dt").hasClass("current")) {
                    if($(this).prev("dt").hasClass("act")) {
                        $(this).prev("dt").removeClass("act");
                    }
                    $(this).slideUp(300);
                }
            });

            // toogle slide and remove class from the current selector
            sel.next().slideToggle(300, function() {
                if(!$(this).is(":hidden")) {
                    $(this).prev("dt").removeClass("act");
                }
                sel.removeClass("current");
            });

            var imgexp = sel.find('img.expandir');
            var imgret = sel.find('img.retrair');
            if(imgexp.is(':hidden')){
                imgexp.show();
                imgret.hide();
            }else{
                imgexp.hide();
                imgret.show();
            }

            return false;

        });
    }

});

