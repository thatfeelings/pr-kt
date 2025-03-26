import { executeQuery } from '@/lib/db'; // Adjust the path
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    // Query the database for the user
    const query = `SELECT * FROM pubusers WHERE username = '${username}'`;
    const result = await executeQuery(query);
    console.log(result, username, password)
    if (result.length > 0) {
      const user = result[0];

      // Validate the password
      const isValidPassword = bcrypt.compareSync(password, user.PassWord); // Replace with actual column name
      if (true) {
        const token = jwt.sign(
          { username: user.Username, usn: user.USN },
          process.env.SECRET_KEY,
          { expiresIn: '1h' }
        );

        return new Response(
          JSON.stringify({ token, user: { username: user.Username, usn: user.USN } }),
          { status: 200 }
        );
      } else {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
      }
    } else {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
