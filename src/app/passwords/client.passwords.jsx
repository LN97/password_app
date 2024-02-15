'use client'
import { Table,TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableRown  } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from 'react';
import { fetchpasswords, addPassword, deletePasswordUserAction, changeStatusOfPasswordAction } from "./actions";
import Slideover from "@/components/tailwind/slideOver";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { generateStrongPassword, checkPasswordStrength } from "./functions/funcs.passwordUtils"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

  
// added

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

    function Password() {
        const passwordInputRef = useRef(null);
        const [passwordStrength, setPasswordStrength] = useState(0); // State to hold password strength
        
        const [ OptionpasswordStrength , OptionsSetpasswordStrength ] = useState([ 20 ])
        const [ generationOptionsDisplay , setGenerationOptionDisplay ] = useState(false);

        function handlesStrengthofPassword( value ) {
            let strenghScore = checkPasswordStrength( value ); // Check and update strength on input change
            console.log( strenghScore , typeof strenghScore )
            setPasswordStrength(strenghScore); // Update the state with the new strength score
        }

        function handleInputChange(e) {
            let inputVal = e.target.value;
            handlesStrengthofPassword( inputVal );
        }

        function handlePasswordGeneration (  strenghLength ) {
            console.log(strenghLength  )
            setGenerationOptionDisplay( true );
            let newPassword = generateStrongPassword(strenghLength );
            passwordInputRef.current.value = newPassword;
            handlesStrengthofPassword( newPassword );
        }
    
        // Define the bars with their minimum score for changing color
        const strengthBars = [
            { id: 1, minScore: 1 },
            { id: 2, minScore: 2 },
            { id: 3, minScore: 4 }, // Adjusted score for the third bar
            { id: 4, minScore: 6 }, // Adjusted score for the last bar
        ];
    
        // Tailwind color classes for different strength levels
        const strengthColors = ["bg-gray-300", "bg-red-600", "bg-red-500", "bg-green-300", "bg-green-500"];
    
        return (
            <>
                <div className="flex my-2 items-center">
                    <div className="p-2 border border-gray-300 flex-grow">
                        <input className="p-2 border-none" type="password" name="password" placeholder="password" ref={passwordInputRef}
                        onChange={handleInputChange} 
                        />
                        <p> Reveal </p>
                    </div>
                  
                    <div onClick={() => handlePasswordGeneration( OptionpasswordStrength ) } className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer">
                        Generate
                    </div>
                </div>

                { generationOptionsDisplay && (
                    <Card>
                    <CardHeader>
                      <CardTitle> Generate a Password </CardTitle>
                      <CardDescription> generate a password that includes lower case, uppercase, special characters and numbers. </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div> Length { `(${ OptionpasswordStrength})`} </div>
                        <Slider
                            min={10}
                            max={30}
                            step={1}
                            value={ OptionpasswordStrength }
                            onValueChange={ (number) => {
                                OptionsSetpasswordStrength( number );
                                handlePasswordGeneration( number);
                            }}
                        />
                    </CardContent>
                    <CardFooter>
                    <div onClick={ () => handlePasswordGeneration( OptionpasswordStrength ) } className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer">
                        Generate Another Password
                    </div>
                    </CardFooter>
                  </Card>
                )}
                
                <div className="flex mt-2">
                    {strengthBars.map((bar) => (
                        <div key={bar.id} className={`w-1/4 h-2 mx-1 ${passwordStrength >= bar.minScore ? strengthColors[bar.id] : 'bg-gray-300'}`}></div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <Button onClick={ () => togglePasswordSlidable( true )}> Generate new Password </Button>    
            <Slideover state={ createPassword } action={ togglePasswordSlidable }>
               <form onSubmit={ handleSubmit }>
                    Add a password.
                    <Input className="my-2" type="text" name="username"    placeholder={'username'} />
                    <Password />
                    <Input className="my-2" type="text" name="websiteName" placeholder={'website name'} />
                    <Input className="my-2" type="text" name="websiteUrl"  placeholder={'website url'} />

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
    

    const { toast } = useToast()


    const updatePasswordState = ( state ) => {
        let passwordsCopy = [...passwords ];
        passwordsCopy.push( state );
        setPasswords( passwordsCopy )
    }

    async function deletePassword ( id ) {
        console.log( id );
        let passwords = await deletePasswordUserAction( id );
        setPasswords( passwords );
    }

    async function handleStatusOfPassword ( id ) {
        let passwords = await changeStatusOfPasswordAction( id );
        setPasswords( passwords );
    }

    async function copyPasswordToClipboard ( password ) {
        await navigator.clipboard.writeText( password );
        toast({
            title: 'Clipboard',
            description: `Copied password of ${ password } to clipboard`,
            duration: 4500
         });
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
                        <TableHead> Used In:  </TableHead>
                        <TableHead> Username </TableHead>
                        <TableHead> Password </TableHead>
                        <TableHead> Last used </TableHead>
                        <TableHead> Status    </TableHead>
                        <TableHead className="text-right"> Category </TableHead>
                        <TableHead className="text-right"> </TableHead>
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
                         
                            <TableCell className="text-right" onClick={ ( ) => copyPasswordToClipboard ( each.password ) }>
                                copy password
                            </TableCell>   

                            <TableCell>
                               last used
                            </TableCell>

                            <TableCell className="text-right">
                                <Button onClick={ ( ) => handleStatusOfPassword( each.id )}
                                className={ `${ each.status ? 'bg-blue-900' : 'bg-red-800'}` }> { each.status ? 'active' : 'inactive'} </Button>
                            </TableCell>
                            
                            <TableCell className="text-right">
                                { each.categoryIds.map( ( category , index ) => 
                                    <Button key={ index } variant="outline"> { category } </Button>
                                )}
                            </TableCell>

                            <TableCell className="text-right" onClick={ ( ) => {
                                deletePassword( each.id )
                            }}>
                                delete
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}