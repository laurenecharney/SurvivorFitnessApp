# Survivor Fitness App! 

## Node Modules
Before doing anything, you need to install necessary node_modules, which are javascript libraries. To do this, we use a package manager called npm. To use npm, download it [here](https://www.npmjs.com/get-npm), navigate into the ClimateChangeApp directory and run `npm install`. 

## Expo setup

Expo is a tool we use to generate builds for our apps. This repo already includes the files needed for an expo app, so building the application should be relatively simple.
* Download the Expo Development Client (can use mobile or desktop app), as well as the Expo Command Line Environment (Expo CLI). Instructions for both [here](https://expo.io/tools#cli)
* Making sure you have already run `npm install`, run `expo start` and your expo app should begin the build process.
* To view your app, open the Expo Development Client App and follow the instructions.

To create an expo app from scratch, see [this guide](https://docs.expo.io/get-started/create-a-new-app/). 

## Looking at the Code
1. Begin first by going through App.js and the files in the Pages/ folder. This should give you a general idea of the project structure.
2. Each of these pages represents a screen, and utilizes "child components". After you understand how the page screens work, take a look at some of the components, which hold blocks of reusable code for things like buttons, sliders, etc. 

## Running backend
To run the backend on your computer, you need to do several things:
1. Install Docker: https://docs.docker.com/get-docker/
2. Download the following file:
https://github.com/i1uxaermakov/survivorfitness-backend-api/blob/master/docker-compose.yml
3. Navigate to the folder that has the file you downloaded in the terminal (if you are on mac) or command line (if you are on windows), and run the following command in your terminal:
docker-compose up --detach   
    Now, the application should be accessible on localhost:8080. Go to localhost:8080/swagger-ui to see docs.

4. When finished, run docker-compose down to shut the application down.

## Using/testing the app with backend 
1. Update this line with your local IP address: https://github.com/laurenecharney/SurvivorFitnessApp/blob/605e08a6b4950dbad2c0569f6f81d9da8a06bcaf/APIServices/APIUtilities.js#L6 (on Mac, WiFi > Network Preferences should show IP address)
2. You can use swagger to look at what requests/responses will be formatted as, and use Postman to make sample calls (which requires authorization)

List of demo users: https://github.com/i1uxaermakov/survivorfitness-backend-api/blob/master/src/main/java/com/changeplusplus/survivorfitness/backendapi/application/DemoData.java

The first dietitian/location admin declared of any location =  location admin


Super Admin: 
theo.justin@gmail.olala / passwordTheo

Location Admin for Trainer Gym: nikitha.shantel@gmail.olala / passwordNikitha

Location Admin for Dietitian Office: sri.karolyn@gmail.olala / passwordSri


Default Trainer: Marciana.Magne@gmail.olala / passwordMarciana

Default Dietitian: Kapil.Mirjami@gmail.olala / passwordKapil

