###      Overview

The Contact List Interface is a responsive web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of contacts. This application integrates a clean, intuitive design using Material-UI (MUI) components, enhanced interactivity with Toast notifications, and persistent data storage with localStorage. A public API (https://jsonplaceholder.typicode.com/users) is used to prepopulate initial contact data.



###      Features


1. CRUD Operations: Add, edit, and delete contact entries.
2. Search and Sort: Search for contacts by name, email, or phone and sort by various fields (name, email, 
   phone) in ascending or descending order.   
3. Dynamic Dialogs: Modals for adding, editing, and deleting contacts.
4. Responsive UI: Optimized for different screen sizes.
5. Persistent Data: Contacts are saved to localStorage for maintaining state across page refreshes.
6. Error Validation: Inline form validation for contact fields.
7. Enhanced UX: Toast notifications for feedback on actions.




###  Design Choices

# Frameworks and Libraries

1. React: The application is built using React, leveraging its component-based architecture for modularity   
   and scalability.
2. Material-UI (MUI): Provides pre-styled and customizable UI components such as tables, dialogs, buttons, 
   and forms to ensure a professional and consistent look.
3. React Toastify: Used for non-intrusive toast notifications to enhance user feedback.
4. CSS Modules: Custom styling for unique visual requirements.



###     To set up react in local system and run instructions

   1. First you need to download and install the node into local system(https://nodejs.org/en/)    
   2. Second you also need to check whether the npm got installed or not by command [npm -v]
        Usually it get installed along with the node.
   3. There is no need for separate installation of react if we download node then automatically the react   
       gets downloaded and installed.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

==> Command is `npx create-react-app Table2app`



# In the project directory, you can run:

==> command is `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### To deploy code you can run this in your terminal

==>  Command is  `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



### Public APIs and CRUD Implementation

The application uses the JSONPlaceholder API to fetch initial contact data.
Read: Fetches user data on initial load using fetch API.
Create/Update/Delete: Data changes are saved in the component's state and persisted using localStorage.
Local data manipulation is implemented to avoid directly modifying the external API data while maintaining the flexibility to integrate a real backend.


### Enhancing UX

1. Loading Spinner: A circular progress indicator is displayed while fetching contact data.
2. Form Validation: Inline validation for name, email, and phone fields ensures data integrity.
3. Search and Sort: Dynamic filtering and sorting enhance the user's ability to manage a large number of 
   contacts.
4. Dialog Modals: Used for intuitive and isolated add/edit/delete interactions.


### Descrition of function implementation 


# Utilizing Public APIs for CRUD Operations and Enhancing UX

1. Public API Integration
The application utilizes the JSONPlaceholder API (https://jsonplaceholder.typicode.com/users) to prepopulate the initial contact list. Here's how it works:

2. Fetching Data (Read Operation):
On initial load, a fetch request retrieves user data from the API.
If the data is successfully retrieved, it is saved in the application's state and cached in localStorage to ensure persistence across sessions.
If the data fails to load, an error message is displayed using toast notifications, enhancing user feedback.
Handling Local Storage:

After fetching the data, the application relies on localStorage to perform all subsequent CRUD operations locally. This ensures smooth offline operations and fast updates without additional network requests.
Local CRUD Operations
Since the API is read-only, the following operations are implemented locally:

Create:
New contacts are added to the state, assigned a unique ID, and immediately updated in localStorage.
A modal dialog is used for adding new contacts, and a success notification is displayed upon saving.

Update:
Existing contacts can be edited via a modal dialog. Changes are applied to the state and persisted in localStorage.
The form includes inline validation to ensure valid input before saving.

Delete:
Contacts can be removed via a delete confirmation dialog.
Once confirmed, the contact is removed from the state and updated in localStorage.
A toast notification provides feedback on successful deletion.

# Features Enhancing User Experience (UX)

Persistent Data:
Data fetched from the API is cached in localStorage, ensuring the list is available even after page refreshes.

Dynamic Search and Sort:
Users can search contacts by name, email, or phone using a responsive search bar.
Sorting options (by name, email, or phone) in ascending or descending order provide better control over data presentation.

Validation and Error Handling:
Inline form validation prevents invalid data submission, with error messages displayed below input fields.
Errors during data fetching or form submission trigger toast notifications for user clarity.

Responsive Design:
The application is fully responsive, ensuring usability across devices of different sizes.
Feedback with Toast Notifications:

Non-intrusive toast messages confirm successful actions like adding, editing, and deleting contacts or display errors when actions fail.

By combining API integration, efficient state management, and thoughtful UI/UX enhancements, the application provides a seamless experience for managing contacts.


"# TableWebApp" 
