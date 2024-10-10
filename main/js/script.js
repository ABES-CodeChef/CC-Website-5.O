const card = document.getElementById('card');
const message = document.getElementById('message');
let showBack = false;

card.addEventListener('click', () => {
    showBack = !showBack;
    if (showBack) {
        card.classList.add('show-back');
    } else {
        card.classList.remove('show-back');
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { 
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
});
