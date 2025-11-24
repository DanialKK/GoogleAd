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
        wrapper.style.transform = `translateX(${currentIndex * 100}%)`;

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
    let autoPlay = setInterval(nextSlide, 5000);

    const container = document.querySelector('.slider-container');
    container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    container.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));

    // سوایپ موبایل
    let startX = 0;
    wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive: true});
    wrapper.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    }, {passive: true});

    // شروع اولیه
    updateSlider();
});

// شمارنده خدمات
const counters = document.querySelectorAll('.counter');
const speed = 40;
const animateCounters = () => {
    counters.forEach(counter => {
        const update = () => {
            const target = +counter.getAttribute('data-target');
            const value = +counter.innerText;
            const increment = target / speed;
            if (value < target) {
                counter.innerText = Math.ceil(value + increment);
                setTimeout(update, 30);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
};
let started = false;
window.addEventListener('scroll', () => {
    const section = counters[0]?.closest('section');
    if (section) {
        const top = section.getBoundingClientRect().top;
        if (!started && top < window.innerHeight - 100) {
            animateCounters();
            started = true;
        }
    }
});

// همه لوگو ها
const items = document.querySelectorAll('.brand-item');
  
// IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const idx = Number(el.dataset.index || 0);

      const delayMs = idx * 60;

      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      const finalDelay = isMobile ? delayMs : (idx * 70);

      el.style.transitionDelay = finalDelay + 'ms';

      el.classList.remove('opacity-0', 'translate-y-5');
      el.classList.add('opacity-100', 'translate-y-0');

      observer.unobserve(el);
    }
  });
}, { threshold: 0.25 });

items.forEach(i => observer.observe(i));

// نظرات
document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();  
  alert("نظر شما با موفقیت ارسال شد!");
});