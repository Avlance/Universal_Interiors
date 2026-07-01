import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

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

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}
