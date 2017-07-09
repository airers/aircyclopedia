# Setting up for production

Follow the same steps, but use a different database, change the config accordingly, then use `node run npm:prod`

```bash
apt-get install -y Nginx
npm install -g forever
```

## Clone the repo

```bash
git clone git@github.com:airers/aircyclopedia.git
```

Do the stuff mentioned in the other readme till the server is running

## Set up nginx
While the server is running in another terminal, open a new terminal and do the following.

```bash
cd ~/aircyclopedia

Set up nginx and the aircyclopedia config
ln -s $(pwd)/production/nginx-config /etc/nginx/sites-enabled/aircyclopedia
rm /etc/nginx/sites-enabled/default

# Ensure the file exists
ls -la /etc/nginx/sites-enabled/
tail /etc/nginx/sites-enabled/aircyclopedia

sudo systemctl restart nginx
```

Check the site, it should give you the welcome message.

## Setup postgres

Follow instructions in other readme

```bash
# You may have to log in as the postgres user to do this
ALTER USER air WITH PASSWORD 'XXXXXXXXXXX';
```

```bash
# Run this to migrate as production
NODE_ENV=production sequelize db:migrate
```
## Deploy the application

cd ~/aircyclopedia/webapp

forever start -c "npm run start:prod" .