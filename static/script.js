document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Symptom Checker Form
    const symptomForm = document.getElementById('symptom-checker');
    const resultContainer = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    const resetButton = document.getElementById('reset-form');
    
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Count "yes" answers
            const headache = document.querySelector('input[name="headache"]:checked')?.value === 'yes';
            const vision = document.querySelector('input[name="vision"]:checked')?.value === 'yes';
            const nausea = document.querySelector('input[name="nausea"]:checked')?.value === 'yes';
            const seizure = document.querySelector('input[name="seizure"]:checked')?.value === 'yes';
            const balance = document.querySelector('input[name="balance"]:checked')?.value === 'yes';
            
            const yesCount = [headache, vision, nausea, seizure, balance].filter(Boolean).length;
            
            // Display appropriate message based on count
            let message = '';
            
            if (yesCount === 0) {
                message = 'Based on your responses, you are not currently experiencing common symptoms associated with brain tumors. However, if you have any health concerns, it\'s always best to consult with a healthcare professional.';
            } else if (yesCount === 1) {
                message = 'You are experiencing one symptom that could be associated with various conditions, including but not limited to brain tumors. This single symptom alone is not necessarily cause for alarm, but monitoring is recommended. Consider discussing this with your healthcare provider during your next visit.';
            } else if (yesCount === 2) {
                message = 'You are experiencing multiple symptoms that could be associated with various conditions. While these symptoms alone do not confirm any diagnosis, it would be advisable to consult with a healthcare professional for proper evaluation.';
            } else {
                message = 'You are experiencing several symptoms that could be associated with various neurological conditions. It is recommended that you consult with a healthcare professional promptly for proper evaluation and diagnosis.';
            }
            
            // Show result
            resultText.textContent = message;
            symptomForm.classList.add('hidden');
            resultContainer.classList.remove('hidden');
        });
    }
    
    // Reset symptom checker form
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            symptomForm.reset();
            symptomForm.classList.remove('hidden');
            resultContainer.classList.add('hidden');
        });
    }
    
    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    const bookingConfirmation = document.getElementById('booking-confirmation');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            if (!name || !email || !phone || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (simple check)
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Show confirmation (in a real app, this would submit to a server)
            bookingForm.classList.add('hidden');
            bookingConfirmation.classList.remove('hidden');
            
            // In a real application, you would send this data to a server
            console.log({
                name,
                email,
                phone,
                date,
                time,
                concerns: document.getElementById('concerns').value
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.symptom-card, .prevention-card, .about-image, .about-text, .detection-tool, .detection-info, .consultation-form, .consultation-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.symptom-card, .prevention-card, .about-image, .about-text, .detection-tool, .detection-info, .consultation-form, .consultation-info');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});

// Placeholder images (in a real project, you would use actual images)
// This is just to simulate the image paths that would be used
const placeholderImages = {
    'brain-illustration.png': '/placeholder.svg?height=400&width=400',
    'brain-tumor.png': '/placeholder.svg?height=350&width=350',
    'headache-icon.png': '/placeholder.svg?height=40&width=40',
    'vision-icon.png': '/placeholder.svg?height=40&width=40',
    'balance-icon.png': '/placeholder.svg?height=40&width=40',
    'speech-icon.png': '/placeholder.svg?height=40&width=40',
    'nausea-icon.png': '/placeholder.svg?height=40&width=40',
    'seizure-icon.png': '/placeholder.svg?height=40&width=40'
};

// Replace placeholder image sources
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (placeholderImages[src]) {
            img.setAttribute('src', placeholderImages[src]);
        }
    });
});