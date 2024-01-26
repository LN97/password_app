export async function FETCH_getAllPasswords ( ) {
    // we annot use react function like useState or useEffect in this page. because react is client side. this is server-side.
    const res = await fetch('http://localhost:3000/api/hello', { cache: 'force-cache' } )
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
}