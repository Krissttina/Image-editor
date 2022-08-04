const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const filterValue = document.querySelector(".filter-info .value");
const previewImg = document.querySelector(".preview-img img");
const chooseImgBtn = document.querySelector(".choose-img");

const loadImage = () => {
    let file = fileInput.files[0]; //getting user selected file
    if(!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector(".conteiner").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener to all filter btns
        document.querySelector(".filter . active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
    })
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click()); //loading img folder

/*

resetFilterBtn = document.querySelector(".reset-filter"),

saveImgBtn = document.querySelector(".save-img");
let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
*/