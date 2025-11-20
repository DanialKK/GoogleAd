document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('sliderWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    const totalSlides = wrapper.children.length;

    // ساخت دات‌ها
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        wrapper.style.transform = `translateX(${ -currentIndex * 100 }%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // اتوپلی
    // let autoPlay = setInterval(nextSlide, 5000);
    //
    // const container = document.querySelector('.slider-container');
    // container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    // container.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));

    // سوایپ موبایل
    let startX = 0;
    wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    wrapper.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    }, { passive: true });

    // شروع اولیه
    updateSlider();
});