"use strict";

document.addEventListener("DOMContentLoaded", start);

const HTML = {};

function start() {
  console.log("start()");
  HTML.colorPicker = document.querySelector("input");
  HTML.colorDisplay = document.querySelector(".displayedColor");
  HTML.codeHex = document.querySelector("li:first-child span");
  HTML.codeR = document.querySelector("#r");
  HTML.codeG = document.querySelector("#g");
  HTML.codeB = document.querySelector("#b");
  HTML.codeH = document.querySelector("#h");
  HTML.codeS = document.querySelector("#s");
  HTML.codeL = document.querySelector("#l");
  HTML.colorPicker.value = "#ffffff";
  updateColor(HTML.colorPicker.value);
  trackColorPicker();
}

function trackColorPicker() {
  console.log("trackColorPicker()");
  HTML.colorPicker.addEventListener("input", updateColor, false);
}

//delegator
function updateColor() {
  const currentColorHex = HTML.colorPicker.value;
  console.log(currentColorHex);
  const valueRGB = calculateRGB(currentColorHex);
  const valueHSL = calculateHSL(valueRGB);
  const roundedHSL = roundHSL(valueHSL);
  const rgbCss = getRgbCss(valueRGB);
  console.log(rgbCss);
  displayHex(currentColorHex);
  displayColor(currentColorHex);
  displayRGB(valueRGB);
  displayHSL(roundedHSL);
}

function displayHex(valueHex) {
  HTML.codeHex.textContent = valueHex;
}

function displayColor(valueHex) {
  HTML.colorDisplay.style.background = valueHex;
}

function calculateRGB(value) {
  const value1 = value.substring(1, 3);
  const value2 = value.substring(3, 5);
  const value3 = value.substring(5, 7);
  const r = parseInt("0x" + value1, 16);
  const g = parseInt("0x" + value2, 16);
  const b = parseInt("0x" + value2, 16);
  return { r, g, b };
}

function displayRGB(valueRGB) {
  HTML.codeR.textContent = valueRGB.r;
  HTML.codeG.textContent = valueRGB.g;
  HTML.codeB.textContent = valueRGB.b;
}

function calculateHSL(valueRGB) {
  let r = valueRGB.r;
  let g = valueRGB.g;
  let b = valueRGB.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  //   console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return { h, s, l };
}

function roundHSL(hsl) {
  const H = Math.round(hsl.h);
  const S = Math.round(hsl.s);
  const L = Math.round(hsl.l);
  return { H, S, L };
}

function displayHSL(roundedHSL) {
  HTML.codeH.textContent = roundedHSL.H;
  HTML.codeS.textContent = roundedHSL.S;
  HTML.codeL.textContent = roundedHSL.L;
}

function getRgbCss(valueRGB) {
  const rgbCss = `rgb(${valueRGB.r}, ${valueRGB.g}, ${valueRGB.b})`;
  return rgbCss;
}
