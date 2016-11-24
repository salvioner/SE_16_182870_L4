#Employees management tool

HOW TO TEST:

0 - *Set Up the database* in server/database/database.json: By **default**, the db is a vector of 20 entries (entries from 2 to 19 have the same values, except ID) and each of them is a .json object. In file server/database/DBOptions.json the **number of entries** of the db is saved as "max_id". The IDs range to 0 to (max_id - 1). If the database is manually edited, be sure to update the DBOptions.json file accordingly. To reset the database to its **default**, run script server/database/DBrestore.js from a node.js console.

Run file server/server.js in a node console, then open a browser and connect to http://127.0.0.1:1337/.

Hitting the "New Form" button should make an empty form appear. Hitting it again should hide and reset the form.

1 - *Search ID*: Insert an ID in the ID field and press the *Search ID* button. If the ID exists, the form below will contain the related employee's data. Else, the user will be shown an empty form.

2 - *delete ID*: First of all, *Search* for an existent ID; then hit *Delete ID* and the related entry will be removed from the database. Further searches should return an empty form, until another entry is added under that same ID.

3a - *Add New Employee (test a)*: use the *Search ID* feature to view some employee's data. Eventually, *Delete* that entry or not (it should give the same results in both cases). Change the values in the fields (name, surname, level, salary) and hit the button *Add New Employee*. Further searches should return the same data you inserted.

3b - *Add New Employee (test b)*: Try submitting an *Add New Employee* form without specifying some parameters (or all of them). A red message should appear telling you which field are missing.

3c - *Add New Employee (test c)*: Be sure that the ID text field is empty. A range (e.g. "0 to 19", where 19 is called **MAX_ID**) should be shown. Insert an ID which is higher than **MAX_ID** and submit some data with the *Add New Employee* button. The returned ID should always be equal to **MAX_ID** + 1. This will happen because the database needs the IDs to be progressive in order to work properly and efficiently; **the user is allowed to input an ID which is higher than MAX_ID**, but then the server saves the entry with the first allowed. Executing this test for multiple times should always work (with **MAX_ID** increased by 1 each time) without errors, unless the database grows too big for the machine you are running this server on.

3d - *Add New Employee (test d)*: Reset the database by running server/database/DBrestore.js in a Node console. *Delete* some entries, then try to *Add a new Employee* leaving the ID field blank. The new employee should be added under the lowest ID between the ones you deleted. Do this test without resetting the database if you know which the current lowest empty ID in the database is.

For informations, questions or issues please contact me at **andrea.arighi@studenti.unitn.it**
