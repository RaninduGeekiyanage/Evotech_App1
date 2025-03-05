// utils/passwordUtils.js
import bcrypt from 'bcrypt';

// Hash the password using bcrypt
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword;
}

// Verify the password by comparing stored hash and input password
export async function verifyPassword(data) {
  const { hash, password } = data; // Destructure hash and password from the data object
  const match = await bcrypt.compare(password, hash); // Compare hashed passwords
  return match;
}
