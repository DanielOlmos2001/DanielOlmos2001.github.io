document.addEventListener("DOMContentLoaded", function() {
    var currentImage = 0;
    var images = document.querySelectorAll('.slider-frame li');
    var totalImages = images.length;

    function changeImage() {
        images[currentImage].classList.remove('active');
        
        currentImage = (currentImage + 1) % totalImages;

        requestAnimationFrame(function() {
            images[currentImage].classList.add('active');
        });
    }

    images[currentImage].classList.add('active');
    setInterval(changeImage, 5000);
});


