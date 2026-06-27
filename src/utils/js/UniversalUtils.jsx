
export function domParser(content, className) {
  const domObj = new DOMParser();
  const parsedContent = domObj.parseFromString(content, `text/html`);
  return parsedContent.querySelector(`.${className}`);
}

export function disablePanel(parent, child) {
  if (parent) {
    parent.style.cursor = `not-allowed`;
  }
  if (child) {
    child.classList.add(`not-allowed`);
  }
}

export function enablePanel(parent, child) {
  if (parent) {
    parent.style.cursor = `pointer`;
  }
  if (child) {
    child.classList.remove(`not-allowed`);
  }
}
