# Unit 2 Project: Busy Bee

A simple way to keep track of your to-do list. Busy Bee gives you the ability to createa to-do list by adding, editing/updating, and deleting to-do items.

## Getting Started

You can check it out Busy Bee here:
[Live Link](https://obscure-lake-34748.herokuapp.com/lists) 

## Built With

* Node.js
* Mongoose
* Express
* EJS
* CRUD/RESTful routes

## Functionality: User Stories

A user can create a to-do list item, edit the name of the item, delete the item, and view all to-do list items on one page.

## Approach 

I created a single model full CRUD app that allowed the user to create a list. I wanted the user to be able to create a list and then add to-do items to the list which required another model. In order for the app to be fully functional, I had to create a relationship between the lists model and the list-items model. This would allow a user to create a list that could be edited/updated and deleted. 

The goal was to allow the user to create multiple lists and assign a show page to each of the lists. The second list-items model was supposed to enable the user to then add, edit, and delete list items from each list.

## Unsolved Problems

### Relationships
After creating the initial lists model with all 7 RESTful routes, I broke the app when trying to connect the databases. Creating a relationship between the two models meant that the routes would have more dynamic segments in order to access both models and allow them to interact.

I would get one route working and then break the next one. Ultimately, I decided to minimize the functionality of the app for now and just work with one model. So, the current functional app will only allow the user to create to-do list items instead of multiple lists with updateable items.

### Update Route
In attempting to create a relationship between the databases my update route broke. So, while you can create and delete new to-do items, if you want to edit the name it won't post the new/edited name to the show or index pages. I was having a hard time getting the item names to populate in my list that was displayed on the index page, and when I fixed that issue it created another error in my update route. 

When I go back to fix it I am going to make sure that the links to the forms are using an id to find, create, and update. By adding a dynamic segment to the routes I should be able to fix the update issue.

## Acknowledgments
* Hat tip to anyone whose code was used (I definitely used my notes from class)
* Inspiration
