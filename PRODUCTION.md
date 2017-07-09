# Setting up for production

Follow the same steps, but use a different database, change the config accordingly, then use `node run npm:prod`

Install nginx and set up the configurations

npm install -g forever

forever start -c "npm run start:prod" .