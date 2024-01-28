# Password project

## stack 

* NextJs v13 App beta ( [https://nextjs.org/docs/app/building-your-application/routing/defining-routes] )
* Prisma ORM ( how we interact with our db )
* SQL Lite or PostgreSQL DB.
* Tailwind styling.
    * ShadCDN component library for react and tailwind [https://ui.shadcn.com/docs/components/]
    * Darkmode feature.
* Clerk Authentication service ( Hosted as a PaaS ).

## Getting Started

First, run the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with the browser.

nextJs
    * page rouing using their server. 
        * client side on rendering. When you want a component to have user functionality using just react. so no server rendering of this takes place, even if rendered inside of a nextJs server rendered page.
    * creating and using api endoints built within the pages/api folder (how you interact with your db and server functions )

what else to learn
 * [x] we need to implement a db.
 * [x] we need to setup the prisma orm.
 * [x] we need to add shadcn component library.
 * [x] we need to add and go through clerk authentication.
 * [] we need to look at clerk page authorisation. 

 ## setup

### .env
 1. create .env file.
 | variable | description | example |
 |----------|-------------|---------|
 | DATABASE_URL | for db  | '
DATABASE_URL=mongodb+srv://{username}:uJw2Ds98qAddkSMG@{cluster}.1sxfvwd.mongodb.net/{dbName}?retryWrites=true&w=majority"

DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY"
 
 ### db setup.
 1. go to atlas.
 2. copy the secret and paste into .env as DATABASE_URL. make sure to have the db name, username and password embedded.

 ### clerk
 1. go to website clerk 
 2. sign up and add authentication methods. 
 3. select nextjs as the framework.
 4. copy env variables to .env