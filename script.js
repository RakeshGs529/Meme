const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const question = document.getElementById('question');

let yesScale = 1;

noButton.addEventListener('mouseover', () => {
    // 1. Ensure it's 'fixed' so it can move anywhere on screen
    if (noButton.style.position !== 'fixed') {
        noButton.style.position = 'fixed';
    }

    const padding = 20; // Keeps button away from screen edges
    const safeZone = 100; // Extra buffer to stay away from the Yes button
    
    let newX, newY, isOverlapping;
    const yesRect = yesButton.getBoundingClientRect();

    do {
        // 2. Mathematically stay INSIDE the window
        const maxX = window.innerWidth - noButton.offsetWidth - padding;
        const maxY = window.innerHeight - noButton.offsetHeight - padding;
        
        newX = Math.max(padding, Math.floor(Math.random() * maxX));
        newY = Math.max(padding, Math.floor(Math.random() * maxY));

        // 3. Prevent spawning over or behind the Yes button
        isOverlapping = (
            newX < yesRect.right + safeZone &&
            newX + noButton.offsetWidth > yesRect.left - safeZone &&
            newY < yesRect.bottom + safeZone &&
            newY + noButton.offsetHeight > yesRect.top - safeZone
        );
    } while (isOverlapping);

    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;

    // Functionality: Increase size of Yes button
    yesScale += 0.15;
    yesButton.style.transform = `scale(${yesScale})`;
});

// 4. Ensure the Yes button click works every time
yesButton.addEventListener('click', () => {
    question.innerHTML = "🥰";
    document.querySelector('.buttons').style.display = 'none';

    // Create the video element
    const video = document.createElement('video');
    video.src = 'meme.mp4'; // Put your video filename here
    video.autoplay = true;
    video.controls = true; // Show play/pause buttons
    video.style.maxWidth = '90vw'; 
    video.style.height = 'auto'; // Maintains the original aspect ratio
    video.style.borderRadius = '15px';
    video.style.marginTop = '0px';
    video.style.marginBottom = '60px';
    video.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';

    document.querySelector('.container').appendChild(video);
});