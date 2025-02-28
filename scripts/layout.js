
function generateSettingsJson(img,cols) { 
    const settings = { 
        "img": img,
        "cols": cols
    };
    const json = JSON.stringify(settings);
    return json;
}

function setLayout(item) { 
    let img, cols;

    switch(item) { 
        case 1: img = 4; cols = 1; break;
        case 2: img = 6; cols = 1; break;
        case 3: img = 6; cols = 2; break;
        case 4: img = 8; cols = 2; break;
    }

    const layout = { "img":img, "cols": cols };
    
    localStorage.setItem('isSet', true); 
    localStorage.setItem('layout', JSON.stringify(layout));
    window.location.href = '/photo.html';
    
   
}
