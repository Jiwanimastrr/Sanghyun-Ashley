document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Removal
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1000);

    // 2. Intersection Observer for Fade-in-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. D-Day Calculator
    const weddingDate = new Date('2026-05-09T12:00:00').getTime();
    const counterElement = document.getElementById('dDayCounter');
    
    function updateCounter() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            counterElement.innerText = "저희 부부의 새로운 출발을 응원해 주셔서 감사합니다!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        counterElement.innerText = `Ashley 💍 상현의 예식일이 ${days}일 남았습니다.`;
    }
    updateCounter();

    // 4. Accordion for Accounts
    const accordions = document.querySelectorAll('.accordion-btn');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 5. Toast Notification for Copy
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = '계좌번호가 복사되었습니다.';
    document.body.appendChild(toast);

    window.copyText = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert("복사에 실패했습니다. 수동으로 복사해 주세요.");
        });
    }

    // 6. Gallery 'Load More' (Mock behavior)
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if(loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // For real usage, append more image elements here
            alert('이 기능은 실제 기기에서 부드럽게 작동할 수 있도록 추가 연동이 필요합니다.');
        });
    }
});
