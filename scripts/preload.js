let MAX_IMAGES; 
let _COLS;
const _GAP = 15;

const default_layout  =  { 
    "cols": 2,
    "img": 8
}




function fetchData(type) {
    let data;


    //if type is true, it means that the user is from the layout page
    if(type === true) {
        data= localStorage.getItem('layout');
        data = JSON.parse(data);
       
    } else { 
        data = default_layout

    }
    return data;
} 

function setPreviewColumnCollage(cols) { 
    let collage =  document.querySelector('.collage')
    collage.style.gridTemplateColumns = `repeat(${cols}, 1fr)`

    
}

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


//check if the user is from the layout page or use the default layout
document.addEventListener('DOMContentLoaded', async () => {
    const data = localStorage.getItem("isSet"); 
    let config; 
    if(data != null) {
       
       config = fetchData(true)
    }  else { 
       config = fetchData(false)
    } 
  
    MAX_IMAGES = config.img;
    _COLS = config.cols;

  
    
    setPreviewColumnCollage(_COLS); 
});

