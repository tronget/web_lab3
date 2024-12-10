const xContainer: HTMLElement = document.querySelector(".x_container");
const yContainer: HTMLElement = document.querySelector(".y_container");
const rContainer: HTMLElement = document.querySelector(".r_container");
const xSelect = document.getElementById("form:x_select") as HTMLSelectElement;
const yInput = document.getElementById("form:y_input") as HTMLInputElement;
const hiddenXInput = document.getElementById("form:hidden_x") as HTMLInputElement;
const rOptions: HTMLInputElement[] = Array.from(
  document.querySelectorAll(".r_container input[type='radio']"),
);
const form = document.getElementById("form") as HTMLFormElement;
const table = document.getElementById("table");
const svgArea = document.getElementById("svgArea");
const submitBtn: HTMLButtonElement = document.querySelector(".submit_btn");

const yInputCorrect = document.getElementById("form:y_input_correct") as HTMLInputElement;

yInputCorrect.addEventListener("change", () => {
  yInput.value = yInputCorrect.value;
});

interface Point {
  x: number;
  y: number;
  isHit: boolean;
}

let svgFlag = false;

window.addEventListener("load", () => {
  const points = getSavedPoints();
  points.forEach(point => {
    drawPoint(point);
  });
});

const checkBoundaries = (
  num: number,
  left: number,
  right: number,
): boolean => left <= num && num <= right;

const addClass = (el: HTMLElement, className: string): void => {
  el.classList.add(className);
};

const removeClass = (el: HTMLElement, className: string): void => {
  el.classList.remove(className);
};

type CheckHandler = () => boolean;

const addClassUntilTrue = (
  condition: CheckHandler,
  el: HTMLElement,
  className: string,
): void => {
  if (!condition()) {
    addClass(el, className);
    return;
  }
  removeClass(el, className);
};


const getX = (): number => {
  return Number(xSelect.value);
};

xSelect.addEventListener("change", () => {
  hiddenXInput.value = xSelect.value;
})

const getY = (): number => {
  return yInput.value === "" ? NaN : Number(yInput.value);
};

const getR = (): number => {
  // eslint-disable-next-line no-restricted-syntax
  for (const el of rOptions) {
    if (el.checked) {
      return Number(el.value);
    }
  }
  return NaN;
};


const checkX = (): boolean => {
  const value: number = getX();

  if (Number.isNaN(value)) return false;

  return checkBoundaries(value, -3, 3);
};

const checkY = (): boolean => {
  const value: number = getY();

  if (Number.isNaN(value)) return false;

  return checkBoundaries(value, -3, 5);
};

const checkR = (): boolean => {
  const value: number = getR();

  if (Number.isNaN(value)) return false;

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
  } else {
    hiddenXInput.value = xSelect.value;
  }
  markAll();
});

svgArea.addEventListener("click", async (e) => {
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

  const point: Point = {x: xWindow, y: yWindow, isHit: false};

  hiddenXInput.value = String(x);
  yInput.value = String(y);

  svgFlag = true;

  submitBtn.click();

  setTimeout(() => {
    const list: HTMLTableRowElement[] = Array.from(
      document.querySelectorAll("#table tr")
    );
    const lastRow = list[list.length - 1];
    const isHit = lastRow.querySelectorAll("td")[3];
    if (isHit.textContent.trim() === "Yes") {
      point.isHit = true;
    }
    drawPoint(point);
    savePoint(point);
  }, 400);

});

const addPopupWindow = (x: number, y: number) => {

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
}

const getSavedPoints = (): Point[] => {
  return JSON.parse(localStorage.getItem("points")) || [];
};

const savePoint = (pointObj: Point) => {
  const points = getSavedPoints();
  points.push(pointObj);
  localStorage.setItem("points", JSON.stringify(points));
};

const drawPoint = (pointObj: Point) => {
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
}