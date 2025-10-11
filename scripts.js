// Wait for the entire HTML document to be loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS (Animate on Scroll) Library
    // This adds fade-up and other animations as the user scrolls.
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true,     // Whether animation should happen only once
        offset: 100     // Offset (in px) from the original trigger point
    });

    // 2. Animate the Main Heading
    // This script animates the "Welcome to Cubclan" text letter by letter.
    const heading = document.getElementById('animated-heading');
    if (heading) {
        const welcomeText = "Welcome to ";
        const brandText = "Cubclan";
        heading.innerHTML = ''; // Clear the original content
        
        let charDelay = 0;
        const delayIncrement = 50; // Delay in milliseconds between each character

        const createAnimatedChars = (text, parentElement) => {
            text.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'animated-char';
                charSpan.textContent = char;
                if (char === ' ') {
                    charSpan.style.width = '0.5em'; // Prevent spaces from collapsing
                }
                charSpan.style.animationDelay = `${charDelay}ms`;
                parentElement.appendChild(charSpan);
                charDelay += delayIncrement;
            });
        };

        // Animate "Welcome to "
        createAnimatedChars(welcomeText, heading);

        // Create the colored span for the brand name
        const brandSpan = document.createElement('span');
        brandSpan.className = 'text-yellow-300';
        heading.appendChild(brandSpan);

        // Animate "Cubclan" inside its colored span
        createAnimatedChars(brandText, brandSpan);
    }

    // 3. Smooth Scrolling for Anchor Links (e.g., "#about")
    // This makes page jumps smooth instead of instant.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Interactive Hover Effect for Product Cards
    // Adds a subtle scale and lift effect to product cards on mouseover.
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 5. Ripple Click Effect for All Buttons
    // Adds a visual feedback animation when any button is clicked.
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create the ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            // Clean up the ripple element after the animation finishes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

});

// 6. Dynamically Inject CSS for the Ripple Effect
// This keeps all the ripple-related code (CSS and JS) together.
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);