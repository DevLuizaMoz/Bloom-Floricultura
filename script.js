document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.nav');
    const triggerPoint = 70;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > triggerPoint) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    });
});

document.querySelector('.video-bloom').addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
});