const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copyColor = elem=>{
 navigator.clipboard.writeText(elem.dataset.color);
 elem.innerText = "Copied";
 setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}


const showColors = () => {
  if(!pickedColors.length) return; //returning if there are no picked colors
  colorList.innerHTML = pickedColors.map(color => 
     `<li class="color">
          <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#cc" : color}></span>
          <span class="value" data-color="${color}">${color}</span>
      </li>`
  ).join("");//generating li for the picked color and adding it to the colorList
  document.querySelector(".picked-colors").classList.remove("hide");

    //add a click event listener to each color element to copy the color code
  document.querySelectorAll(".color").forEach(li=>{
    li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
  });

};

showColors();


const activateEyeDropper =  () => {
  document.body.style.display = "none";
  setTimeout(async () => {
    try {
      //opening the eye dropper and getting the selected color
      const eyeDropper = new EyeDropper();
      const {sRGBHex } = await eyeDropper.open();
      navigator.clipboard.writeText(sRGBHex);
  
      //adding the color to the list if it doesn't already exist
      if(!pickedColors.includes(sRGBHex)){
        pickedColors.push(sRGBHex);
        localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
        showColors();
      }
      
    } catch(error){
      console.log("Failed to copy the color code!");
    }
    document.body.style.display = "block";
  }, 10);
 
}

//clearing all picked colors, updating localstorage, and hiding the pickedColors element
const clearAllColors = () => {
  pickedColors.length = 0;
  localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);
