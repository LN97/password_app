'use server'
import { getAllPasswordsByUserId, createPassword, deletePasswordById, togglePasswordStatus } from '../../db_queries/query.passwords';
import { currentUser } from '@clerk/nextjs';

export async function fetchpasswords ( ) {
    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;
    const passwords = await getAllPasswordsByUserId( id );
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

export async function deletePasswordUserAction ( id ) {
    let passwords = await deletePasswordById( id );
    return passwords;
}

export async function changeStatusOfPasswordAction( id ) {
    let passwords = await togglePasswordStatus( id );
    return passwords;
}