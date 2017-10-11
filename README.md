# Lookup Admin
## Database
* Used MySQL to ease querying (as compared to NoSQL solutions)  
* Added indexes to relevant columns to speedup lookup
* Uploaded data to the table using a PHP script
* [PhpMyAdmin](http://35.199.63.1/phpmyadmin) => username: bain, password: password

## Backend
* NodeJS + Express for getting things up and running quickly
* Important component : [queryHandler.js](https://github.com/boris93/bain/blob/master/queryHandler.js)
* Added support for row-filtering, column-selection and pagination
### Test
* .> nodeunit test
* [queryHandlerTest.js](https://github.com/boris93/bain/blob/master/test/queryHandlerTest.js) tests queryHandler

## Frontend
* Bootstrap for building a responsive design quickly  
* jQuery for easy DOM manipulation
* [Script](https://github.com/boris93/bain/blob/master/docs/script.js)

---

Live URL: [http://35.199.63.1:8080](http://35.199.63.1:8080)  
Can also be accessed via [GitHub pages](https://boris93.github.io/bain/) but it requires HTTPS support
