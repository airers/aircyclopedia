# Setting up for production

Follow the same steps, but use a different database, change the config accordingly, then use `node run npm:prod`

Install nginx and set up the configurations
apt-get install -y Nginx

git clone git@github.com:airers/aircyclopedia.git

cd aircyclopedia/webapp

Set up nginx and the aircyclopedia config
cp production/
ln -s /production/nginx-config /etc/nginx/sites-enabled/aircyclopedia
rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

npm install -g forever

forever start -c "npm run start:prod" .