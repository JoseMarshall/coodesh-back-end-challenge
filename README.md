# Coodesh: Back-end Challenge 🏅 2021

## Description
This project is a solution to the [challenge](https://lab.coodesh.com/public-challenges/back-end-challenge-2021) proposed by the coodesh, a REST API that uses a cron system to load data into a database and exposes it through the following endpoints:

   - `GET /`: Return a message "REST Back-end Challenge 20201209 Running"
   - `PUT /users/:userId`: handle the made updates in a user
   - `DELETE /users/:userId`: remove the user from database
   - `GET /users/:userId`: get a user
   - `GET /users`: get a list of users

## Techs/Languages/Frameworks
-  Typescript             
-  ExpressJS 
-  Joi
-  MongoDB
-  Mongoose
-  Node-Cron
-  Node-Fetch
-  Swagger
-  EsLint
-  Prettier
-  Jest
-  Supertest
-  Docker

## Installation

Use the package manager (all instructions are given based on ```npm```) to install the packages

```bash
npm install
```

## Usage
1- Create a mongodb [cluster](https://www.mongodb.com/cloud/atlas/lp/general/try?utm_source=compass&utm_medium=product)

2- Create a .env.development file with the following keys:
```typescript
URL_ROOT= 'http://localhost'
MAX_API_KEY_USAGE='30' #The max limit of API Key usage
PORT= 3333 #The port number server will be listening to, the default is 3333
CORN_SECOND = 0 #The preferred second to load the data from randomuser api
CORN_MINUTE = 0 #The preferred minute to load the data from randomuser api
CORN_HOUR = 0 #The preferred hour to load the data from randomuser api

MONGO_URL= "mongodb+srv://USER_NAME:PASSWORD@CLUSTER.mongodb.net/coodesh-back-end?retryWrites=true&w=majority" #The URL to connect to the previously created cluster on step 1 
```
3- Run the ```dev``` script:
```bash
npm run dev
```
4- Go to the API docs through your browser, hit the endpoint ```/api-docs``` to see all available endpoints and their specs 

#### Tests:
```npm run test```

#### Docker:
The app is deployed in docker too, you can access through this link:

## Contributing
Pull requests are welcome; create a branch based on the ```develop``` branch. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)