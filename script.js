
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        const elementPosition = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function fadeInOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        } else {
            entry.target.style.opacity = 0;
            entry.target.style.transform = 'translateY(50px)';
        }
    });
}

const observer = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.1
});

document.querySelectorAll('.container').forEach(section => {
    observer.observe(section);
});

document.getElementById('latest-news-button').addEventListener('click', () => scrollToSection('latest-news-container'));
document.getElementById('my-contacts-button').addEventListener('click', () => scrollToSection('contacts-container'));
document.getElementById('server-info-button').addEventListener('click', () => scrollToSection('server-info-container'));
