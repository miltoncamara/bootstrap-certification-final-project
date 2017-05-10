$(function() {
    $("html, body").click(function(e) {
        if(e.target == document.documentElement){
            $(this).removeClass("opened-side-menu");
        }
    });
});