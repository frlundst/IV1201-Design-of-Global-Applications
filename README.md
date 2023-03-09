# IV1201-Design-of-Global-Applications

## Setup
- Install VS Code.
- Install Node.js.
- Install xampp (only for MySQL). Username and password for MySQL should be root: .
- Install Java Development Kit 17.
- Install Java extensions on VS Code.
- Install Spring Boot extensions on VS Code.
- Open terminal in VS Code and type:
```
cd webapp
npm install
npm run dev
``` 
- Run Spring Boot from VS Code Spring Boot Dashboard.
- Run MySQL in xampp and create database named vfarecruitment.
- Done.

## Webapp Structure
- ```./webapp/``` contains the react application.
- ```./webapp/src/Components/``` contains all components.
- ```./webapp/src/Components/Composite``` contains all composite components used by multiple views, for example navbar.
- ```./webapp/src/Components/Views``` contains all views.
- ```./webapp/src/Internalization/``` contains all internalization functions.
- ```./webapp/src/Components/Resources``` contains all resources, for example text codes.
- ```./webapp/src/Components/Store``` contains all zustand stores.
- ```./webapp/src/Components/tests``` contains all frontend jest tests.
- ```./webapp/src/Types/``` contains interfaces of backend Entities and Request/Response models.
- ```./webapp/src/App.tsx``` is the main component where all of the routes are specified.

## Backend Structure
- ```./services/gateway/``` contains the Java Spring Boot API application.
- ```./services/gateway/src/main/java/com/backend/controller/``` contains all of the endpoint controllers.
- ```./services/gateway/src/main/java/com/backend/entity/``` contains all of the entities, i.e the database tables.
- ```./services/gateway/src/main/java/com/backend/model/``` contains all of the response and request models.
- ```./services/gateway/src/main/java/com/backend/repository/``` contains all of the repositories that are defining the database actions (the actions for modifying data).
- ```./services/gateway/src/main/java/com/backend/security/``` Spring Boot Security stuff.
- ```./services/gateway/src/main/java/com/backend/security/config/WebSecurityConfig.java``` maps all of the routes, where you can specify which role has access to each route.
- ```./services/gateway/src/main/resources/application.properties``` contains all of the properties for the Java Spring Boot application.
- ```./services/gateway/spring.log``` contains all of the main event logs.

## CI/CD-pipeline Structure
- ```./github/workflows/``` contains the github action workflows for deployment.

## Database Structure
- ```./sql``` contains the sql files and the csv data files with the old data. Tables are not made with SQL but are made automatically with the Spring Boot application. ```competences.sql``` is the only file with the commands that has to be run in a query.

## Deployment
- Deployment is automatically done when closing pull requests to the main branch, i.e the main branch is what is deployed to Azure.
- To build webapp locally; navigate to ```./webapp/``` and run command ```npm run build```
- To build API Application locally; navigate to ```./services/gateway/``` and run command ```mvn clean install```

## Links
- [Database](https://phpmyadmin678.loopia.se/) root@h333810 : vfarecruitmentroot
- [Azure](https://portal.azure.com/#@kth.onmicrosoft.com/resource/subscriptions/762702c5-f63f-4ded-ae3d-3bf5f01c7758/resourceGroups/IV1201_Recruitment/overview)
