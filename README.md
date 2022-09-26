# AirTnt

## About AirTnt
AirTnt is a clone of the website airbnb. AirTnt can be used to host lodging as an alternative to staying at hotels while traveling. 
Users of AirTnt can create listings, edit their listings, and delete their listings. Users can also view the details of a listing and 
leave reviews for other listings. 

[AirTnt can be viewed by clicking here](https://first-app-mk1.herokuapp.com/)

AirTnt wiki directory:
- [AirTnt Features](https://github.com/TTan321/API-project/wiki/AirTnt-feature-list)
- [Database Schema](https://github.com/TTan321/API-project/wiki/Database-Schema)
- [API Routes](https://github.com/TTan321/API-project/wiki/API-Routes)
- [Redux Store Shape](https://github.com/TTan321/API-project/wiki/Redux-Store-Shape)

AirTnt is built with:
- Javascript
- Express
- Sequelize
- PostgreSQL
- React
- Redux

## Features of AirTnt
### Home Page of AirTnt
* Displays all the spots created for AirTnt
* Has a navigation bar for returning to home page, button for creating a spot, button that opens menu for logging in or signing up
![Home page](https://github.com/TTan321/API-project/blob/main/backend/assets/AirTnt%20homepage.PNG)

## Current Features of AirTnt
### Spots
* Create a spot (listing) after logging in or creating an user and filling out the add spot form. 
* Get all spots, which are all the spots displayed in the homepage.
* Get a spot, which displays the details of a spot after clicking on one in the homepage.
* Edit a spot, by altering the details of spot using a form.
* Delete a spot a user has previously made. 

### Reviews
* Create a review, if the user is not the owner of a spot, then the user can add a review for that spot.
* Get a spot's reviews, spot's detail page will display all the reviews posted for that spot.
* Get a user's reviews, user's reviews page will display all the user's reviews.
* Delete a review, in the user's reviews page, the user can delete a previously written review. 

## Future Features of AirTnt
* Adding multiple images for a specific spot
* Create bookings for a specific spot

## Run AirTnt Locally
* Clone the main repository of AirTnt
* Open the project in the root directory and run the command npm install and npm install -D to install the required packages.
* Create a .env file similar to the .env example located in the backend folder. 
* Create the database in the backend by running npx dotenv sequelize db:migrate and then npx dotenv sequelize db:seed:all
* Then enter the command npm start in two terminals, one for the backend and one for the frontend. 




