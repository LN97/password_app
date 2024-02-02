'use client'
import { Table,TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableRown  } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { fetchpasswords, addPassword } from "./actions";
import Slideover from "@/components/tailwind/slideOver";
import { Input } from "@/components/ui/input";

// // primitve ( can copy i believe ... )
// let number = 5;
// let secondNum = number;
// secondNum + 5;

// // object reference ( keeps reference to obj last assigned to ... )
// let obj1 = { 
//     name: 'brad'
// }

// let obj2 = obj1.name;
// obj2.name = 'simon';


function AddPasword ( { updatePasswordsState } ) {
    const [ createPassword , togglePasswordSlidable ] = useState( false );
    const [ categoryDisplay , setCategoryDisplay ] = useState( false );
    const [ categories , setCategories ] = useState( [ 
        'tv' , 'film'
    ] );
    const [ newCategoryState , setNewCategory ] = useState('');

    const addToCategories = ( ) => {
        // deep copying vs shallow copying in js.
        // in order to alter a state, you need to deep copy the state. then you can alter this.
        let categoriesCopy = [ ...categories ];
        categoriesCopy.push( newCategoryState );
        setCategories( categoriesCopy );
        setNewCategory('');
    }

    const handleSubmit = async ( event ) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        try {
            // Call addPassword function with form data
            const userAdded = await addPassword(categories, formProps);
            console.log('Form submission response:', userAdded );
            updatePasswordsState( userAdded );
            togglePasswordSlidable( false );
        } 
        catch (error) {
            console.error('Error submitting form:', error);
            // Handle error here (e.g., display an error message)
        }
    }

    return (
        <>
            <Button onClick={ () => togglePasswordSlidable( true )}> Generate new Password </Button>    
            <Slideover state={ createPassword } action={ togglePasswordSlidable }>
               <form onSubmit={ handleSubmit }>
                    Add a password.
                    <Input type="text" name="username"    placeholder={'username'} />
                    <Input type="text" name="password"    placeholder={'password'} />
                    <Input type="text" name="websiteName" placeholder={'website name'} />
                    <Input type="text" name="websiteUrl"  placeholder={'website url'} />

                    { categories.map( ( category ) => 
                        <Button variant="outline"> { category } </Button>
                    )}
                    { categoryDisplay ? (
                       <>
                            <Input type="text" placeholder="add a category" value={ newCategoryState } onChange={ ( e ) => setNewCategory(e.target.value )} />
                            <Button onClick={ () => addToCategories() }> add </Button>
                       </> 
                    ) : (
                        null
                    )}
                    <div onClick={ () => setCategoryDisplay( !categoryDisplay )}> Add a collection </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Slideover>
        </>
    )
}

export default function PasswordsTable ( ) {
    const [ passwords , setPasswords ] = useState([]);

    const updatePasswordState = ( state ) => {
        let passwordsCopy = [...passwords ];
        passwordsCopy.push( state );
        setPasswords( passwordsCopy )
    }
  
    useEffect( ( ) => {
        fetchpasswords()
            .then( ( passwords ) => {
                console.log( 'passwords fetched:' , passwords );
                setPasswords( passwords );
            })
            .catch( err => console.log( err ))
    }, [ ] );

    return (
        <>   
            <AddPasword updatePasswordsState={ updatePasswordState } />
            <Table>
                <TableCaption>A List of your used Passwords </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Used In:  </TableHead>
                        <TableHead> Username </TableHead>
                        <TableHead> Password </TableHead>
                        <TableHead> Last used </TableHead>
                        <TableHead> Status </TableHead>
                        <TableHead className="text-right"> Category </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { passwords.map( ( each , index ) => 
                        <TableRow key={ index }>
                            <TableCell className="font-medium">
                               { each.associated.websiteName }
                            </TableCell>

                            <TableCell>
                                { each.username }
                            </TableCell>
                         
                            <TableCell className="text-right">
                                show password
                            </TableCell>   

                            <TableCell>
                               last used
                            </TableCell>
                            
                            <TableCell className="text-right">
                                <Button className={ `${ each.status ? 'bg-blue-900' : 'bg-red-800'}` }> { each.status ? 'active' : 'inactive'} </Button>
                            </TableCell>
                            
                            <TableCell className="text-right">
                                { each.categoryIds.map( ( category , index ) => 
                                    <Button key={ index } variant="outline"> { category } </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}