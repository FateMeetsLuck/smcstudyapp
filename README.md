# The Official Scripture Study App for r/SecondMileChristian

## Description

The goal of this web application is to allow users to view and annotate various religious texts. It is currently in the pre-alpha state of development and updates may break compatibility at any time.

It requires Node.js, and MongoDB running on localhost port 27017 to build and test locally. At the moment, the only features are the ability to view the text of the Urantia Book section by section and store and write notes for each section on the side. Everything is configured to run off of `localhost` until a configuration system is implemented. Multi-colored highlighted notes will be implemented later, as well as the ability to view and annotate numerous other religious texts such as the World English Bible stored in the *.usfm format.

# Testing the software

## Setting up the notes database in MongoDB

First, MongoDB needs to be running on your local machine on port 27017. Run the database setup script in the server/ directory with the `npm run setup-db` to ensure that MongoDB creates a database for storing the notes. This setup script only has to be run once to create the database.

## Running the UB text server locally

Change to the server/ directory and run `npm start`. This runs on port 3001 and the API can be called from a browser by GET requests such as `http://localhost:3001/api/ub?paperId=192&sectionId=3&paragraphId=3`. This has to be running for the client UI to pull text from the JSON or usfm files and associated notes from the MongoDB databases.

## Building and running the client UI

Change to the client/ directory and run `npm start` to load the user interface webpage. By default this will run on your local machine on port 3000 so in a browser you can access it by going to http://localhost:3000 if npm doesn't automatically launch your default browser.

## Explanation of the software license

This project is licensed under the GNU General Public License v3.0 (GPL-3), which is a widely used free software license. The GPL-3 license significantly differs from permissive licenses like MIT or BSD. Here are the key points you should understand about GPL-3:

### Freedom to Use and Redistribute

- **Use for Any Purpose**: You are free to use this software for any purpose, including commercially or for educational reasons.
- **Redistribution**: You can redistribute this software and any modifications or derivative works to anyone, under the same license. This redistribution can be done free of charge or for a fee.

### Source Code Distribution

- **Access to Source Code**: When you redistribute this software, either in its original form or as modified by you, you are required to provide access to the source code.
- **Share-Alike**: Any modifications or derivative works based on this software must also be released under the same GPL-3 license. This ensures that all modifications remain open-source and accessible to the community.

### Implications

- **Community Contributions**: This licensing model encourages a community of sharing and transparency, where improvements to the software are shared with all users.
- **Ensuring Freedom**: The GPL-3 license is designed to make sure that the software remains free for all its users, preventing proprietary use of open-source software.

### Why GPL-3?

We have chosen GPL-3 to ensure that every user can benefit from the freedoms that it provides, not just today but also in the future. It helps keep the software free and open, ensuring that the community can always access, modify, and distribute it.

### Further Reading

For more detailed information about the GNU General Public License v3.0, please visit the [official GPL-3.0 page](https://www.gnu.org/licenses/gpl-3.0.html).
