let isTransitioning = false;

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const createSingleHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    };

    for (let i = 0; i < 12; i++) {
        createSingleHeart();
    }
    setInterval(createSingleHeart, 2000);
}

function applyWordTypingAnimation() {
    const paragraphs = document.querySelectorAll('.letter p:not(.signature)');
    let totalDelay = 0;

    paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        const words = text.match(/[^\s]+/g) || [];
        p.innerHTML = words
            .map((word, index) => `<span class="word" style="animation-delay: ${totalDelay + index * 0.3}s">${word}</span>`)
            .join(' ');
        totalDelay += words.length * 0.3;
    });

    // Hiển thị chữ ký và nút tiếp theo sau khi tất cả xong
    setTimeout(() => {
        document.getElementById('signature').classList.add('show');
        document.getElementById('nextButton').classList.add('show');
    }, totalDelay * 1000 + 500);
}

window.onload = function () {
    applyWordTypingAnimation();
};


const envelope = document.getElementById('envelope');
envelope.addEventListener('click', function (event) {
    if (isTransitioning) return;
    isTransitioning = true;
    envelope.classList.toggle('closed');
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
    event.stopPropagation();
});

document.getElementById('nextButton').addEventListener('click', function () {
    window.location.href = 'banh.html';
});

window.onload = function () {
    createHearts();
    applyWordTypingAnimation();
    setTimeout(() => {
        envelope.classList.remove('closed');
    }, 1000);
};