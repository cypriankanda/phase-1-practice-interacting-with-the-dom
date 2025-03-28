// Global variables to manage state
let counter = 0;
let intervalId = null;
let isPaused = false;
const likes = {};

// DOM Element References
const counterDisplay = document.getElementById('counter');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('list');
const likesList = document.querySelector('.likes');

// Function to start the timer
function startTimer() {
    intervalId = setInterval(() => {
        if (!isPaused) {
            counter++;
            counterDisplay.textContent = counter;
        }
    }, 1000);
}

// Function to pause/resume timer
function togglePause() {
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseButton.textContent = 'resume';
        plusButton.disabled = true;
        minusButton.disabled = true;
        heartButton.disabled = true;
    } else {
        pauseButton.textContent = 'pause';
        plusButton.disabled = false;
        minusButton.disabled = false;
        heartButton.disabled = false;
    }
}

// Event Listeners
function setupEventListeners() {
    // Plus button
    plusButton.addEventListener('click', () => {
        counter++;
        counterDisplay.textContent = counter;
    });

    // Minus button
    minusButton.addEventListener('click', () => {
        counter--;
        counterDisplay.textContent = counter;
    });

    // Like button
    heartButton.addEventListener('click', () => {
        likes[counter] = (likes[counter] || 0) + 1;
        
        // Remove existing like for this number
        const existingLike = document.querySelector(`li[data-number="${counter}"]`);
        if (existingLike) {
            existingLike.remove();
        }
        
        // Add new like
        const likeLi = document.createElement('li');
        likeLi.dataset.number = counter;
        likeLi.textContent = `${counter} has been liked ${likes[counter]} times`;
        likesList.appendChild(likeLi);
    });

    // Pause button
    pauseButton.addEventListener('click', togglePause);

    // Comment form
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            const commentP = document.createElement('p');
            commentP.textContent = commentText;
            commentList.appendChild(commentP);
            
            // Clear input
            commentInput.value = '';
        }
    });
}

// Initialize the application
function init() {
    startTimer();
    setupEventListeners();
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);