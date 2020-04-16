# Tracker-19

Tracker19 is a COVID-19 tracker that scrapes data periodically to update a database with global information regarding the virus.

## Clone Repo

> Clone the repository as by running the following command

`git clone https://github.com/nikhilpothuru/Tracker19.git`

## Initialization

> Run the following command to install dependencies

`npm init`

> After cloning the repo, go to the config folder and rename "config.env.env" to "config.env". Add your MongoDB connection string.

## Running Application

```
# Run in development mode
npm run dev

# Run in production mode
npm start
```

The server.js file has a CRON job set up to run the Python web scrappers that scrape web data related to COVID 19. As of right now, they are set to run every 12 hours.

## Delete Database Data

> Run the following scripts to delete data from your database

```
# Deletes data from all collections except the WHO collection
node seeder -d

# Delete data from the WHO collection
node seederWHO -d

```
