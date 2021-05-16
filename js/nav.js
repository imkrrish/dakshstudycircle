var prevScrollpos = window.pageYOffset;

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("navbar").classList.add("sticky");
        document.getElementById("hero").classList.add("marginTop");

        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("sticky-logo").style.display = "contents";
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-100%";
            document.getElementById("sticky-logo").style.display = "none";
        }
        prevScrollpos = currentScrollPos;

    } else {
        document.getElementById("navbar").classList.remove("sticky");
        document.getElementById("hero").classList.remove("marginTop");
        document.getElementById("sticky-logo").style.display = "none";
        if (window.innerWidth < 860) {
            document.getElementById("sticky-logo").style.display = "contents";
        }
    }
}


window.addEventListener('resize', function () {
    addRequiredClass();
})


function addRequiredClass() {
    if (window.innerWidth < 860) {
        document.getElementById("navbar").classList.add("mobile");
        document.getElementById("sticky-logo").style.display = "contents";
    } else {
        document.getElementById("navbar").classList.remove("mobile");
        document.getElementById("sticky-logo").style.display = "none";
    }
}

window.onload = addRequiredClass

let hamburger = document.querySelector('.hamburger')
let mobileNav = document.querySelector('.nav-list')

let bars = document.querySelectorAll('.hamburger span')

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open')
    mobileNav.classList.toggle('open')
})