const video = document.getElementById("video");
const captureButton = document.getElementById("capture");
const collageDiv = document.getElementById("collage");
const downloadButton = document.getElementById("download");

const vidContainer = document.getElementById('video_container')

const timerElement = document.getElementById('timer')
   
const colorPicker =document.getElementById('color_picker')

let outputWrapper = document.getElementById('output_wrapper')

let collageCanvas; 
let ctx;

let images = [];

const FLICKER_SPEED = 1000;
const CAPTURE_INTERVAL = 3000;
const _IMGWIDTH = 250 
const _IMGHEIGHT = 150


const TAGLINE = '// created by deyl >_< //'
const SCALE_FACTOR = 4; // Scale factor for high resolution
captureButton.addEventListener("click", async () => {
    images = []; // Reset images array
   outputWrapper.innerHTML = ''

    collageDiv.innerHTML = ""; // Clear previous collage

    timerElement.innerHTML = "3";
    timerElement.style.display = "block";

    downloadButton.style.display = "none"; // Hide download button
    captureButton.disabled = true;

    for (let i = 0; i < MAX_IMAGES; i++) {
        await new Promise((resolve) => {
            let timeLeft = 3;
            timerElement.innerHTML = timeLeft;
            timerElement.style.display = "flex";

            const countdown = setInterval(() => {
                timeLeft--;
                timerElement.innerHTML = timeLeft;

                if (timeLeft == 0) {
                    clearInterval(countdown);
                    timerElement.style.display = "none";

                    // Capture the image
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = _IMGWIDTH;
                    canvas.height = _IMGHEIGHT;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const img = new Image();
                    img.src = canvas.toDataURL("image/png");
                    images.push(img);
                    collageDiv.appendChild(img);

                    resolve(); // Continue to the next iteration
                }
            }, FLICKER_SPEED);
        });
    }

    // downloadButton.style.display = "block";
    captureButton.disabled = false;
    collageDiv.innerHTML = ""; // Clear previous collage
    vidContainer.style.display = 'none';

    showOutput();
    colorPicker.style.display = 'flex'
});
function showOutput() { 
    collageCanvas = document.createElement("canvas"); // Assign to global variable
    collageCanvas.classList.add('output');
    ctx = collageCanvas.getContext("2d"); // Assign to global variable
    
    const gap = _GAP * SCALE_FACTOR; // Gap between images
    const imgWidth = _IMGWIDTH * SCALE_FACTOR;
    const imgHeight = _IMGHEIGHT * SCALE_FACTOR;
    const cols = _COLS; // Number of columns
    const rows = Math.ceil(images.length / cols);
    const taglineHeight = 20 * SCALE_FACTOR; // Extra space for the tagline

    // Adjust canvas size to include gaps + space for tagline
    collageCanvas.width = cols * imgWidth + (cols + 1) * gap;
    collageCanvas.height = rows * imgHeight + (rows + 1) * gap + taglineHeight;

    ctx.fillRect(0, 0, collageCanvas.width, 300);


    // Set background color
    ctx.fillStyle = "#FFB6C1"; // Light gray background
    ctx.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

    // Draw images with gaps
    images.forEach((img, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = col * imgWidth + (col + 1) * gap;
        const y = row * imgHeight  + (row + 1) * gap;

        ctx.drawImage(img, x, y, imgWidth, imgHeight);
    });

    // Draw tagline text BELOW the images
    ctx.font = `${12 * SCALE_FACTOR}px Verdana`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";  // Center align text
    ctx.fillText(TAGLINE,  collageCanvas.width / 2, collageCanvas.height - 10 * SCALE_FACTOR);



    // Append canvas to the document
    outputWrapper.appendChild(collageCanvas);
    document.querySelector('.wrapper').style.display = 'flex'

    // // Scale down the canvas for display
    // collageCanvas.style.width = `${collageCanvas.width / SCALE_FACTOR}px`;
    // collageCanvas.style.height = `${collageCanvas.height / SCALE_FACTOR}px`;
}

// Generate collage and download it
downloadButton.addEventListener("click", () => {
    downloadCanvas("collage.png", SCALE_FACTOR);
});

function changeColor(button) {  
    let color = button.classList[1]; // Get the color from the button's class
    if (!ctx || !collageCanvas) return; // Ensure ctx exists before updating

    ctx.fillStyle = color; 
    ctx.fillRect(0, 0, collageCanvas.width, collageCanvas.height); 

    // Redraw the images after changing the background
    const gap = _GAP * SCALE_FACTOR; // Gap between images
    const imgWidth = _IMGWIDTH * SCALE_FACTOR;
    const imgHeight = _IMGHEIGHT * SCALE_FACTOR;
    const cols = _COLS; // Number of columns

    images.forEach((img, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = col * imgWidth + (col + 1) * gap;
        const y = row * imgHeight + (row + 1) * gap;

        ctx.drawImage(img, x, y, imgWidth, imgHeight);
    });

    // Redraw the tagline
    ctx.font = `${12 * SCALE_FACTOR}px Verdana`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(TAGLINE,  collageCanvas.width / 2, collageCanvas.height - 10 * SCALE_FACTOR);
}

function retake() { 
    vidContainer.style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none'

    colorPicker.style.display = 'none'
    outputWrapper.innerHTML = '' 
}

//change bg
function changeBackground(imageSrc) {
    if (!ctx || !collageCanvas) return; // Ensure ctx exists

    const bgImage = new Image();
    bgImage.src = imageSrc;
    bgImage.onload = function () {
        ctx.clearRect(0, 0, collageCanvas.width, collageCanvas.height); // Clear canvas
        ctx.drawImage(bgImage, 0, 0, collageCanvas.width, collageCanvas.height); // Draw BG

        redrawImages(); // Redraw the existing images
    };
}

function redrawImages() {
    const gap = _GAP * SCALE_FACTOR; // Gap between images
    const imgWidth = _IMGWIDTH * SCALE_FACTOR;
    const imgHeight = _IMGHEIGHT * SCALE_FACTOR;
    const cols = _COLS;

    images.forEach((img, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = col * imgWidth + (col + 1) * gap;
        const y = row * imgHeight + (row + 1) * gap;

        ctx.drawImage(img, x, y, imgWidth, imgHeight);
    });

    // Redraw the tagline
    ctx.font = `${12 * SCALE_FACTOR}px Verdana`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(TAGLINE,  collageCanvas.width / 2, collageCanvas.height - 10 * SCALE_FACTOR);
}

function downloadCanvas(event, filename = "collage.png", scaleFactor = SCALE_FACTOR) {
    if (event) event.preventDefault(); // Prevent default form submission or link behavior

    if (!collageCanvas) return;

    const link = document.createElement("a");
    link.href = collageCanvas.toDataURL("image/png"); // High-quality PNG
    link.download = filename;
    link.click();
}
