<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="http://127.0.0.1:1337/css/style.css">
    <script type="text/javascript" src="http://127.0.0.1:1337/template-js/form.js"></script>
    <title>
      Employees
    </title>
  </head>

  <body>
    <header>
      <h1>
        Employees Database
      </h1>
    </header>
    <br>
    <p>
      This tool lets you manage your employees. Press the button below to start.
    </p>
    <br>
    <button id="show-form" onmousedown="showForm()">New Form</button>
    <hr>
    <br>
    <!-- form -->
    <div id="form" (:hidden:)>
      <form action="" method="">
        <fieldset>
          <div class="input-box" id="id-input-box">
            <legend class="instructions">
              Here you can look at employees informations, edit them and add/delete entries from the remote database.
            </legend>
            <label>
              ID #
            </label>
            <input class="input-text-field" id="id-input" name="id" type="text" placeholder=(:IDrange:) value=(:ID:)>
            <input id="search-id" type="button" value="Search ID" onmousedown="send('search')">
            <input id="delete-id" type="button" value="Delete ID" onmousedown="send('delete')">
          </div>
        </fieldset>
        <fieldset>
          <div class="input-box" id="info-input-box">
            <h4 style="color:red">
              (:message:)
            </h4>
            <legend class="instructions">
              Employee informations - fill the form below if you want to add a new entry in the database. Please notice that if the ID field is left empty, the system will assign the next available ID. Else, <span class="bold">the selected ID will be overwritten</span>
            </legend>
            <label>
              Name
            </label>
            <input class="input-text-field" id="name-input" name="name" type="text" placeholder="Jeremy" value=(:name:)>
            <label>
              Surname
            </label>
            <input class="input-text-field" id="surname-input" name="surname" type="text" placeholder="Johnson" value=(:surname:)>
            <br>
            <label>
              Level
            </label>
            <input class="input-text-field" id="level-input" name="level" type="text" placeholder="Advertising manager" value=(:level:)>
            <label>
              Salary $
            </label>
            <input class="input-text-field" id="salary-input" name="salary" type="text" placeholder="10000" value=(:salary:)>
          </div>
          <input id="add-id" type="button" value="Add New Employee" onmousedown="send('add')">
        </fieldset>
      </form>
      <br><hr>
    </div>
    <!-- end form -->
    <p class="copyright">
      This work is licensed under a<br><br>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
        <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" />
      </a>
      <br>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
      <br>
      <br>
      Copyright 2016 by Andrea Arighi - created during November 2016 for a University project.
    </p>
    <script type="text/javascript" src="template-js/form.js"></script>
  </body>
</html>
