const html = document.querySelector('html');

html.innerHTML += `
<div class="player-container">
    <audio class="player" controls>
    <source src="/assets/audio/Lally x Lens - Love The Way (Amaryllis Remix).wav" type="audio/wav">
    Your browser does not support the audio element.
</audio> 

 <div class="player__controls">
            <button id="prevBtn" disabled>⏮ Previous</button>
            <button id="playPauseBtn" disabled>▶ Play</button>
            <button id="nextBtn" disabled>⏭ Next</button>
            
            <div class="progress-container">
                <progress id="progressBar" value="0" max="100"></progress>
            </div>
            
            <div class="time-display" id="timeDisplay">0:00 / 0:00</div>
            
            <div class="volume-control">
                <span>🔊</span>
                <input type="range" id="volumeControl" min="0" max="1" step="0.1" value="1">
            </div>
        </div>
</div>
`;
