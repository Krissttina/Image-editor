const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const filterValue = document.querySelector(".filter-info .value");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");
const previewImg = document.querySelector(".preview-img img");
const chooseImgBtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0; //variables
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0]; //getting user selected file
    if(!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
    
    document.querySelector(".conteiner").classList.remove("disable");
    });
}

const applyFilter = () => { //need to be fixed
    previewImg.style.transform = `rotate(${rotate}deg)
    scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%)
    saturation(${saturation}%) invert(${inversion}%)
    greyscale(${grayscale}%)`;
}

    filterOptions.forEach(option => {
        option.addEventListener("click", () => {

    document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

            if(option.id === "brightness"){
                filterSlider.max = "200";
                filterSlider.value = brightness;
                filterSlider.innerText = `${brightness}%`;
            }else if(option.id === "saturation"){
                filterSlider.max = "200";
                filterSlider.value = saturation;
                filterSlider.innerText = `${saturation}%`;
            }else if(option.id === "inversion"){
                filterSlider.max = "100";
                filterSlider.value = inversion;
                filterSlider.innerText = `${inversion}%`;
            }else{
                filterSlider.max = "100";
                filterSlider.value = grayscale;
                filterSlider.innerText = `${grayscale}%`;
            }
        });
    });

filterOptions.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener to all filter btns
        document.querySelector(".filter . active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
    })
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -= 90;
        }else if(option.id === "right"){
            rotate += 90;
        }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%)
    saturation(${saturation}%) invert(${inversion}%)
    greyscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click()); //loading img folder
resetFilterBtn.addEventListener("click", resetFilter);