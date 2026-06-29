import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production');

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
}
