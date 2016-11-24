form = document.forms[0];

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
 *  Shows the form without altering its content.
 */
function showForm() {
  var formNode = document.getElementById('form');
  formNode.hidden = false;
  setTextById('show-form', 'Cancel');
  document.getElementById('show-form').setAttribute('onmousedown', 'hideForm()');
}

/**
 *  Hides the current form and deletes its content.
 */
function hideForm() {
  var formNode = document.getElementById('form');
  formNode.hidden = true;
  form.reset();
  setTextById('show-form', 'New form');
  document.getElementById("show-form").setAttribute('onmousedown', 'showForm()')
}

/**
 *  Sends the form specifying the method and the address, according to
 *  the pressed button.
 *  @param {String} mode = {'delete', 'add', 'search'} identifies which button has been pressed
 */
function send(mode) {
  form = document.forms[0];
  switch(mode) {
    case 'delete':
      form.setAttribute("method", "post");
      form.setAttribute("action", "http://127.0.0.1:1337/del/");
      break;

    case 'add':
      form.setAttribute("method", "post");
      form.setAttribute("action", "http://127.0.0.1:1337/");
      break;

    default:
      form.setAttribute("method", "get");
      form.setAttribute("action", "http://127.0.0.1:1337/")
  }
  form.submit();
}
