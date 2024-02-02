import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';
const saltRounds = 10; // Adjust saltRounds as necessary

// Create a new password
export async function createPassword({ username, password, categoryIds, userId , associated }) {
  // encrypt password using bcrypt..
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newPassword = await prisma.passwords.create({
    data: {
        username,
        password: hashedPassword,
        categoryIds,
        userId,
        associated
    }
  });
  return newPassword;
}

// Retrieve all passwords
export async function getAllPasswords() {
  return await prisma.passwords.findMany();
}

// Retrieve a single password by ID
async function getPasswordById(id) {
  return await prisma.passwords.findUnique({
    where: { id },
  });
}

// Update a password by ID
async function updatePasswordById(id, data) {
  return await prisma.passwords.update({
    where: { id },
    data,
  });
}

// Delete a password by ID
async function deletePasswordById(id) {
  return await prisma.passwords.delete({
    where: { id },
  });
}
