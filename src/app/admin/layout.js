export const metadata = {
  title: 'Admin Dashboard | Universal Interiors',
  description: 'Manage leads and consultations.',
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout" style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}
