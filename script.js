// Set current date
function setCurrentDate() {
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// Add smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation for images
function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}

// Add interactive hover effects
function initHoverEffects() {
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Simple slider functionality for hero section
let currentSlide = 0;
function initSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    
    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    // Auto-rotate slides every 5 seconds
    setInterval(nextSlide, 5000);
}

// Add click-to-expand functionality for news cards
function initNewsCardClick() {
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', function() {
            // This could be expanded to show full article content
            console.log('Article clicked:', this.querySelector('h3').textContent);
        });
    });
}

// Weather data update (simulation)
function updateWeather() {
    const weatherElements = document.querySelectorAll('.weather-temp');
    weatherElements.forEach(element => {
        // Simulate weather updates
        const currentTemp = parseInt(element.textContent);
        const newTemp = currentTemp + Math.floor(Math.random() * 3) - 1;
        element.textContent = newTemp + '°';
    });
}

// Add reading progress indicator
function initReadingProgress() {
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Create or update progress bar
        let progressBar = document.getElementById('reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 3px;
                background: #B30000;
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// Add search functionality (basic)
function searchArticles(query) {
    const articles = document.querySelectorAll('.news-card h3');
    articles.forEach(article => {
        const card = article.closest('.news-card');
        if (article.textContent.toLowerCase().includes(query.toLowerCase())) {
            card.style.display = 'block';
            card.style.backgroundColor = '#fff3cd';
        } else {
            card.style.display = query ? 'none' : 'block';
            card.style.backgroundColor = 'white';
        }
    });
}

// Mobile Menu Functions
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    function openMenu() {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle && navMenu && menuOverlay && closeBtn) {
        // فتح القائمة
        menuToggle.addEventListener('click', openMenu);

        // إغلاق القائمة
        closeBtn.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu);

        // إغلاق القائمة عند النقر على أي رابط
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // إغلاق القائمة عند تغيير حجم النافذة
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // إغلاق القائمة عند الضغط على زر ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Breaking News Rotation
function initBreakingNews() {
    const newsContainer = document.getElementById('breakingNewsContent');
    if (!newsContainer) return;

    const newsItems = newsContainer.getElementsByClassName('news-item');
    let currentIndex = 0;

    function showNextNews() {
        // إخفاء العنوان الحالي
        newsItems[currentIndex].classList.remove('active');
        
        // الانتقال إلى العنوان التالي
        currentIndex = (currentIndex + 1) % newsItems.length;
        
        // إظهار العنوان الجديد
        newsItems[currentIndex].classList.add('active');
    }

    // تغيير العناوين كل 5 ثواني
    setInterval(showNextNews, 5000);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize page
function initPage() {
    setCurrentDate();
    initSmoothScroll();
    initImageLoading();
    initHoverEffects();
    initSlider();
    initNewsCardClick();
    initReadingProgress();
    initBreakingNews();
    initMobileMenu();
    initLazyLoading();
    initBackToTop();

    // Update weather every 5 minutes (simulation)
    setInterval(updateWeather, 300000);
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // تحسين أداء الموقع على الهواتف
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').catch(() => {});
        });
    }

    console.log('هلا الوطن - الموقع الإخباري العربي محمّل بنجاح');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
