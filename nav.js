/**
 * Digital Product Passport Lite - Navigation Script
 * Handles: Navigation injection, mobile menu, scroll effects, active states
 */

// Page data for navigation
const pages = [
    { url: 'index.html', title: 'หน้าแรก', icon: 'fa-home', short: 'หน้าแรก' },
    { url: '2.html', title: 'ปัญหา', icon: 'fa-exclamation-triangle', short: 'ปัญหา' },
    { url: '3.html', title: 'โอกาส', icon: 'fa-chart-line', short: 'โอกาส' },
    { url: '4.html', title: 'โซลูชัน', icon: 'fa-lightbulb', short: 'โซลูชัน' },
    { url: '5.html', title: 'ลูกค้า', icon: 'fa-users', short: 'ลูกค้า' },
    { url: '6.html', title: 'แบรนด์', icon: 'fa-building', short: 'แบรนด์' },
    { url: '7.html', title: 'ฟีเจอร์', icon: 'fa-star', short: 'ฟีเจอร์' },
    { url: '8.html', title: 'Phase 2', icon: 'fa-rocket', short: 'Phase 2' },
    { url: '9.html', title: 'ตลาด', icon: 'fa-bullseye', short: 'ตลาด' },
    { url: '10.html', title: 'รายได้', icon: 'fa-dollar-sign', short: 'รายได้' },
    { url: '11.html', title: 'คู่แข่ง', icon: 'fa-chess', short: 'คู่แข่ง' },
    { url: '12.html', title: 'Roadmap', icon: 'fa-road', short: 'Roadmap' },
    { url: '13.html', title: 'ทีม', icon: 'fa-people-group', short: 'ทีม' },
    { url: '14.html', title: 'เงินทุน', icon: 'fa-wallet', short: 'เงินทุน' },
    { url: '15.html', title: 'CTA', icon: 'fa-phone', short: 'ติดต่อ' }
];

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return filename;
}

// Get current page index
function getCurrentPageIndex() {
    const currentPage = getCurrentPage();
    return pages.findIndex(p => p.url === currentPage) + 1;
}

// Create navigation HTML
function createNavHTML() {
    const currentPage = getCurrentPage();
    const currentIndex = getCurrentPageIndex();
    const isHomePage = currentPage === 'index.html';
    
    let navLinksHTML = pages.map((page, index) => {
        const isActive = page.url === currentPage;
        return `
            <li>
                <a href="${page.url}" class="${isActive ? 'active' : ''}" title="${page.title}">
                    <i class="fa-solid ${page.icon}"></i>
                    <span>${page.short}</span>
                </a>
            </li>
        `;
    }).join('');
    
    return `
        <nav class="main-nav" id="mainNav">
            <a href="index.html" class="nav-logo">
                <div class="nav-logo-icon">
                    <i class="fa-solid fa-passport"></i>
                </div>
                <div class="nav-logo-text">
                    <span>Digital Product</span>
                    <span>Passport Lite</span>
                </div>
            </a>
            
            <ul class="nav-links" id="navLinks">
                ${navLinksHTML}
            </ul>
            
            <div class="page-indicator">
                <div class="page-indicator-number">${currentIndex}</div>
                <span>/ ${pages.length}</span>
            </div>
            
            <button class="nav-toggle" id="navToggle" aria-label="Toggle Navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
        <div class="nav-overlay" id="navOverlay"></div>
    `;
}

// Inject navigation into page
function injectNavigation() {
    // Create nav container
    const navContainer = document.createElement('div');
    navContainer.innerHTML = createNavHTML();
    
    // Insert at the beginning of body
    document.body.insertBefore(navContainer, document.body.firstChild);
    
    // Add home page class if on index
    if (getCurrentPage() === 'index.html') {
        const slideContainer = document.querySelector('.slide-container');
        if (slideContainer) {
            slideContainer.classList.add('home-page');
        }
    }
    
    // Initialize navigation functionality
    initNavigation();
}

// Initialize navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const mainNav = document.getElementById('mainNav');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on a link (mobile)
    const allLinks = document.querySelectorAll('.nav-links li a');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Scroll effect for nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentIndex = getCurrentPageIndex();
        
        // Arrow Left/Right for navigation
        if (e.key === 'ArrowRight' && currentIndex < pages.length) {
            window.location.href = pages[currentIndex].url;
        } else if (e.key === 'ArrowLeft' && currentIndex > 1) {
            window.location.href = pages[currentIndex - 2].url;
        }
        
        // Escape to close menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add smooth transitions for page elements
function addAnimations() {
    const animateElements = document.querySelectorAll('.content-wrapper, .title-section, .features-grid, .column-card, .trend-card, .feature-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    addAnimations();
    
    // Add touch swipe support for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const currentIndex = getCurrentPageIndex();
        
        if (touchEndX - touchStartX > swipeThreshold && currentIndex > 1) {
            // Swipe right - go to previous page
            window.location.href = pages[currentIndex - 2].url;
        } else if (touchStartX - touchEndX > swipeThreshold && currentIndex < pages.length) {
            // Swipe left - go to next page
            window.location.href = pages[currentIndex].url;
        }
    }
});

// Console welcome message
console.log('%c✨ Digital Product Passport Lite', 'color: #0066CC; font-size: 20px; font-weight: bold;');
console.log('%cUse Arrow Keys (←/→) to navigate between pages', 'color: #00CC66; font-size: 12px;');
