# Survivor Fitness App! 

## Node Modules
Before doing anything, you need to install necessary node_modules, which are javascript libraries. To do this, we use a package manager called npm. To use npm, download it [here](https://www.npmjs.com/get-npm), navigate into the ClimateChangeApp directory and run `npm install`. 

## Expo setup

Expo is a tool we use to generate builds for our apps. This repo already includes the files needed for an expo app, so building the application should be relatively simple.
* Download the Expo Development Client (can use mobile or desktop app), as well as the Expo Command Line Environment (Expo CLI). Instructions for both [here](https://expo.io/tools#cli)
* Making sure you have already run `npm install`, run `expo start` and your expo app should begin the build process.
* To view your app, open the Expo Development Client App and follow the instructions.

To create an expo app from scratch, see [this guide](https://docs.expo.io/get-started/create-a-new-app/). 
## Running backend
1. Download https://docs.docker.com/get-docker/ and open docker on machine. c
2. Clone repo https://github.com/i1uxaermakov/survivorfitness-backend-api and navigate on terminal to repo folder
3. Run docker-compose up --detach
4. Containers should be running on localhost:8080 – open http://localhost:8080/swagger-ui/#/ to see available API services.
5. To close, run docker-compose down --remove-orphans

## Looking at the Code
1. Begin first by going through App.js and the files in the Pages/ folder. This should give you a general idea of the project structure.
2. Each of these pages represents a screen, and utilizes "child components". After you understand how the page screens work, take a look at some of the components, which hold blocks of reusable code for things like buttons, sliders, etc. 
