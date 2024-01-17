import DataDisplay from "./components/displayData"

// we annot use react function like useState or useEffect in this page. because react is client side. this is server-side.
async function getData() {
    const res = await fetch('http://localhost:3000/api/hello')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
 }
 
  
export default async function AboutPage ( ) {

    // can mix our auth with our frontend render because this is done on the server side.

    // server side api call. its invoked before the user even sees the page render.
    const data = await getData()

    // useEffect
        // await getData to my useState in order to render, edit and delete. atm, we just render.

    return (
        <div>
            about page
            <DataDisplay initialstate={ data.message } />
        </div>
    )
}