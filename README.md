#Employees management tool

HOW TO TEST:

0 - set up the database in database/database.json: By default, the db is a vector of 20 entries (entries from 2 to 19 have the same values, except ID) and each of them is a .json object. In file database/DBOptions.json is saved the NUMBER OF ENTRIES of the db as "max_id". The IDs range to 0 to (max_id - 1). If the database is manually edited, be sure to update the DBOptions.json file. To reset the database, run script database/DBrestore.js from a node.js console.

1 - Search ID: Insert an ID in the ID field and press the "Search ID" button. If the ID exists, the form below will contain the data. Else, the user will be shown the starting page.

2 - delete ID: Enter an existent ID and it will be removed from database. Further searches won't find the data, until another entry is added with that ID.

3 - Add New Employees: to be tested
