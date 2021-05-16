# Evaluate a New Article with Natural language processing

## Overview
This project uses node and express alongside webpack to create a webapp that uses the meaning cloud API to analyze urls and show the resuls fo the analysis dynamically.

## How to use
After cloning, run `npm install`, then run `npm run build-prod` on a terminal and finally `npm run start`. You can use the app on localhost:8081. If you wish to run in development mode keep the server running and in a separate terminal run `npm run build-dev` and use port 8080.

## Hiearchy
*   src
    *   client
        *   __ test __
            *   testURl.spec.js
            *   testClient.spec.js
        *   js
            *   checkURL.js
        *   styles
            *   style.scss
        * views
           *  index.html
        * index.js
      *  server 
         *  index.js
*  .bablrc
*  .env
*  package-lock.josn
*  package.json
*  README.md
*  webpack.dev.js
*  webpack.prod.js