function showForm() {
  var form = getElementById("form")
  form.hidden = "false"

  setTextById('show-form', 'Hide form')
  document.getElementById('show-form').
}

function hideForm() {
  var form = getElementById("form")

  form.hidden = "false"
  setTextById('show-form', 'Hide form')
}
