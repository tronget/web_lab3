import {addClassUntilTrue, checkBoundaries} from "./functions.js";
import {
  form,
  rContainer,
  rCheckboxes,
  svgArea,
  table,
  xContainer,
  xSelect,
  yContainer,
  yInput,
} from "./variables.js";

rCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      rCheckboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    }
  });
});

const getX = (): number => {
  return Number(xSelect.value);
};

const getY = (): number => {
  return yInput.valueAsNumber;
};

const getR = (): number => {
  // eslint-disable-next-line no-restricted-syntax
  for (const el of rCheckboxes) {
    if (el.checked) {
      return Number(el.value);
    }
  }
  return NaN;
};

const checkY = (): boolean => {
  const value: number = getY();

  if (Number.isNaN(value)) return false;

  return checkBoundaries(value, -3, 3);
};

const checkX = (): boolean => {
  const value: number = getX();

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

xSelect.addEventListener("change", markX);

yInput.addEventListener("blur", markY);

const sendRequest = async (request: Request) => {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const sendDot = (
  x: number,
  y: number,
  r: number,
): Promise<Record<string, any>> => {
  const request = new Request("http://localhost:8080/lab2_correct-1.0-SNAPSHOT/api", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      x: x,
      y: y,
      r: r,
    }),
  });
  return sendRequest(request);
};

const addDotToTheTable = (dotInfo: Record<string, any>) => {
  if (dotInfo == null) {
    return;
  }

  table.innerHTML += `
        <tbody>
            <tr>
                <td>${dotInfo.dot.x}</td>
                <td>${dotInfo.dot.y}</td>
                <td>${dotInfo.dot.r}</td>
                <td>${dotInfo.hit}</td>
                <td>${dotInfo.time}</td>
            </tr>
        </tbody>
    `;
};

const sendAndAddDot = async (x: number, y: number, r: number) => {
  const dotInfo = await sendDot(x, y, r);
  addDotToTheTable(dotInfo);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!(checkR() && checkX() && checkY())) {
    markAll();
    return;
  }
  markAll();
  await sendAndAddDot(getX(), getY(), getR());
  form.reset();
});

svgArea.addEventListener("click", async (e) => {
  if (!checkR()) {
    markR();
    return;
  }
  markR();
  const rect = svgArea.getBoundingClientRect();
  let x = e.clientX - rect.left - 20;
  let y = e.clientY - rect.top - 20;

  const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  point.setAttribute("cx", String(x));
  point.setAttribute("cy", String(y));
  point.setAttribute("r", "3");
  point.classList.add("point");
  point.style.transformOrigin = `${x}px ${y}px`;

  const r = getR();
  x = Number((((x - 150) / 100) * r).toFixed(3));
  y = Number((((150 - y) / 100) * r).toFixed(3));

  const dotInfo = await sendDot(x, y, r);
  if (dotInfo.hit) {
    point.style.fill = "blue";
  }
  svgArea.appendChild(point);
  addDotToTheTable(dotInfo);
});
