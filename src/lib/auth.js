import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production');

export async function verifyAuth(request) {
  const token = request.cookies.get('admin_token')?.value;
  
  if (!token) return false;
  
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
