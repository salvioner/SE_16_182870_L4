/**
 * Sets the textContent of the element #id to a predetermined string
 * @param {string} id the id of the object to edit
 * @param {string} text the text which will appear inside the element
 */
function setTextById(id, text) {
  document.getElementById(id).textContent = text
  return;
}

/**
 *  Performs page's initial setup as soon as the <body> is loaded
 */
function init() {
  hideForm();
  setTextById('show-form', 'Start!');
  setIDFormat();
}
