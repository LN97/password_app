import prisma from '../../prisma/client';

// Create a new password
export async function createPassword(data) {
  return await prisma.passwords.create({ data });
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
