'use client'
import { Table,TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableRown  } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from 'react';
import { fetchpasswords, addPassword } from "./actions";
import Slideover from "@/components/tailwind/slideOver";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
 
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
    
        function generateStrongPassword(length = 12) {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]:;<>,.?~";
            let password = "";
          
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            console.log(password);
            passwordInputRef.current.value = password;
            checkPasswordStrength(password); // Update strength when generating a new password
        }
    
        function checkPasswordStrength(password) {
            // Define criteria
            const minLength = 8; // Minimum length requirement
          
            // Helper functions to check individual criteria
            function hasUppercase() {
                return /[A-Z]/.test(password);
            }
          
            function hasLowercase() {
                return /[a-z]/.test(password);
            }
          
            function hasNumbers() {
                return /\d/.test(password);
            }
          
            function hasSpecialChars() {
                return /[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password);
            }
          
            function hasCommonWords() {
                return /(password|123456|qwerty)/i.test(password);
            }
          
            // Calculate strength score based on criteria met
            function calculateStrengthScore() {
                let strength = 0;
          
                if (password.length >= minLength) {
                    strength += 1;
                }
          
                if (hasUppercase()) {
                    strength += 1;
                }
          
                if (hasLowercase()) {
                    strength += 1;
                }
          
                if (hasNumbers()) {
                    strength += 1;
                }
          
                if (hasSpecialChars()) {
                    strength += 1;
                }
          
                if (!hasCommonWords()) {
                    strength += 1;
                }
          
                return strength;
            }
          
            const strengthScore = calculateStrengthScore();
            setPasswordStrength(strengthScore); // Update the state with the new strength score
        }
    
        function handleInputChange(e) {
            let inputVal = e.target.value;
            checkPasswordStrength(inputVal); // Check and update strength on input change
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
                    <input className="p-2 border border-gray-300 flex-grow" type="text" name="password" placeholder="password" ref={passwordInputRef}
                        onChange={handleInputChange} 
                    />
                    <div onClick={() => generateStrongPassword()} className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer">
                        Generate
                    </div>
                </div>
                <Slider
      defaultValue={[50]}
      max={100}
      step={1}
    />
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