const imgHamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation-list');



imgHamburger.addEventListener('click', () => {
    navigation.classList.toggle('navigation-list-active');
})