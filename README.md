Thea Caplan
Link: https://a2-tcaplan.glitch.me

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
Due: September 11th, by 11:59 AM.
===

## College Schedule Maker
This application is a class schedule maker that allows users to input their classes and view a table representation of the class schedule by day. Users can add, remove, and modify classes as desired. It is a single-page application that shows the current status of the server (stored data) at all times. CSS grid positioning was used to format the application.

The application includes the use of HTML, CSS, JavaScript, and Node.js functionality, with active communication between the client and the server over the life of a user session.

My tabular dataset:
An object array of class information, where each class has:
1. Name (required)
2. Class Code (optional)
3. Start Time (required)
4. End Time (required)
5. Days the class meets (at least 1 required)
6. Length of the class (derived)

## Technical Achievements
**Created a Single-Page App**: The application is a one page application where the dataset stored in the server is updated in real time whenever a change is made to the dataset (submitting, removing, or modifying data)

**Modification Of Data Enabled**: Along with adding and removing data from the server, users are allowed to modify existing data through the modification form.

## Design/Evaluation Achievements
**Think-Aloud Protocol**: Ran 2 think-alouds to test the design of the website.

Prompt: Add 2 of your classes to the schedule, then modify 1 class to have class on a Sunday.

Student 1:
1. Last Name: Logan
2. Problems: Didn't see the classes in the schedule before adding, so having 2 classes with the same name was confusing.
3. Surprising Comments: Liked the words at the box line for labeling
4. Changes based on feedback: Expected the classes to be organized positionally by time rather than just sorted. (Would have implemented with more time :( )

Student 2: 
1. Last Name: Chang
2. Problems: The dropdowns needed a second click to update the data shown. (Bug fixed in final submission)
3. Surprising Comments: Liked the labels, described the form layouts as intuitive
4. Changes based on feedback: Fix the dropdown second click bug. (Bug was only noticed when using arrow keys, fixed in final submission)

## Baseline Requirements
---
- a `Server` (ADDED)
- a `Results` functionality (ADDED)
- a `Form/Entry` functionality (ADDED)
- a `Server Logic` (ADDED)
- the `Derived field` (ADDED)

Your application is required to demonstrate the use of the following concepts:

HTML:
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms) (ADDED (3 forms for adding, removal, and modifying) (text, time, select, and checkbox inputs))
- A results page displaying all data currently available on the server. (ADDED (single page app - data showed in table))
- All pages should [validate](https://validator.w3.org) (PAGE VALIDATES)
- If your app contains multple pages, they should all be accessible from the homepage (index.html) (NOT INCLUDED - using a single page application - no navigation neccessary)

CSS:
- CSS styling of the primary visual elements in the application
        The forms are boxed in and organized to be readable.
        The data table that shows all the information in the dataset is colored with alternating row colors for readability. 
- Various CSS Selector functionality must be demonstrated:
    - Element selectors (body, header, main, td, fieldset label, section, article, h3, h2)
    - ID selectors (singleClassDisplay, leftContent, rightContent)
    - Class selectors (grid-item, grid-container, left, right, column)
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid or flexbox for layout (ADDED - using grid)
    - Rules defining fonts for all text used; no default fonts! (ADDED - using courier)

- CSS defined in a maintainable, readable form, in external stylesheets (1 CSS file)

JavaScript:
- front-end JavaScript to get / fetch data from the server (ADDED)

Node.js:
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. (ADDED)