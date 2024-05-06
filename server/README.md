# Documentation for the MongoDB database setup script and religious text and annotation server

The folder where the setupdb.js script is run should contain a .env file like this.

The blank DB_USER, DB_PASSWORD, and DB_AUTH_SOURCE fields should be filled in if your MongoDB requires authentication to access and modify. The DB_URL should be changed to reflect your MongoDB installation
```
DB_URL=mongodb://localhost:27017
DB_USER=
DB_PASSWORD=
DB_AUTH_SOURCE=
SERVER_PORT=3001
# user name associated with notes by default
USERNAME=yourUserName
```