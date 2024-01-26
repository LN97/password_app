import { getAllPasswords } from "@/db_queries/passwords/query.password";

export default async function handler(req, res) {
    try {
      let passwords = await getAllPasswords();
      res.status(200).json({ data: passwords });
    } 
    catch ( err ) {
      res.status(500).json({ msg: 'could not query db. error' });
      // throw err;
    }
 }