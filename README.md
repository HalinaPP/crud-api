# crud-api
A simple CRUD API using in-memory database underneath.

## INSTALL instruction
 
 To install the application on your local machine, you need to clone the repository using the following command

   **git clone https://github.com/HalinaPP/crud-api.git**
  
1. Switch to the 'dev' branch
 
  **git checkout dev**

2. install all dependencies (make sure you have internet connection and have LTS version of nodejs [npm](https://nodejs.org/en/)) 
  
    **npm install**

3. create `.env` file. 
  - rename  `.env.example` to `.env`
  - store port value in the `.env` file, on which application is running (3000)
  
    **PORT=3000**

4. run application  
  4.1. in development mode
    **npm run start:dev**
  4.2. in production mode
    **npm run start:dev**

5. for checking endpoints you can use some additional application, for example, Postman:
 - select method (GET, POST, PUT, DELETE), 
 - type url http://localhost:PORT_NUMBER_FROM_ENV/api/users
 - click 'Send' button
 - check Status and Body in a Response area.

6. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

7. 
  7.1. Application provide next endpoint `api/users` methods:
    - **GET** `api/users` is used to get all persons
        - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/{userId}` 
        - Server should answer with `status code` **200** and and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

7.2. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) return  `status code` **404** and message 'Error! Path not found'

7.3. Errors on the server side that occur during the processing of a request return `status code` **500** and message 'Internal Server Error'

8. 3 tests scenarios for API are implemented.
   8.1. Check that all methods work correctly
   8.2. all methods return status-code=404 for non-existing user
   8.3. data validate correctly and return status-code=400 and appropriate message for bad request data