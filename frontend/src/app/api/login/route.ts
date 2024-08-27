// app/api/login/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


const secretKey ='02b6e9f90241e09eab019081d9a5397db227450882f13fc1042f53da91635808e3a8b6900a6c4cee2ccf7980e96c754250a384b4cddda4b65c4d387c8caf38bd'; 

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Replace this with your actual authentication logic
  if (email === 'user@example.com' && password === 'password') {
    // Sign the JWT with the user email and secret key
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    // Create headers for setting the cookie
    const headers = new Headers();
    headers.set('Set-Cookie', `auth-token=${token}; path=/; HttpOnly; Secure; SameSite=Strict`);

    return new NextResponse('Login successful', { headers });
  }

  return new NextResponse('Invalid credentials', { status: 401 });
}
