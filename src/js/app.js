$(function () {
    $("a").click(function (e) {
        e.preventDefault();
    });

    $("html, body").click(function (e) {
        if (e.target == document.documentElement) {
            $(this).removeClass("opened-side-menu");
        }
    });

    $(".toogle-sidebar a").click(function (e) {
        e.preventDefault();
        $("html").addClass("opened-side-menu");
    });
});