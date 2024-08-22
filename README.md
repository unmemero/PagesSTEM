# STEM Student Professional Development  Resources Page

This page is intended to centralize the multiple resources available for STEM students to advance their careers. This will include lists of internships, entry level jobs, scholarships, and student organizations which will further the students professional life. **NOTE**: This website is intended mainly for college students. Plans for expansion are still in discussion. Any questions, comments, concerns, complaints, and suggestions, please direct them to our  [admin email](stem-sprp@gmail.com).

## Project overview.

The repository will consists of 3 main components:
- The frontend
- The backend
- The admin panel
Each of these being in their own folder.

### The backend

This is built using Node, Express, and MongoDB. All utilities are preinstalled, but to setup the necessary tools, please see the [backend setup documentation](./docs/backend_setup.md).
The folder is divided into:
- `config`: Includes backend connection.
- `middleware`: In charge of auth via JWT.
- `models`: Schemas for `User`, `Internship`, `Jobs`, `Scholarship`, and `Organizations`.
- `routes`:  CRUD logic for the models.
- `.env`: Environment variables.
- `server.js`: Main instance of the backend application. Connects routes and creates api's.

For testing, run a local instance of MongoDB by using the `mongod` command in terminal, and in a separate terminal run `node server.js`. To test the API endpoints please use [Postman](https://www.postman.com/downloads/).

### The Frontend

User visible content.

## Admin panel

Panel to allow the CRUD operations of the DB by authorized users.