# Aircyclopedia

## Overview

This is the server element of the aires project. 

### Stack

- nodejs (express)
- postgresql (database)
- sequelize (ORM)



## VM Development Setup

This readme is not yet complete, so here are some tutorial links to get you started

**Prerequisites**
1. You need vagrant installed.

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
```
#!/bin/sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install --lts=boron
```

We will now check if the port forwarding works. The database is not installed yet but we will worry about that later.

```
cd webapp
npm install
npm run start:dev
```

Now try to visit `localhost:3000`. If you see a message similar to this, it is working.
```
{"message":"Welcome to aircyclopedia","version":"v a0.0.1"}
```

### Installing postgresql


### Initialising the database


### Trying the app again