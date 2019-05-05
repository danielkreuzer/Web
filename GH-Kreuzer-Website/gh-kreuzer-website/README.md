# gh-kreuzer-website

Repository for the Gasthaus Kreuzer in Reichenthal.

## Folder structure

### backend
* package.json - Configuration of nodejs packages
* package-lock.json - package tree of nodejs packages
* server.js - entry point for server and initial config

#### app
* App-Routes

#### auth
* Configuration of passport.js
* Authentication of the whole api
* View for login

#### config
* Configuration of database

#### database
* wrapper for database connection
* list of all db tables

#### posts
* functionality to query posts table

#### posttypes
* functionality to query posttypes table

#### productcategories
* functionality to query productcategories table

#### products
* functionality to query products table

#### public

##### css
* public css files

##### js
* public javascript files

##### uploads
* Images which have been uploaded by the user

#### scripts
* Create / Drop database scripts

#### users
* functionality to query users table

#### views
* All backend views as ejs files

### frontend
* index.php - entry point for application

#### css
* contains all stylesheets

#### fonts
* contains all fonts of the frontend

#### img
* Layout images

#### js
* contains all javascript files

#### resources

##### templates
* all templates like header.php, footer.php, ...

## Built With

* PHP - Serverside language used for frontend templating
* [Node](https://github.com/nodejs/node) - Serverside javascript framework
* [ExpressJS](https://github.com/expressjs/express) - additional web framework for node
* [PassportJS](https://github.com/jaredhanson/passport) - authentication framework for node
* MySQL Database

## Authors

* **Dominik Aigner**
* **Daniel Kreuzer**
* @FH Hagenberg
