import prisma from '../../prisma/client';
import { encryptPhrase } from '@/services/crypto';

import { currentUser } from '@clerk/nextjs';

// Retrieve all passwords
export async function getAllPasswordsByUserId( ) {
  // get current logged userId.
  const { id } = await currentUser();
  if ( !id ) return;

  return await prisma.passwords.findMany({
      where: { userId: id }
  });
}

// Retrieve a single password by ID
export async function getPasswordById(id) {
  return await prisma.passwords.findUnique({
    where: { id },
  });
}


// Create a new password
export async function createPassword({ username, password, categoryIds, userId , associated }) {

  // encrypt password using bcrypt..
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newPassword = await prisma.passwords.create({
    data: {
        username,
        password: encryptPhrase( password ),
        categoryIds,
        userId,
        associated
    }
  });
  return newPassword;
}


// Update a password by ID
export async function updatePasswordById(id, data) {
   await prisma.passwords.update({
    where: { id },
    data: {...data, lastUsed: new Date() },
  });
  return await getAllPasswordsByUserId();
}

export async function deletePasswordById(id) {
  // Delete the password by ID
  await prisma.passwords.delete({ where: { id } });

  // Fetch the updated list of passwords after deletion
  const updatedPasswordsList = await getAllPasswordsByUserId();
  // Return the updated list
  return updatedPasswordsList;
}

export async function togglePasswordStatus( id ) {
  // Retrieve the current status of the password entry
  const password = await prisma.passwords.findUnique({
    where: { id },
    select: { status: true }, // Only fetch the status field
  });

  if (!password) {
    throw new Error('Password not found');
  }

  // Toggle the status and update the password entry
  await prisma.passwords.update({
    where: { id },
    data: {
      status: !password.status, // Set the status to its opposite
    },
  });

   // Fetch the updated list of passwords after deletion
   const updatedPasswordsList = await getAllPasswordsByUserId();
   // Return the updated list
   return updatedPasswordsList;
}
