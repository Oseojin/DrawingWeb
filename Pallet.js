const moveableBtn = document.getElementById("moveable-btn");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isMoveable = false;
let isPainting = false;
let isFilling = false;
let isErasing = false;

function onMove(event) {
    if (isMoveable) {
        return;
    }
    if (isPainting && !isFilling) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
    isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    console.dir(event.target.dataset.color);
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if (isMoveable) {
        isMoveable = false;
    }
    if (isErasing) {
        isErasing = false;
    }
    if (isFilling) {
        isFilling = false;
        ctx.strokeStyle = color.value;
        modeBtn.innerText = "🧹 Draw";
    }
    else {
        isFilling = true;
        ctx.fillStyle = color.value;
        modeBtn.innerText = "🧺 Fill";
    }
}

function onCanvasClick() {
    if (isMoveable) {
        return;
    }
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    if (isMoveable) {
        isMoveable = false;
    }
    ctx.strokeStyle = "white";
    isErasing = true;
    isFilling = false;
    modeBtn.innerText = "Erase";

}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    ctx.save();
    const text = textInput.value;
    ctx.fillStyle = color.value;
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onMoveable() {
    if (!isMoveable) {
        isMoveable = true;
    }
    else {
        isMoveable = false;
    }
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);

moveableBtn.addEventListener("click", onMoveable);