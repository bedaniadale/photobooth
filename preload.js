
// Access the webcam
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        alert(`Error accessing webcam: ${error.message}`);
        console.error(error);
    });


//load the colors of the buttons
let items = document.querySelectorAll('.item_btn');
items.forEach(element => {
   let color = element.classList[1]
   element.style.backgroundColor = color
});


