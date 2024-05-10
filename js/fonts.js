const select = document.getElementById("fontSelect");

const editableDiv = document.querySelector("div[contenteditable]");

for (let i = 0; i < fonts.length; i++) {
  const font = fonts[i];

  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(`
    @font-face {
      font-family: '${font.name}';
      src: url('${font.url}') format('woff');
    }
  `)
  );
  document.head.appendChild(style);

  const option = document.createElement("option");
  option.text = font.name;
  select.appendChild(option);
}

select.selectedIndex = 0;
changeFontFamily();

function changeFontFamily() {
  const font = select.options[select.selectedIndex].text;
  document.querySelector("div[contenteditable]").style.fontFamily = font;
}

document
  .querySelector("div[contenteditable]")
  .addEventListener("paste", function (e) {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text/plain");

    document.execCommand("insertHTML", false, pastedText);
  });

const textDirectionSelect = document.querySelector(".textDirection");
const contentEditableDiv = document.querySelector("div[contenteditable]");

function changetextDirection() {
  const selectedIndex = textDirectionSelect.selectedIndex;

  const textDirection = ["horizontal-tb", "vertical-rl"];
  contentEditableDiv.style.writingMode = textDirection[selectedIndex];

  if (textDirection[selectedIndex] === "vertical-rl") {
    convertText(contentEditableDiv);
    contentEditableDiv.style.overflowY = "hidden";
    contentEditableDiv.style.overflowX = "scroll";
  } else if (textDirection[selectedIndex] === "horizontal-tb") {
    revertGlyphs(contentEditableDiv);
    contentEditableDiv.style.overflowY = "scroll";
    contentEditableDiv.style.overflowX = "hidden";
  }

  contentEditableDiv.addEventListener("input", function (event) {
    const inputText = event.data;

    if (!isKorean(inputText) || isSpecialCharacter(inputText)) {
      if (textDirection[selectedIndex] === "vertical-rl") {
        savedSelection = saveSelection(contentEditableDiv);
        convertText(contentEditableDiv);
        restoreSelection(contentEditableDiv, savedSelection);
      } else if (textDirection[selectedIndex] === "horizontal-tb") {
        savedSelection = saveSelection(contentEditableDiv);
        revertGlyphs(contentEditableDiv);
        restoreSelection(contentEditableDiv, savedSelection);
      }
    }
  });
}

function isKorean(text) {
  const koreanPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
  return koreanPattern.test(text);
}

function saveSelection(element) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rangeClone = range.cloneRange();

  return {
    range: rangeClone,
    offsetStart: range.startOffset,
    offsetEnd: range.endOffset,
  };
}

function restoreSelection(element, savedSelection) {
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedSelection.range);
  selection.collapse(
    savedSelection.range.startContainer,
    savedSelection.offsetStart
  );
  if (savedSelection.offsetStart !== savedSelection.offsetEnd) {
    selection.extend(
      savedSelection.range.startContainer,
      savedSelection.offsetEnd
    );
  }
}

// editableDiv.addEventListener("click", function () {
//   this.style.overflow = "auto";
// });

// document.addEventListener("click", function (e) {
//   if (e.target !== editableDiv) {
//     editableDiv.style.overflow = "hidden";
//   }
// });

let lastHeightValue = 1.5;

function changeFontSize(sizeValue) {
  const editableDiv = document.querySelector("div[contenteditable]");
  editableDiv.style.fontSize = sizeValue + "px";
  updateLineHeight(lastHeightValue);
}

function updateLineHeight(heightValue) {
  lastHeightValue = heightValue;
  const editableDiv = document.querySelector("div[contenteditable]");
  const currentFontSize = parseFloat(getComputedStyle(editableDiv).fontSize);
  const lineHeightInPx = heightValue * currentFontSize;
  editableDiv.style.lineHeight = lineHeightInPx + "px";
}

function showValueLetter(letterValue) {
  const emValue = letterValue / 1000;
  document.querySelector("div[contenteditable]").style.letterSpacing =
    emValue + "em";
}

function showValueHeight(heightValue) {
  updateLineHeight(heightValue);
}
