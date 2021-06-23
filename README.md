
# [You Are What You Eat &#8211; A Diet and Meal Planning App](https://cascade-app.herokuapp.com/)

## Table of Contents
  - [About](#about)
  - [Getting Started](#getting-started)
     - [Online Demo](#online-demo)
     - [Local Installation](#local-installation)
   - [Usage](#usage)
     - [Library](#library)
     - [Menu](#menu)
     - [Shopping List](#shopping list)
   - [Footnotes](#footnotes)

## About

You-Are-What-You-Eat is a React application designed to streamline diet and menu planning tasks. Once a profile is created, users can browse a community library of recipes, add their own recipes, "favorite" recipes, build menus, and export shopping lists. Grocery shopping has always been my least favorite chore. Finding healthy recipes that work for me and help me meet my goals, and compiling ingredients into a shopping list is monotonous and takes time - so I automated it!

This app was built using React, RESTful APIs via [json-server](https://github.com/typicode/json-server), [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), and styled with [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

## Getting Started

### Online Demo

A working demo is available on Heroku<sup id="a1">[1](#f1)</sup> at [https://you-are-what-you-eat.herokuapp.com/](https://you-are-what-you-eat.herokuapp.com/).

Register a new account<sup id="a2">[2](#f2)</sup> or use the email address `test@test.com` to login and browse the app.

### Local Installation

1.  Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
    - If Node.js and npm are already installed, use `node -v && npm -v` to check the version and verify that both versions are `v10.24.1` & `6.14.13` or greater.
    - If the version is older than the minimum requirement, update to the latest stable version of [node](https://docs.npmjs.com/try-the-latest-stable-version-of-node) & [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
2. Use [https or SSH](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line) to clone the project folder to a local directory:
    ```Bash
    $ git clone ...
    ```
3. From the cloned project directory:
    ```Bash
    $ npm install
    ```
4. Install the JSON Server node package:
    ```Bash
    $ npm install -g json-server
    ```
5. Navigate ⬆ up from the cloned project one directory level, create a new directory and copy the default database.json file:
    ```Bash
    $ cd .. && mkdir ./database && cp ../you-are-what-you-eat/api-base/database.json ./database
    ```
6. Move to the database directory and launch JSON Server:
    ```Bash
    $ cd ./database && json-server --watch default-entries.json --port 8088
    ```
7.  Use your preferred code editor to find & replace the string `https://you-are-what-you-eat.herokuapp.com/` with `http://localhost:8088/` in the following files:
    - `./src/components/auth/Login.js`
    - `./src/components/auth/Register.js`
    - `./src/components/favorites/FavoritesProvider.js`
8. From the project root directory, run the following:
    ```Bash
    $ npm start
    ```
9. Once the app loads in the browser, click the Register tab to sign up for a new account and login.

## Usage

You Are What You Eat is comprised of three sections:
- Library
- Menu
- Shopping List

### Library
Library provides a list of recipes available from the community of users. These recipes can be "Favorited" to be saved to your personal recipe library, which is displayed on the right side of the screen. The list of personal favorites is used in the Menu form to provide a more succint set of options to the user.

### Menu
The Menu view allows the user to build a new menu using a drag and drop UI. Users can also select a previously saved menu from the list on the right side of the page to make small edits to existing menus.

## Shopping List
The shopping list view displays a compiled list of ingredients based on a user selected menu from a list of saved menus on the right side of the page. The list is broken up into major sections of modern grocers for added convenience.

---

## Footnotes
- <b id="f1">[1]</b> Heroku will periodically cycle apps into a [sleep state](https://blog.heroku.com/app_sleeping_on_heroku), please allow an additional moment on first load.  [↩](#a1)
- <b id="f2">[2]</b> Heroku will reset the `json-server` database to its default state from time to time, expect all demo account data to be removed.  [↩](#a2)
