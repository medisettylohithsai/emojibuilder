const emojiData = {
    Happy: ["😀", "😄", "😊", "😁", "😎", "😆", "🤗", "😇"],
    Sad: ["😢", "😞", "😭", "😔", "😟", "😩", "🥺", "😖"],
    Angry: ["😡", "😠", "🤬", "😤", "😒", "👿", "💢", "😾"],
    Excited: ["🤩", "😃", "🥳", "😍", "🤗", "🎉", "🎊", "😻"],
    Love: ["❤️", "😍", "😘", "💖", "💕", "💞", "💓", "💌"],
    Surprised: ["😮", "😯", "😲", "😳", "🤯", "😱", "🙀", "😵"],
    Sleepy: ["😴", "😪", "🥱", "💤", "😌", "🛌", "😑", "😫"]
};

// Cache DOM elements
const emojiElement = document.getElementById('emoji');
const emojiNameElement = document.getElementById('emoji-name');
const generateRandomBtn = document.getElementById('generate-random-btn');
const moodBar = document.querySelector('.mood-bar');

// Animation configurations
const ANIMATIONS = {
    EMOJI: 'animate__animated animate__bounce',
    TEXT: 'animate__animated animate__fadeIn',
    BUTTON: 'button-click'
};

// Function to get random emoji from a category
function getRandomEmoji(category) {
    const emojis = emojiData[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Function to update mood meter
function updateMoodMeter(mood) {
    const moodIndex = Object.keys(emojiData).indexOf(mood);
    const percentage = (moodIndex / (Object.keys(emojiData).length - 1)) * 100;
    moodBar.style.width = `${percentage}%`;
}

// Function to display emoji with animation
function displayEmoji(mood, emoji) {
    // Remove existing animation classes
    emojiElement.className = 'emoji';
    emojiNameElement.className = 'emoji-name';
    
    // Trigger reflow
    void emojiElement.offsetWidth;
    void emojiNameElement.offsetWidth;
    
    // Update content
    emojiElement.textContent = emoji;
    emojiNameElement.textContent = mood;
    
    // Add animations
    emojiElement.className = `emoji ${ANIMATIONS.EMOJI}`;
    emojiNameElement.className = `emoji-name ${ANIMATIONS.TEXT}`;
    
    // Update mood meter
    updateMoodMeter(mood);
}

// Function to create ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(circle);
}

// Add click event listeners to feeling buttons
document.querySelectorAll('.feeling-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Get the mood from button's data attribute
        const mood = button.dataset.feeling;
        
        // Get random emoji for this mood
        const emoji = getRandomEmoji(mood);
        
        // Create ripple effect
        createRipple(e);
        
        // Add click animation to button
        button.classList.add(ANIMATIONS.BUTTON);
        setTimeout(() => button.classList.remove(ANIMATIONS.BUTTON), 200);
        
        // Display the emoji with animation
        displayEmoji(mood, emoji);
    });
});

// Add click event listener to random button
generateRandomBtn.addEventListener('click', (e) => {
    // Get random mood
    const moods = Object.keys(emojiData);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    
    // Get random emoji for the random mood
    const randomEmoji = getRandomEmoji(randomMood);
    
    // Create ripple effect
    createRipple(e);
    
    // Add click animation to button
    generateRandomBtn.classList.add(ANIMATIONS.BUTTON);
    setTimeout(() => generateRandomBtn.classList.remove(ANIMATIONS.BUTTON), 200);
    
    // Display the emoji with animation
    displayEmoji(randomMood, randomEmoji);
});

// Initialize with a random emoji
window.addEventListener('load', () => {
    const moods = Object.keys(emojiData);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const randomEmoji = getRandomEmoji(randomMood);
    displayEmoji(randomMood, randomEmoji);
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        generateRandomBtn.click();
    } else if (event.code.startsWith('Digit')) {
        const index = parseInt(event.key) - 1;
        const moods = Object.keys(emojiData);
        if (index >= 0 && index < moods.length) {
            document.querySelector(`[data-feeling="${moods[index]}"]`)?.click();
        }
    }
});