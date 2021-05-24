window.addEventListener('resize', function () {
    addRequiredClass();
})


function addRequiredClass() {
    if (window.innerWidth < 992) {
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