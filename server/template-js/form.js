MAX_ID = 21;
form = document.forms[0];

address = "http://localhost:1337"
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

function send(mode) {
  switch(mode) {
    case 'delete':
      form.setAttribute("method", "get");
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
