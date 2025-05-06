// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
    
    // For a real implementation, you would use:
    // fetch('/send', { method: 'POST', body: JSON.stringify(formData) })
    //   .then(response => alert('Message sent!'))
    //   .catch(error => alert('Error sending message'));
});

// Enhanced profession typing animation
const professions = [
    {text: "Freelancer", color: "#3498db"},
    {text: "Web Developer", color: "#e74c3c"},
    {text: "Mobile App Developer", color: "#2ecc71"},
    {text: "PowerBI Developer", color: "#9b59b6"},
    {text: "Web App Penetration Tester", color: "#f39c12"}
];

let professionElement = document.getElementById('profession');
let currentProfession = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Add cursor element
professionElement.innerHTML += '<span class="cursor">|</span>';
const cursor = document.querySelector('.cursor');

function typeProfession() {
    const {text, color} = professions[currentProfession];
    
    // Apply color
    professionElement.style.color = color;
    
    if (isDeleting) {
        professionElement.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        professionElement.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // Add cursor back (it gets removed when we set textContent)
    professionElement.innerHTML += '<span class="cursor">|</span>';
    
    if (!isDeleting && charIndex === text.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentProfession = (currentProfession + 1) % professions.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeProfession, typingSpeed);
}

// Add blinking cursor animation
function blinkCursor() {
    cursor.style.visibility = (cursor.style.visibility === 'hidden') ? 'visible' : 'hidden';
    setTimeout(blinkCursor, 500);
}

// Start animations
window.addEventListener('DOMContentLoaded', () => {
    typeProfession();
    blinkCursor();
});

// Skills Animation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    function checkSkillsInView() {
        skillItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('in-view');
                
                // Animate skill bars
                const skillLevel = item.querySelector('.skill-level');
                const targetWidth = skillLevel.style.width;
                
                setTimeout(() => {
                    skillLevel.style.width = targetWidth;
                }, 300);
            }
        });
    }
    
    // Run on load
    checkSkillsInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkSkillsInView);
});

document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });
    
    if (servicesSection) {
        observer.observe(servicesSection);
    }
});