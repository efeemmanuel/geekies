document.getElementById("hamburger").addEventListener("click", function() {
    let navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("active"); // Ensure it matches the CSS class
});


document.addEventListener("click", function(event) {
    let navMenu = document.getElementById("nav-menu");
    let hamburger = document.getElementById("hamburger");
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove("show");
    }
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelectorAll(".nav-menu a").forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
    });
});


// for navbar
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) { // Change background when scrolled 50px
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});



// typewriting
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


function openLightbox(img) {
    document.getElementById("lightbox").classList.add("active");
    document.getElementById("lightbox-img").src = img.src;
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}






//carousel 
// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));

document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
});

// Auto-advance every 5 seconds
let autoSlide = setInterval(() => showSlide(currentSlide + 1), 5000);

// Pause on hover
document.querySelector('.hero-carousel').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.hero-carousel').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => showSlide(currentSlide + 1), 5000);
}); 






















// image scrolling for gallery
document.addEventListener("DOMContentLoaded", function () {
const images = document.querySelectorAll(".gallery img");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                entry.target.classList.remove("hide");
            } else {
                entry.target.classList.add("hide");
                entry.target.classList.remove("show");
            }
        });
    },
    { threshold: 0.2 } // Trigger when 20% of the image is visible
);

    images.forEach((img) => observer.observe(img));
});




















// reserch page 
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const rows = document.querySelectorAll('.table-row');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Filter functionality
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', function() {
        const filterValue = this.value;
        rows.forEach(row => {
            const discipline = row.dataset.discipline;
            if(!filterValue || discipline === filterValue) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Sorting functionality
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const sortBy = this.dataset.sort;
            const rowsArray = Array.from(rows);
            
            rowsArray.sort((a, b) => {
                const aValue = a.querySelector(`[data-${sortBy}]`).textContent;
                const bValue = b.querySelector(`[data-${sortBy}]`).textContent;
                return aValue.localeCompare(bValue);
            });

            const tableBody = document.querySelector('.table-body');
            tableBody.innerHTML = '';
            rowsArray.forEach(row => tableBody.appendChild(row));
        });
    });
});
















    // Check for successful form submission
    if (new URLSearchParams(window.location.search).has('form_submitted')) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #4CAF50;
                color: white;
                padding: 15px 25px;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: fadeIn 0.3s;
            ">
                ✓ Message submitted successfully!
            </div>
        `;
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Clean URL (remove query params)
        history.replaceState(null, '', window.location.pathname);
    }