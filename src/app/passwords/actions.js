'use server'
import { getAllPasswords, createPassword } from '../../db_queries/query.passwords';
import { currentUser } from '@clerk/nextjs';

export async function fetchpasswords (userId ) {
    const passwords = await getAllPasswords();
    return passwords;
}

export async function addPassword ( categories, formData ) {

    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;

    console.log( formData )
    const { username, password, websiteName, websiteUrl } = formData;

     let createdUser = await createPassword({
        associated: {
            websiteName: websiteName , websiteUrl
        },
        username,
        password,
        categoryIds: categories,
        userId: id
     });
     return createdUser;
}