const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav__list")

const handleClick = () => {
    hamburger.classList.toggle("hamburger--active");
    nav.classList.toggle("nav__list--active");
    
    
}

hamburger.addEventListener("click", handleClick);

const media = window.matchMedia("(max-width: 880px)");
media.addEventListener('change', function (media) {

    if (!media.matches) {
        nav.classList.remove('nav__list--active');
        hamburger.classList.remove('hamburger--active');
    }
})
