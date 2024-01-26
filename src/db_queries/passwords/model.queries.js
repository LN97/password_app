import prisma from '../../../prisma/client';

const model = prisma.passwords;

// Get all passwords
export async function getAllPasswords() {
  return await model.findMany();
}

// Get one password by ID
export async function getOnePassword(id) {
  return await model.findUnique({
    where: {
      id: id
    }
  });
}

// Add a password
export async function addPassword(password, associated) {
  return await model.create({
    data: {
      password: password,
      associated: associated
    }
  });
}

// Edit a password
export async function editPassword(id, newPassword, newAssociated) {
  return await model.update({
    where: {
      id: id
    },
    data: {
      password: newPassword,
      associated: newAssociated
    }
  });
}

// Delete a password
export async function deletePassword(id) {
  return await model.delete({
    where: {
      id: id
    }
  });
}