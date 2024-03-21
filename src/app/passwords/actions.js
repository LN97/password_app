'use server'
import { getAllPasswordsByUserId, createPassword, createPasswords, updatePasswordById, deletePasswordById, togglePasswordStatus } from '../../db_queries/query.passwords';
import { currentUser } from '@clerk/nextjs';
import { encryptPhrase } from '@/services/crypto';

export async function fetchpasswords ( ) {
    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;
    const passwords = await getAllPasswordsByUserId( );
    return passwords;
}

export async function AddPasswordsViaCSV ( passwords ) {
    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;

    let createdPasswords = await createPasswords( passwords );
    return createdPasswords;
}

export async function addPassword ( categories, formData ) {

    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;

    console.log( formData )
    const { username, password, websiteName, websiteUrl } = formData;

    let createdPassword = await createPassword({
        associated: {
            websiteName: websiteName , websiteUrl
        },
        username,
        password,
        categoryIds: categories,
        userId: id
    });
    return createdPassword;
}

export async function updatePasswordRecord( passwordId, categories, formData ) {

    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;

    try {
        const { username, password, websiteName, websiteUrl } = formData;

        console.log(passwordId, formData, categories )

        const updatedPassword = await updatePasswordById( passwordId, {
            associated: {
                websiteName: websiteName , websiteUrl
            },
            username,
            password: encryptPhrase( password ) ,
            categoryIds: categories,
        });
    
        console.log('Password record updated:', updatedPassword);
        return updatedPassword;
    } 
    catch (error) {
        console.error('Error updating the password record:', error);
        throw error; // Rethrow or handle as needed
    }
  }

export async function deletePasswordUserAction ( id ) {
    let passwords = await deletePasswordById( id );
    return passwords;
}


export async function changeStatusOfPasswordAction( id ) {
    let passwords = await togglePasswordStatus( id );
    return passwords;
}