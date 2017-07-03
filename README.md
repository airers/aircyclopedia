# Aircyclopedia

## Overview

This is the server element of the aires project. 

### Stack

- nodejs (express)
- postgresql (database)
- sequelize (ORM)


# Setup on Development device
### VirtualBox 

Used for the virtual machine which the development will be on

**Homebrew**
```bash
brew cask install virtualbox
brew cask install vagrant
```

**Ubuntu (apt-get)**
```bash
sudo apt-get install virtualbox
sudo apt-get install vagrant
```

**Windows (or if the above fails)**

Links for
[Virtualbox](https://www.virtualbox.org/wiki/Downloads)
and
[Vagrant](https://www.vagrantup.com/downloads.html)


### Postman

Useful for testing API functionality
https://www.getpostman.com/apps


# VM Development Setup

This readme is not yet complete, so here are some tutorial links to get you started

### Staring the VM

After cloning the repo, `cd aircyclopedia` to get into the root of the repo.

There are two main folders, `vagrant` and `webapp`.

- `vagrant` contains the VM configuration for development purposes.
- `webapp` is where the app code and logic goes

The vm runs on Ubuntu 16.04 LTS. It is configured to map the `webapp` folder to the `/home/ubuntu/webapp` folder on the guest machine.

It also maps the VM port to your localhost port 3000.

**Start the VM**

```bash
cd vagrant
vagrant up
```

### Testing the VM

**Start Node**

Note: This is meant to be automated in the future (hopefully)

First, SSH into the VM. `vagrant ssh`

Now that you are in the VM, run these commands. (one at a time)
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install --lts=boron
nvm set default lts/boron
npm install -g sequelize-cli
```

We will now check if the port forwarding works. The database is not installed yet but we will worry about that later.

```bash
cd webapp
npm install
npm run start:dev
```

Now try to visit `localhost:3000`. If you see a message similar to this, it is working.

```
{"message":"Welcome to aircyclopedia","version":"v a0.0.1"}
```

### Installing Postgres
[Installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04#connect-to-postgres-with-the-new-user).
[Setup help](https://www.cyberciti.biz/faq/howto-add-postgresql-user-account).
You'll need to create [a user](https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line).

This assumes you are already ssh'd into the VM
```sh
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

sudo -i -u postgres # Login to the postgres user

createuser -s air # We'll create a user for accessing the db
createuser -s ubuntu # Let the root user be a superuser
# Note: Check the name of your root user first by typing whoami before logging in as the postgres user
createdb air-dev

exit # Logoff the postgres user

# Optional: Check if db works
psql -d air-dev

# To quit type \q

```

## WARNING: Unverified instructions



Run migrations:
```sh
sequelize db:migrate
```
> Note: This will discover the migrations in our migrations folder and execute them. If you try running the same command again, it would not execute any migrations since it's clever enough to know that all of the current migrations have been executed.


You'll need to create [a user](https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line), a database and modify the `server/config/config.json` file with your own db config (remember to remove the file from the repo before placing any sensitive info).
```sh
$ sudo -i -u postgres
$ createuser --interactive ## Create a postgres user. If your default user is 'ubuntu', create a postgres user with the same name.
$ psql
$ createdb -O <user> <dbname> ## Create db with <user> as owner
```

Now you can access your db via your default user using `psql <dbname>`.

## Running the app
```sh
$ npm run start:dev
```

## Development tips
Other than `npm install`, everything should be done in the `server` folder.
### Sequelize
Create models:
```
$ sequelize model:create --name Todo --attributes title:string
````

Run migrations:
```sh
$ sequelize db:migrate
```
> Note: This will discover the migrations in our migrations folder and execute them. If you try running the same command again, it would not execute any migrations since it's clever enough to know that all of the current migrations have been executed.

### Node/express
App entry point is `app.js`, which imports a bunch of routes from `routes/index.js`, which in turn maps urls to functions exported from `controllers/index.js`.