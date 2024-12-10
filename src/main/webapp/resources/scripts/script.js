var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const xContainer = document.querySelector(".x_container");
const yContainer = document.querySelector(".y_container");
const rContainer = document.querySelector(".r_container");
const xSelect = document.getElementById("form:x_select");
const yInput = document.getElementById("form:y_input");
const hiddenXInput = document.getElementById("form:hidden_x");
const rOptions = Array.from(document.querySelectorAll(".r_container input[type='radio']"));
const form = document.getElementById("form");
const table = document.getElementById("table");
const svgArea = document.getElementById("svgArea");
const submitBtn = document.querySelector(".submit_btn");
const yInputCorrect = document.getElementById("form:y_input_correct");
yInputCorrect.addEventListener("change", () => {
    yInput.value = yInputCorrect.value;
});
let svgFlag = false;
window.addEventListener("load", () => {
    const points = getSavedPoints();
    points.forEach(point => {
        drawPoint(point);
    });
});
const checkBoundaries = (num, left, right) => left <= num && num <= right;
const addClass = (el, className) => {
    el.classList.add(className);
};
const removeClass = (el, className) => {
    el.classList.remove(className);
};
const addClassUntilTrue = (condition, el, className) => {
    if (!condition()) {
        addClass(el, className);
        return;
    }
    removeClass(el, className);
};
const getX = () => {
    return Number(xSelect.value);
};
xSelect.addEventListener("change", () => {
    hiddenXInput.value = xSelect.value;
});
const getY = () => {
    return yInput.value === "" ? NaN : Number(yInput.value);
};
const getR = () => {
    for (const el of rOptions) {
        if (el.checked) {
            return Number(el.value);
        }
    }
    return NaN;
};
const checkX = () => {
    const value = getX();
    if (Number.isNaN(value))
        return false;
    return checkBoundaries(value, -3, 3);
};
const checkY = () => {
    const value = getY();
    if (Number.isNaN(value))
        return false;
    return checkBoundaries(value, -3, 5);
};
const checkR = () => {
    const value = getR();
    if (Number.isNaN(value))
        return false;
    return checkBoundaries(value, 1, 5);
};
const markX = () => {
    addClassUntilTrue(checkX, xContainer, "incorrect_input");
};
const markY = () => {
    addClassUntilTrue(checkY, yContainer, "incorrect_input");
};
const markR = () => {
    addClassUntilTrue(checkR, rContainer, "incorrect_input");
};
const markAll = () => {
    markX();
    markY();
    markR();
};
submitBtn.addEventListener("click", () => {
    if (svgFlag) {
        xSelect.value = hiddenXInput.value;
        svgFlag = false;
    }
    else {
        hiddenXInput.value = xSelect.value;
    }
    markAll();
});
svgArea.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
    if (!checkR()) {
        markR();
        return;
    }
    markR();
    const rect = svgArea.getBoundingClientRect();
    const xWindow = e.clientX - rect.left - 20;
    const yWindow = e.clientY - rect.top - 20;
    const r = getR();
    const x = Number((((xWindow - 150) / 100) * r).toFixed(2));
    const y = Number((((150 - yWindow) / 100) * r).toFixed(2));
    if (!checkBoundaries(x, -3, 3) || !checkBoundaries(y, -3, 5)) {
        addPopupWindow(xWindow, yWindow);
        return;
    }
    const point = { x: xWindow, y: yWindow, isHit: false };
    hiddenXInput.value = String(x);
    yInput.value = String(y);
    svgFlag = true;
    submitBtn.click();
    setTimeout(() => {
        const list = Array.from(document.querySelectorAll("#table tr"));
        const lastRow = list[list.length - 1];
        const isHit = lastRow.querySelectorAll("td")[3];
        if (isHit.textContent.trim() === "Yes") {
            point.isHit = true;
        }
        drawPoint(point);
        savePoint(point);
    }, 400);
}));
const addPopupWindow = (x, y) => {
    const popupWindow = document.createElement("div");
    popupWindow.style.position = "absolute";
    popupWindow.style.background = "#f8d7da";
    popupWindow.style.color = "#721c24";
    popupWindow.style.border = "1px solid #f5c6cb";
    popupWindow.style.padding = "8px";
    popupWindow.style.borderRadius = "4px";
    popupWindow.style.fontSize = "14px";
    popupWindow.style.animation = "fadeIn 0.4s ease";
    popupWindow.textContent = "Недопустимые координаты!";
    popupWindow.style.left = `${x}px`;
    popupWindow.style.top = `${y}px`;
    svgArea.parentElement.appendChild(popupWindow);
    setTimeout(() => {
        popupWindow.remove();
    }, 2000);
};
const getSavedPoints = () => {
    return JSON.parse(localStorage.getItem("points")) || [];
};
const savePoint = (pointObj) => {
    const points = getSavedPoints();
    points.push(pointObj);
    localStorage.setItem("points", JSON.stringify(points));
};
const drawPoint = (pointObj) => {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", String(pointObj.x));
    point.setAttribute("cy", String(pointObj.y));
    point.setAttribute("r", "3");
    point.classList.add("point");
    point.style.transformOrigin = `${pointObj.x}px ${pointObj.y}px`;
    if (pointObj.isHit) {
        point.style.fill = "blue";
    }
    svgArea.appendChild(point);
};
