const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector(".container");

/** Create a random rbg color */
function randomColorGenerator() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return { red, green, blue };
}

/** Resets the canvas before new canvas is created */
function resetCanvas() {
  container.innerHTML = "";
}

/** Create the canvas based on user input (row x column)
 * @param {number} rowColumn - Number of rows and columns in a canvas
 */
function createCanvas(rowColumn) {
  for (let i = 0; i < rowColumn; i++) {
    let createRow = document.createElement("div");
    createRow.setAttribute("class", "row");
    container.appendChild(createRow);

    for (let i = 0; i < rowColumn; i++) {
      let createColumn = document.createElement("div");
      createColumn.setAttribute("class", "column");
      createRow.appendChild(createColumn);
    }
  }
}

/** Takes user input, checks if its valid and then send the user input to createDOM() to create the required canvas */
function submitUserInput() {
  if (input.value === "") {
    input.focus();
    input.placeholder = "";
  }
  resetCanvas();

  let rowColumn;
  try {
    rowColumn = Number(input.value);
    if (isNaN(rowColumn)) {
      throw new Error(TypeError);
    } else if (rowColumn > 100) {
      throw new Error("Error: Number should be 100 or lower");
    }
  } catch (error) {
    console.log(error);
    input.value = "";
    input.placeholder = "";
    input.focus();
    return;
  }

  createCanvas(rowColumn);
  let column = document.querySelectorAll(".column");

  // Fade-In and Fade-Out Event
  column.forEach((element) => {
    element.addEventListener("mouseover", (e) => hover(e));
    element.addEventListener("mouseleave", (e) => hoverOut(e));
  });
}

/** When a empty input gets out of focus */
function blurInput() {
  if (input.value === "") {
    input.placeholder = "Enter a value";
  }
}

function hover(e) {
  let column = e.target;
  ({ red, green, blue } = randomColorGenerator());
  column.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`;
  column.style.transition = "background-color 1s ease";
  column.style.opacity = "1.0";

  if (!column.classList.contains("column-hover")) {
    column.classList.add("column-hover");
  }
}

function hoverOut(e) {
  let column = e.target;
  column.style.transition = "opacity 2s ease";
  column.style.opacity = "0.0";
}

// Button Event
button.addEventListener("click", submitUserInput);

// Input Event
input.addEventListener("blur", blurInput);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitUserInput();
    input.blur();
  }
});
