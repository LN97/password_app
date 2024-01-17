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
 * we need to implement a db.
 * we need to setup the prisma orm.
 * we need to add and go through clerk authentication.
    * client and server authorisation and page / action restriction.
 * we need to setup 