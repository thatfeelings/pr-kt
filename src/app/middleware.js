import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('auth-token'); // Read token from cookie

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to login if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user info for later use
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/protected-page'], // Apply middleware to these routes
};
