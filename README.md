
# # MovSera - The Movies/Series Search App

## Overview

**MovSera** is a web-based application designed to provide users with a comprehensive platform to explore movies and TV shows. Built using React, Vite, Chakra UI, and Firebase, the app allows users to browse trending titles, search for specific movies or series, and view detailed information, including trailers, related videos, cast members and their character. MovSera integrates Google authentication for secure login and account management, enabling users to sign up, log in, log out, and even delete their accounts. Users can also curate a personalized watchlist of their favorite movies and shows, stored using Firebase Firestore. The application leverages the TMDB API to fetch real-time data about movies and TV shows. Additionally, MovSera offers a dark mode/light mode feature, allowing users to switch between themes for a personalized viewing experience. This makes MovSera a versatile and user-friendly platform for entertainment enthusiasts.

## How to Use

**1] Clone the Repository:** Start by cloning the repository to your local machine.
```bash
 git clone https://github.com/HarshMaurya04/MovSera-The_Movie_App.git
 cd MovSera-The_Movie_App
``` 

**2] Install Dependencies:** Make sure you have Node.js and npm installed. Then, run:
```bash 
 npm install
``` 

**3] Set up Firebase:** 
- Go to Firebase Console, create a new project, and enable Firebase Authentication (Google).
- Set up Firestore for saving watchlists.
- Add your Firebase config to the firebase.js file inside the services folder.

**4] Get TMDB API Key:** 
- Visit TMDB, create an account, and generate your API key.
- Add your API key to the api.js file inside the services folder.

**5]  Run the application:** Start the development server:
```bash 
 npm run dev
``` 
Open your browser and go to localhost.


## Technical Details

- **React + Vite:** Frontend framework for building the UI.
- **Chakra UI:** For component styling and responsiveness.
- **Firebase:** For user authentication (Google sign-in) and managing the watchlist in Firestore.
- **TMDB API:** Fetching movie and TV show details, trailers, and cast information.
- **JavaScript:** Core language for the logic and interactions.
- **CSS Modules:** Used for component-level styling.

## Project Structure

``` bash
src
├── component_css
│   ├── Card.module.css
│   ├── Footer.css
│   ├── Login.Module.css
│   ├── Navbar.Module.css
│   ├── Pagination.module.css
│   └── Signup.module.css
│   └── WatchlistCard.module.css
├── components
│   ├── routes
│   │   └── Protected.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── UserLogin.jsx
│   ├── UserSignUp.jsx
│   ├── Video.jsx
│   └── WatchlistCard.jsx
├── context
│   ├── AuthProvider.jsx
│   └── uiseAuth.js
├── page_css
│   ├── Movies.module.css
│   ├── Search.module.css
│   └── Shows.module.css
├── pages
│   ├── movies
│   │   └── Movies.jsx
│   ├── search
│   │   └── Search.jsx
│   ├── shows
│   │   └── Shows.jsx
│   ├── Details.jsx
│   ├── Home.jsx
│   └── Watchlist.jsx
├── services
│   ├── api.js
│   ├── firebase.js
│   └── firestore.js
├── utils
│   └── helper.js
├── App.jsx
├── main.jsx
└── theme.js

```
