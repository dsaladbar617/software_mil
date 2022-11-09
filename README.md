# DoD Software Factory Archive 

The following project is an effort to consolidate joint Software Factory projects, reduce redundant lines of effort, increase visibility in what each factory is capable of, and provide points of contact.  Ultimately the goal is to foster communication between military developer communities. 

## Setup

First create a Bruh-MongoD-B container to store the shop data:

[MongoDB Container Install Instructions](https://github.com/dsaladbar617/mongodb_express)

**In the server/db.js file you will change the connection string to include the name of the database that you created in step 6.**

Next you will need to install all dependencies in both the client and server folder using:
`npm i` 

## Add data to the database
To add the shop data to your database you will need to make a post request to http://localhost:8080/api/addall. You can copy the shops.json file into the request body or use it as an example to add your own data.

## Run Program
After you are sure that the mongoDB container is up and running you will then use npm start to bring up the server first, then the same command to bring up the client.
