let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const rounds = document.querySelectorAll('.round');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

const SLIDE_INTERVAL = 3000; // 3 seconds
const DEBOUNCE_DELAY = 8000; // 8 seconds
let autoPlayInterval;
let debounceTimeout;

function showSlide(n) {
    // Remove active class from all slides and rounds
    slides.forEach(slide => slide.classList.remove('active'));
    rounds.forEach(round => round.classList.remove('active'));
    
    // Add active class to current slide and round
    slides[n].classList.add('active');
    rounds[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, SLIDE_INTERVAL);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    clearTimeout(debounceTimeout);
    
    debounceTimeout = setTimeout(() => {
        startAutoPlay();
    }, DEBOUNCE_DELAY);
}

if (leftArrow && rightArrow) { 
	leftArrow.addEventListener('click', () => {
		prevSlide();
		resetAutoPlay();
	});
	
	rightArrow.addEventListener('click', () => {
		nextSlide();
		resetAutoPlay();
	});
}

rounds.forEach((round, index) => {
    round.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoPlay();
    });
});

function toggleEntry(element) {
    const parentEntry = element.closest('.infoEntry');
    if (parentEntry) {
        parentEntry.classList.toggle('entryOpen');

        if (parentEntry.classList.contains('entryOpen')) {
            setTimeout(() => {
                const rect = parentEntry.getBoundingClientRect();
                window.scrollBy({
                    top: rect.top - 20,
                    behavior: 'smooth'
                });
            }, 250);
        }
    }
}

function getParameterByName(name) {
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    return params.get(name);
}

function expandBlockByIndex(index) {

    const moreButtons = document.querySelectorAll('.infoMore');

    if (moreButtons[index]) {
        moreButtons[index].click();
        return true;
    }
    return false;
}

function expandFromUrl(paramName = 'expand') {
    const paramValue = getParameterByName(paramName);

    if (paramValue !== null) {

        const index = parseInt(paramValue);

        if (!isNaN(index)) {

            if (document.readyState === 'complete') {
                expandBlockByIndex(index);
            } else {
                window.addEventListener('load', function () {
                    expandBlockByIndex(index);
                });
            }
        }
    }
}