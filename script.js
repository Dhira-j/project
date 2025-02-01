document.addEventListener("DOMContentLoaded", () => {
   // 
    document.querySelectorAll('.maincard').forEach(card => {
        // Set initial state
        gsap.set(card, {
            pointerEvents: 'none',
            borderRadius: '15px', // Add smooth corners
            overflow: 'hidden'    // Ensure content respects border radius
        });
        
        // Enable interactions after delay
        gsap.to(card, {
            pointerEvents: 'auto',
            delay: 7
        });

        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(card, {
                backgroundPosition: `${x * 15}px ${y * 15}px`,
                transform: `perspective(1000px) rotateX(${y * 7}deg) rotateY(${-x * 8}deg) scale3d(1.02, 1.02, 1.02)`,
                duration: 2.5,
                ease: "circ.out",
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                backgroundPosition: 'center',
                transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    
    
    
    
    
    // Split text into words
    const tl = gsap.timeline({ paused: true });
    // Set up Intersection Observer
    let hasAnimated = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated.has(entry.target)) {
                hasAnimated.add(entry.target);
                if (entry.target.classList.contains('mainsectiontext')) {
                    animateMainText(entry.target);
                } else if (entry.target.classList.contains('card')) {
                    animateCard(entry.target);
                } else if (entry.target.classList.contains('header')) {
                    animateHeader(entry.target);
                } else if (entry.target.classList.contains('maincard')) {
                    animateMainCard(entry.target);
                } else if (entry.target.classList.contains('footer')) {
                    animateFooter(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });
    // Add mouse move event listener for card images
    document.querySelectorAll('.card').forEach(card => {
        const image = card.querySelector('img');
        if (!image) return;

        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(image, {
                rotationY: x * 20,
                rotationX: -y * 20,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    const logo = document.querySelector('.logo');
    const socialMedia = document.querySelector('.socialmedia').children;
    const downloadButtons = document.querySelector('.downloadbutton').children;

    // Create timeline for header elements
    tl.from(logo, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(socialMedia, {
        y: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5")
    .from(downloadButtons, {
        y: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5");

    tl.play();

    // Observe all elements
    const elementsToObserve = [
        '.mainsectiontext',
        '.card',
        '.header',
        '.maincard',
        '.footer'
    ].forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => observer.observe(element));
    });

    function animateMainText(element) {
        let splitMainText = new SplitType(element, { types: "words" });
        gsap.from(splitMainText.words, {
            opacity: 0,
            y: -100,
            stagger: 0.3,
            duration: 1,
            ease: "bounce.out"
        });
    }

    function animateCard(card) {
        const h1 = card.querySelector(".h1");
        const heading = card.querySelector(".cardheading");
        const text = card.querySelector(".cardtext");

        if (h1) {
            let splitH1 = new SplitType(h1, { types: "words" });
            gsap.from(splitH1.words, {
                opacity: 0,
                y: -100,
                stagger: 0.3,
                duration: 0.3,
                ease: "bounce.out"
            });
        }

        if (heading) {
            let splitHeading = new SplitType(heading, { types: "words" });
            gsap.from(splitHeading.words, {
                opacity: 0,
                y: -100,
                stagger: 0.3,
                duration: 0.3,
                ease: "bounce.out",
                delay: 0.3
            });
        }

        if (text) {
            let splitText = new SplitType(text, { types: "words" });
            gsap.from(splitText.words, {
                opacity: 0,
                y: -100,
                stagger: 0.3,
                duration: 0.3,
                ease: "bounce.out",
                delay: 0.6
            });
        }
    }

    function animateHeader(header) {
        gsap.from(header, { 
            y: -50, 
            opacity: 0, 
            duration: 3, 
            ease: "power3.out" 
        });
    }

    function animateMainCard(maincard) {
        gsap.from(maincard, {
            y: -20,
            opacity: 0,
            duration: 10,
            scale: 0.5,
            ease: "power3.out"
        });
    }

    function animateFooter(footer) {
        gsap.from(footer, { 
            opacity: 0, 
            y: 50, 
            duration: 5, 
            ease: "power3.out", 
            delay: 2 
        });
    }
});


