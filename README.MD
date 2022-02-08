# General Description

## General Parts

Sinple decription for init and run this app.

## Start App

For start this aplication, please review the package.json and run
npm install, after of this run npm start for init the integrated server.

## How to start in development mode

First follow the before steps and create an postgres database,
create a config.env file with the name of enviroments variables, pelase view the followin
enviroment file example (copy and paste this in an new .env file with the name config.env):

!! Before to copy, Delete all comments:

<!-- # App Method -->

NODE_ENV=development

<!-- # server port -->

PORT=8700

<!-- # !Database development -->

DB=
DB_PASS=
DB_USER=
DB_PORT=5432
DB_HOST=127.0.0.1

<!-- # !Database production -->

DB_P_USER=
DB_P_PASS=
DB_P_DB=
DB_P_HOST=

<!-- # jwt token pass -->

JWT_SECRET=
JWT_EXPIRES=
JWT_COOKIE_EXPIRES_IN=
JWT_EXPIRES_TOKEN=

<!-- # Node Mailer Credentials #Mailtrap.com -->

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

<!-- # Production email Credentials #Sendgrid.com -->

MAIL_P_HOST=
MAIL_P_PORT=
MAIL_P_USER=
MAIL_P_PASS=

## Important

!! follow me and contact
