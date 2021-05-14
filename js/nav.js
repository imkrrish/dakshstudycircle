var prevScrollpos = window.pageYOffset;

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("navbar").classList.add("sticky");
        document.getElementById("hero").classList.add("marginTop");
        document.getElementById("sticky-logo").style.display = "contents";

        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-100%";
        }
        prevScrollpos = currentScrollPos;

    } else {
        document.getElementById("sticky-logo").style.display = "none";
        document.getElementById("navbar").classList.remove("sticky");
        document.getElementById("hero").classList.remove("marginTop");
    }
}