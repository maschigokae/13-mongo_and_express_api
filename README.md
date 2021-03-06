## Hello and welcome to my Electric Vehicle API.

In the last decade, Electric vehicles have exploded in popularity with the advent of new battery technologies and practical vehicles hitting the market, from flashy luxury models like Tesla's Model S, to affordable commuter/family models like Nissan's Leaf. As technology improves and better, more affordable models hit the market, Electric vehicles have the potential to make a serious dent in pollution from automotive transportation. This is especially true in markets with relatively green power grids.

For this API, we define "Electric Vehicles" more technically and specifically as "Battery-Electric Vehicles," or BEVs. Only vehicles that are powered exclusively by electricity from a battery are included. This designation excludes plug-in-hybrid vehicles (like the Chevrolet Volt) and hydrogen fuel cell vehicles.

The API saves data to a MongoDB database and returns entries for individual vehicles as JSON objects.

There are currently two resources for this API:
  * Vehicles: general info about individual vehicles
  * Reviews: reviews and ratings for vehicles submitted by users

Each vehicle object has 5 user-editable properties:
  * vehicle -- Make and Model of Vehicle. Example: "Nissan Leaf". **Must be a string.**
  * info -- Details about vehicle. Example: "practical and affordable hatchback". **Must be a string.**
  * msrp -- Vehicle's manufacturer-suggested retail price (MSRP) for typically equipped vehicle, in USD. **Must be a number.**
  * range -- Vehicle's EPA-rated range on a full charge, in miles. **Must be a number.**
  * mpge -- Vehicle's EPA-rated "miles-per-gallon equivalent" (MPGe). **Must be a number.**

Each review object has 4 user-editable properties:
  * title -- Title or headline of review. **Must be a string.**
  * authorName -- Reviewer's name or handle. **Must be a string.**
  * reviewText -- Main body text of the review. **Must be a string.**
  * rating -- A number from 1 to 10, with 1 meaning "horrible" and 10 meaning "excellent". **Must be a whole number no less than 1 and no greater than 10.**

Additionally, each individual vehicle and review object has an "id" property, which is generated by MongoDB and not user-editable. The id property holds a randomly generated string composed of letters, numbers, and dashes. The id is used as a URI parameter in each http request against an existing individual vehicle and/or review object.

## Summary

The purpose of this API is ultimately to be a resource for consumers interested in Electric Vehicles and green transportation in general, containing the most up-to-date information on Electric Vehicles. Info such as market availability, quick-charging options and standards, and more technical specs will eventually be added (as additional API properties).


## How to use this API

This API is configured for use in the command line. It is set up to run on port 3000 of your computer's local IP (this IP can be accessed with the identifier `localhost`).

You will need MongoDB installed locally. You will also need a command line http tool installed. I recommend httpie, and I assume you have it installed for this example.

  * In the command line, making sure you're in the root directory of your local version of the API, install the necessary dependencies for running the app by typing `npm i`
  * In a **separate** window or pane of your command line interface, start MongoDB by typing `mongod`
  * Then, start the node server by typing `npm run start`
  * Let's add a sample vehicle to the API. In a **separate** window or pane of your command line interface (the first two are running the node server and MongoDB in the background), type `http POST localhost:3000/api/bev vehicle="Nissan Leaf" info="practical, affordable commuter and family vehicle" range=107 mpge=110`
  * Let's add a second sample vehicle. Type `http POST localhost:3000/api/bev vehicle="Tesla Model X" info="classy, sporty, high-tech luxury SUV" msrp=100000 range=300 mpge=95`
  * Let's get the unique id for each vehicle. Each id is a random string of numbers, letter, and dashes autogenerated with node-uuid. type `http localhost:3000/api/bev` This should print an array of ids (for this example there should be two) in the command line.
  * Let's take one of the ids and look up the vehicle information it references. Copy the text of one of the ids. Then in the command line, type `http localhost:3000/api/bev/` (make sure the closing forward-slash is present) and paste the id before submitting the command. You should see an object printed to the command line with the vehicle info.
  * Let's post a review for the Tesla Model X. Copy the id for the vehicle you want to review. Type `http POST localhost:3000/api/bev/`, paste the vehicle id, then type `/review title="Amazing Car!" authorName="YourName" reviewText="This car will blow your mind!" rating=10`
  * Now, when you look up the vehicle again, you will see this review and all other reviews associated with it, contained within an array in the "reviews" property. Alternatively, to look up a single review, type `http localhost:3000/api/bev/` paste the vehicle id, then type `/review/`, then paste the review id.
  * You may update vehicle or review objects by typing `http PUT`, entering the URI for the vehicle and review (formatted the same as a GET request) and entering the updated information (formatted the same as a POST request). Unlike POST requests, updating all fields is not required. Say you decided you wanted to downgrade your rating and add a comment to the review body. You would type the request in the following format: `http PUT localhost:3000/api/bev/***vehicle-id-here***/review/***review-id-here*** reviewText="This car will blow your mind! The gullwing doors are a bit annoying though." rating=9` Now the rating and review text are updated, while the authorName and title fields remain unchanged.
  * To delete a vehicle or review, type `http DELETE` followed by the full URI of the vehicle or review you wish to delete. Example request for deleting a review: `http DELETE localhost:3000/api/bev/***vehicle-id-here***/review/***review-id-here***`

  Thanks for using my API. Check back soon for updates and improvements!
