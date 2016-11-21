MAX_ID = 10000;
form = document.getElementById('form');

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
  setTextById('show-form', 'Hide form');
  document.getElementById('show-form').setAttribute('onmousedown', 'hideForm()');
}

/**
 *  Hides the current form, but does not delete its content.
 */
function hideForm() {
  form.hidden = "true";
  setTextById('show-form', 'Show form');
  document.getElementById("show-form").setAttribute('onmousedown', 'showForm()')
}

/**
 *  Reads the value from the ID field and checks if it's in bound.
 *  @return the {Integer} the value of the ID field; {null} if the value is out of bound
 */
function readID() {
  var id = document.getElementById('id-input');
  if (id.value >= MAX_ID || id.value < 0) {
    alert('ID OUT OF BOUND! Please insert a number between 0 and' + (MAX_ID - 1));
    return null;
  } else {
    return parseInt(id.value);
  }
}

function search() {
  
}

function delete() {

}

function add() {

}
