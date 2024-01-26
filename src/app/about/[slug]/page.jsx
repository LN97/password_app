// /blogs/12345
// /blogs/[slug]

// params.



export default function Page({ params }) {
    // server side actions like db calls but its still baked in with react.
    // prisma call directly and asign to var.
    return (
        <div>
            My Post: {params.slug}
        </div>
    )
}


/*
    in express
    app.get('/blogs/:slug', ( req , res ) => {
        const { slug } = req.params.
        // data fetching to db.
    })
*/