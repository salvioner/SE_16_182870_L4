/**
 *  Reads the content of the form and returns a standard object with
 *  all the informations entered.
 *  @return {Object} a JSON object with all the informations
 */
function read() {
  var newEntry = {};
  // saving entered info in an object:
  newEntry.ID = readID();
  newEntry.Name = document.getElementById('name-input').value;
  newEntry.Surname = document.getElementById('srname-input').value;
  newEntry.Level = document.getElementById('level-input').value;
  newEntry.Salary = parseInt(document.getElementById('salary-input').value);
  // returning new entry
  return newEntry;
}
