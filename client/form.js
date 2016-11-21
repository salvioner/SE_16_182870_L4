MAX_ID = 10000;
form = document.forms[0];

/**
 * Sets the format for the ID which identifies the employees.
 * The format is the number of digits used, and it depends from
 * the global variable MAX_ID. Example: for 1000 employees,
 * the ID will be #000, #001, #002, #592, etc. until #999
 */
function setIDFormat() {
  // computing the format of the ID
  var id_min = "";
  var id_max = "";
  var n = MAX_ID;
  while(n > 1) {
    id_min += "0";
    id_max += "9";
    n /= 10;
  }
  //updating the "id" field's placeholder:
  var id_input = document.getElementById('id-input');
  id_input.placeholder = id_min + " - " + id_max;
  return;
};

/**
 *  Shows the form without altering its content.
 */
function showForm() {
  form.hidden = false;
  setTextById('show-form', 'Cancel');
  document.getElementById('show-form').setAttribute('onmousedown', 'hideForm()');
}

/**
 *  Hides the current form and deletes its content.
 */
function hideForm() {
  form.hidden = true;
  form.reset();
  setTextById('show-form', 'New form');
  document.getElementById("show-form").setAttribute('onmousedown', 'showForm()')
}

function send(mode) {
  document.getElementById('mode').value = mode;
  form.submit();
}
