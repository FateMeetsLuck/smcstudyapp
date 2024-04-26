# The Official Scripture Study App for r/SecondMileChristian

## Description

This requires Node.js (and eventually MongoDB) to build and test locally.

## Building the client UI

Navigate to the client/ folder and run `npm start` to load the user interface webpage. By default this will run on your local machine on port 3000 so in a browser you can access it by going to http://localhost:3000 if npm doesn't automatically launch your default browser.

## Running the UB text server locally

From the main project folder, run `node server/ubserver.js`. This runs on port 3001 and the API can be called from a browser by GET requests such as `http://localhost:3001/api/ub?paperId=192&sectionId=3&paragraphId=3`. This has to be running for the client UI to pull text from the UB text database.