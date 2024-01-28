'use client'
import { Table,TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableRown  } from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react';
import { fetchpasswords } from "./actions";

export default function PasswordsTable ( ) {
    const [ passwords , setPasswords ] = useState([]);


    useEffect( ( ) => {
        fetchpasswords()
            .then( ( passwords ) => {
                console.log( passwords );
            })
            .catch( err => console.log( err ))
    }, [ ] );

    return (
        <>   
            <Button>Button</Button> 
            <Table>
                <TableCaption>A List of your used Passwords </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Password Name </TableHead>
                        <TableHead> Status </TableHead>
                        <TableHead> Last used </TableHead>
                        <TableHead className="text-right"> Category </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}