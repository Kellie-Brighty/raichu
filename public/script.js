document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Interaction
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Random Lightning Flash Effect
    const overlay = document.getElementById('lightning-overlay');
    
    function triggerLightning() {
        const delay = Math.random() * 8000 + 4000; // Random flash every 4-12 seconds
        
        setTimeout(() => {
            overlay.classList.add('flash');
            setTimeout(() => {
                overlay.classList.remove('flash');
                triggerLightning();
            }, 200);
        }, delay);
    }

    triggerLightning();

    // CA Copier logic
    const caCopier = document.getElementById('ca-copier');
    const FULL_CA = "0x0000000000000000000000000000000000000000";

    caCopier.addEventListener('click', () => {
        navigator.clipboard.writeText(FULL_CA).then(() => {
            const originalText = caCopier.querySelector('.ca-label').innerText;
            caCopier.querySelector('.ca-label').innerText = 'COPIED!';
            caCopier.style.borderColor = 'var(--lightning-blue)';
            
            setTimeout(() => {
                caCopier.querySelector('.ca-label').innerText = originalText;
                caCopier.style.borderColor = 'rgba(255, 224, 93, 0.3)';
            }, 2000);
        });
    });

    // Smooth Scroll Bolt Click
    const bolt = document.querySelector('.bolt');
    bolt.addEventListener('click', () => {
        document.getElementById('origins').scrollIntoView({ behavior: 'smooth' });
    });
});

// YouTube IFrame Player API Integration
let player;
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;
let isPlayerReady = false;

window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: 'M9ucTqmwFCI',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'M9ucTqmwFCI',
            'origin': window.location.origin || '*'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
};

function onPlayerReady(event) {
    isPlayerReady = true;
}

musicBtn.addEventListener('click', () => {
    if (!player || !isPlayerReady) return;

    if (isPlaying) {
        player.pauseVideo();
        musicBtn.querySelector('.icon').innerText = '🔇';
        musicBtn.classList.remove('playing');
    } else {
        player.playVideo();
        musicBtn.querySelector('.icon').innerText = '🔊';
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});
