
$(document).ready(function(){ document.addEventListener('DOMContentLoaded', function() {
    alert("dalsdkfa ");
    // Store original font sizes for all elements
    let elements = document.querySelectorAll("body *"); // Select all elements inside body
    let originalFontSizes = new Map(); // Map to store original font sizes
    let currentChanges = new Map(); // Map to track current font size changes

    // Store original computed font sizes
    elements.forEach(el => {
        let computedSize = parseFloat(window.getComputedStyle(el).fontSize);
        originalFontSizes.set(el, computedSize);
        currentChanges.set(el, 0); // Initialize change counter at 0
    });

    function updateFontSize(change) {
        elements.forEach(el => {
            let originalSize = originalFontSizes.get(el);
            let currentChange = currentChanges.get(el);
            let newChange = currentChange + change;
            
            // Limit changes to -3px to +3px range
            if (newChange >= -3 && newChange <= 3) {
                currentChanges.set(el, newChange);
                el.style.fontSize = (originalSize + newChange) + "px";
            }
        });
    }

    // Reset font sizes to original
    function resetFontSize() {
        elements.forEach(el => {
            let originalSize = originalFontSizes.get(el);
            el.style.fontSize = originalSize + "px";
            currentChanges.set(el, 0); // Reset change counter
        });
    }

    // Add event listeners to font size controls
    document.getElementById("size-increase").addEventListener("click", function(event) {
        event.preventDefault();
        updateFontSize(1);
    });

    document.getElementById("size-decrease").addEventListener("click", function(event) {
        event.preventDefault();
        updateFontSize(-1);
    });

    document.getElementById("size-reset").addEventListener("click", function(event) {
        event.preventDefault();
        resetFontSize();
    });
});
document.addEventListener('DOMContentLoaded', function() {

const blackModeToggle = document.querySelector('.bg-black'); // Black mode button
const whiteModeToggle = document.querySelector('.bg-white'); // White mode button
const allElements = document.querySelectorAll('body *:not(input):not(textarea):not(select):not(.container)'); // Exclude inputs
let isBlackMode = false;

function hasBackgroundImage(element) {
return window.getComputedStyle(element).backgroundImage !== 'none';
}

function toggleBlackMode(enable) {
document.body.style.background = enable ? "black" : "";
document.body.style.color = enable ? "yellow" : "";

allElements.forEach(element => {
    let parent = element.closest("div, section");

    // Skip elements inside a section/div with .bg-not-change
    if (parent && parent.classList.contains('bg-not-change')) {
        return;
    }

    // Skip the <a> elements with both .bg-white and .bg-not-change
    if (element.matches('.bg-white.bg-not-change')) {
        return;
    }

    // Skip inputs and elements with background images
    if (element.matches('input, textarea, select') || hasBackgroundImage(element)) {
        return;
    }

    element.style.background = enable ? "black" : "";
    element.style.color = enable ? "yellow" : "";
});

isBlackMode = enable;
}

// Click on Black Mode Toggle
if (blackModeToggle) {
blackModeToggle.addEventListener('click', function(event) {
    event.preventDefault();
    toggleBlackMode(true);
});
}

// Click on White Mode Toggle (Reset)
if (whiteModeToggle) {
whiteModeToggle.addEventListener('click', function(event) {
    event.preventDefault();
    toggleBlackMode(false);
});
}

// Prevent color change inside a div/section containing .bg-not-change
document.addEventListener('click', function(event) {
const target = event.target;

if (target.matches('.bg-white.bg-not-change')) {
    event.preventDefault();
    let parent = target.closest("div, section");
    
    if (parent) {
        parent.classList.add("protected"); // Mark as protected
    }
}
});
});

});

$(document).ready(function(){
$('.slider').slick({
dots: false,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
autoplay: true,
autoplaySpeed: 3000,
arrows: true,
prevArrow: "<button type='button' class='slick-prev bg-gray-700 text-white rounded-full p-2'>&#8592;</button>",
nextArrow: "<button type='button' class='slick-next bg-gray-700 text-white rounded-full p-2'>&#8594;</button>"
});
});
$(document).ready(function(){
    // Initialize YouTube slider
    $('.youtube-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: false,
        arrows: true,
        pauseOnHover: true,
        lazyLoad: 'ondemand',
        prevArrow: '<button type="button" class="slick-prev bg-orange-500 text-white p-2 rounded-r-md"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next bg-orange-500 text-white p-2 rounded-l-md"><i class="fas fa-chevron-right"></i></button>'
    });
    
    // Initialize Success Stories slider
    $('.success-stories-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        pauseOnHover: true,
        lazyLoad: 'ondemand',
        prevArrow: '<button type="button" class="slick-prev bg-orange-500 text-white p-2 rounded-r-md"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next bg-orange-500 text-white p-2 rounded-l-md"><i class="fas fa-chevron-right"></i></button>'
    });
    
    // Fix for YouTube videos not showing in slick slider
    $('.youtube-slider, .success-stories-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // Pause all videos when sliding
        let iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
            // Get current src
            let src = iframe.src;
            // Add a cache-busting parameter to force refresh
            let separator = src.indexOf('?') > -1 ? '&' : '?';
            src = src.split('#')[0]; // Remove any hash
            
            // Set iframe src with cache-busting parameter
            iframe.src = src + separator + '_t=' + new Date().getTime();
        });
    });
    
    // Handle YouTube API errors
    function checkYouTubeErrors() {
        let iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
        iframes.forEach(function(iframe) {
            // If iframe is not visible or has error
            if (iframe.offsetHeight === 0 || iframe.classList.contains('error')) {
                // Try to reload the iframe with different parameters
                let src = iframe.src;
                // Remove any existing parameters and add new ones
                src = src.split('?')[0] + '?enablejsapi=1&origin=' + window.location.origin;
                iframe.src = src;
            }
        });
    }
    
    // Run check after page load
    setTimeout(checkYouTubeErrors, 3000);
});