# SAMHDR

Welcome to SAMHDR, a card game that is currently in developement and will eventually be hosted online so you can face players anywhere!

## Launching SAMHDR through the Development App

SAMHDR was developed in JavaScript with a React front-end and a Node.JS back-end. To run this app locally you will need to have React, Node.JS, and Socket.IO installed on your system. You will also need the SAMHDR Server application found here: [SAMHDR Sever Repository](https://github.com/chrisdemonte/Samhdr-Server).

To run SAMHDR you will first need to run the server. This can be done using the command `node Server.js` in your terminal while you are in the server's file directory, or in the terminal if you have the server open in an IDE. The server runs on localhost:22222.

Next you can launch the SAMHDR application itself. Run the command `npm start` in the terminal at the SAMHDR file directory or open the folder in an IDE and run the command in the IDE's terminal. The app runs on a React developement server at localhost:3000.

In this early stage of development you can play against yourself by openning two browsers on localhost:3000. Each instance of the app opens its own client session that connects to the server.

## Playing SAMHDR

In the SAMHDR app, click the "Start Game" button in the navbar. 

You start by entering your name and building your deck. There are six suits: Swords, Arrows, Magic, Healing, Defense, and Resistance. Like regular playing cards, each suit has 13 cards: 1 - 10, Jack, Queen, King. To learn more about the suits and the rules of the game click the "How to play" button in the app's navbar. 

Once you entered your player data, you enter a Player room. You can see all players who are connected to the server, and you can send and recieve challenges.

## Known Bugs

-Please report any bugs to Samhdr's [issue page](https://github.com/chrisdemonte/Sahmdr/issues) or send an email to [samhdr.game@gmail.com](samhdr.game@gmail.com) for any other comments or issues. 

## Version History

1/19/2023: Developement phase one. Implemented the landing page, how to play page, deck creation page, server room, and card game. Implemented the backend server. As of now the game is still private. Phase two is deployment and server security before a public release.

# More about React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
