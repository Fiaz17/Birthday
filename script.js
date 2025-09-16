// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in a real app, this would be server-side)
    if (username === "shornaly" && password === "shornaly@11") {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    initializeApp();
} else {
    alert("Invalid username or password!");
}
});

// Initialize app after login
function initializeApp() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Music control
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        document.getElementById('appContainer').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        bgMusic.pause();
        isPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    });
    
    // Countdown timer
    function updateCountdown() {
        // Set target date (September 17 of current year or next year if date has passed)
        const now = new Date();
        const currentYear = now.getFullYear();
        let targetDate = new Date(currentYear, 8, 17); // Month is 0-indexed (8 = September)
        
        // If this year's birthday has passed, set to next year
        if (now > targetDate) {
            targetDate = new Date(currentYear + 1, 8, 17);
        }
        
        const diff = targetDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Surprise functionality
    const submitAnswer = document.getElementById('submitAnswer');
    const answerInput = document.getElementById('answerInput');
    const videoContainer = document.getElementById('videoContainer');
    const successMessage = document.getElementById('successMessage');
    const wrongAnswerMessage = document.getElementById('wrongAnswerMessage');
    
    submitAnswer.addEventListener('click', function() {
        const answer = answerInput.value.trim().toLowerCase();
        const correctAnswer = "satisfaction"; // The correct answer
        
        // Hide both messages first
        successMessage.style.display = 'none';
        wrongAnswerMessage.style.display = 'none';
        
        if (answer === correctAnswer) {
            successMessage.style.display = 'block';
            videoContainer.style.display = 'block';
        } else {
            wrongAnswerMessage.style.display = 'block';
        }
    });
    
    // Birthday Bash functionality
    const bashButton = document.getElementById('bashButton');
    const bashOverlay = document.getElementById('bashOverlay');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const birthdayMessage = document.getElementById('birthdayMessage');
    
    bashButton.addEventListener('click', function() {
        // Show overlay
        bashOverlay.style.display = 'flex';

        // Play music
        const bashMusic = document.getElementById('bashMusic');
        bashMusic.currentTime = 0; // restart from beginning
        bashMusic.play();
        
        // Start countdown
        let count = 5;
        countdownDisplay.textContent = count;
        countdownDisplay.style.display = 'block';
        birthdayMessage.style.display = 'none';
        
        const countdownInterval = setInterval(function() {
            count--;
            if (count > 0) {
                countdownDisplay.textContent = count;
            } else {
                clearInterval(countdownInterval);
                
                // Hide countdown and show birthday message
                countdownDisplay.style.display = 'none';
                birthdayMessage.style.display = 'block';
                
                // Create celebration animations
                createCelebration();
                
                // Hide overlay after 5 seconds
                setTimeout(function() {
                    bashOverlay.style.display = 'none';
                    countdownDisplay.style.display = 'block';
                    birthdayMessage.style.display = 'none';

                    bashMusic.pause();
                    bashMusic.currentTime = 0;
                    
                    // Remove all animation elements
                    document.querySelectorAll('.balloon, .confetti, .party-popper').forEach(el => el.remove());
                }, 25000);
            }
        }, 1000);
    });
}

// Create celebration animations
function createCelebration() {
    // Create balloons
    for (let i = 0; i < 20; i++) {
        setTimeout(function() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Random position
            const left = Math.random() * 100;
            
            // Random color
            const colors = ['#a1c4fd', '#c2e9fb', '#d4b5ff', '#e2d9f3', '#f0e6ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            balloon.style.left = `${left}%`;
            balloon.style.bottom = '-100px';
            balloon.style.backgroundColor = color;
            
            // Append to the overlay instead of body
            document.getElementById('bashOverlay').appendChild(balloon);
        }, i * 100);
    }
    
        // Create balloons
        for (let i = 0; i < 20; i++) {
            setTimeout(function() {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';

                // Random start position (anywhere on screen)
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                balloon.style.left = `${left}%`;
                balloon.style.top = `${top}%`;

                // Random color
                const colors = ['#a1c4fd', '#c2e9fb', '#d4b5ff', '#e2d9f3', '#f0e6ff'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                balloon.style.backgroundColor = color;

                // Random movement direction
                const dx = (Math.random() - 0.5) * 200 + "vw"; // random left/right
                const dy = (Math.random() - 0.5) * 200 + "vh"; // random up/down
                balloon.style.setProperty("--dx", dx);
                balloon.style.setProperty("--dy", dy);

                // Apply animation
                balloon.style.animation = "float-random 20s linear forwards";

                document.getElementById('bashOverlay').appendChild(balloon);
            }, i * 100);
        }

    
    // Create party poppers
    for (let i = 0; i < 10; i++) {
        setTimeout(function() {
            const popper = document.createElement('div');
            popper.className = 'party-popper';
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Random color
            const colors = ['#a1c4fd', '#c2e9fb', '#d4b5ff', '#e2d9f3', '#f0e6ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            popper.style.left = `${left}%`;
            popper.style.top = `${top}%`;
            popper.style.backgroundColor = color;
            
            // Append to the overlay instead of body
            document.getElementById('bashOverlay').appendChild(popper);
        }, i * 200);
    }
}