'use server'
import { getAllPasswords } from '../../db_queries/query.passwords';

export async function fetchpasswords (userId ) {
    const passwords = await getAllPasswords();
    return passwords;
}