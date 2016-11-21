MAX_ID = 1000;

/**
 * Sets the format for the ID which identifies the employees.
 * The format is the number of digits used, and it depends from
 * the global variable MAX_ID. Example: for 1000 employees,
 * the ID will be #000, #001, #002, #592, etc. until #999
 */
function setIDFormat() {
  // computing the format of the ID
  var id_str = "#";
  global MAX_ID;
  var length = MAX_ID / 10;
  for(i=0; i<length - 1; i++) {
    id_str += "0";
  }
  id_str += "1";

  //updating the "id" field's placeholder:
  var id_input = document.getElementById('id-input');
  id_input.placeholder = id_str;
  return;
};

/**
 * Sets the textContent of the element #id to a predetermined string
 * @param {string} id the id of the object to edit
 * @param {string} text the text which will appear inside the element
 */
function setTextById(id, text) {
  var el = getElementById(id)
  el.textContent = text
  return;
}
