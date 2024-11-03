// main.js
import { initializeAnimations } from './utils/animations';

document.addEventListener('DOMContentLoaded', () => {    
    // Initialize animations
    initializeAnimations();
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});