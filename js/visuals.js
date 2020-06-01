// Because I want some cool stuff to happen, I guess


//Popup Explanation on Vector Art
var imageContent = document.querySelector('.image-content');
var imageContents = imageContent.childNodes;

imageContents.forEach(function(event) {
  event.addEventListener('click', function() {
    if (this.textContent) {

    } else {
        this.classList.toggle("expand-small")
        var popUpExplain = this.nextElementSibling;
        setTimeout(function() {
            popUpExplain.classList.toggle("pop-up-explain-visible");
            popUpExplain.classList.toggle("pop-up-explain-hidden");
        }, 200);
    }
  })
})
