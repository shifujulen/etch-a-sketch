"use strict";

const gridContainer = document.querySelector("#grid-container");
const btnClear = document.querySelector("#btn-clear");
const btnRainbow = document.querySelector("#btn-rainbow");
const btnBrush = document.querySelector("#btn-brush");
const btnEraser = document.querySelector("#btn-eraser");
const eachSquare = document.querySelectorAll(".square");
const allBtns = document.querySelectorAll(".btn");
const imgRainbow = document.querySelector("#rainbow-img");
const imgPaint = document.querySelector("#paint-img");
const imgEraser = document.querySelector("#eraser-img");
const allIcons = document.querySelectorAll(".icon");

// Initial values
let pixelSize = 30;
let brushColor = "black";
let rainbow = false;
let eraser = false;
let btnSelector = "";

// ---------- FUNCTIONS ------------//

// Create a random rgb values
let randomRainbow = function () {
  let rainbowArr = [];
  for (let i = 0; i < 3; i++) {
    rainbowArr.push(Math.floor(Math.random() * 256));
  }
  return `rgb(${rainbowArr[0]}, ${rainbowArr[1]}, ${rainbowArr[2]})`;
};

// Square constructor
let newSquare = function () {
  const singleSquare = document.createElement("div");
  singleSquare.classList.add("square");
  singleSquare.style.backgroundColor = "white";
  singleSquare.style.border = "1px solid #d6d8dd53";
  singleSquare.addEventListener("mouseover", function () {
    if (rainbow) {
      singleSquare.style.backgroundColor = randomRainbow();
    } else if (eraser) {
      singleSquare.style.backgroundColor = "white";
    } else {
      singleSquare.style.backgroundColor = brushColor;
    }
  });
  //  Append each newSquare to grid-container
  gridContainer.appendChild(singleSquare);
};

let fillCanvas = (pixelSize) => {
  //  Create loop for filling up all the canvas with squares
  for (let i = 0; i < Math.pow(pixelSize, 2); i++) {
    newSquare();
  }
};
fillCanvas(30);

let promptMessage = function (text) {
  let newPixelSize = parseInt(window.prompt(text, ""));
  if (text == "") {
    text = "Please enter a number from 3 to 81";
  } else if (newPixelSize <= 81 && newPixelSize >= 3) {
    pixelSize = newPixelSize;
  } else if (isNaN(newPixelSize)) {
    promptMessage(
      "That's not a number my friend. Please enter a digit from 3 to 81",
      ""
    );
  } else {
    promptMessage(
      "Oops! Your number (" + newPixelSize + ") is not between 3 and 81",
      ""
    );
  }
};

// ------------ EVENT LISTENERS ------------- //

// Clear Canvas
btnClear.addEventListener("click", function () {
  promptMessage("Please enter a new Canvas size");
  gridContainer.style.gridTemplateColumns = `repeat(${pixelSize}, 1fr)`;
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
  fillCanvas(pixelSize);
});

// Style each brush icon
btnRainbow.addEventListener("click", function () {
  rainbow = true;
  imgRainbow.src = "images/rainbow-color.png";
  imgPaint.src = "images/paint.png";
  imgEraser.src = "images/eraser.png";
  imgRainbow.style.filter = "none";
  imgPaint.style.filter = "invert()";
  imgEraser.style.filter = "invert()";
});

btnBrush.addEventListener("click", function () {
  rainbow = false;
  eraser = false;
  imgRainbow.src = "images/rainbow.png";
  imgPaint.src = "images/paint-color.png";
  imgEraser.src = "images/eraser.png";
  imgPaint.style.filter = "none";
  imgRainbow.style.filter = "invert()";
  imgEraser.style.filter = "invert()";
});

btnEraser.addEventListener("click", function () {
  rainbow = false;
  eraser = true;
  imgRainbow.src = "images/rainbow.png";
  imgPaint.src = "images/paint.png";
  imgEraser.src = "images/eraser-color.png";
  imgEraser.style.filter = "none";
  imgPaint.style.filter = "invert()";
  imgRainbow.style.filter = "invert()";
});
