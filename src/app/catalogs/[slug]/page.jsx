'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import FlipbookViewer from '@/components/catalogs/FlipbookViewer';
import RegistrationModal from '@/components/catalogs/RegistrationModal';

export default function CatalogViewerPage() {
  const { slug } = useParams();
  const router = useRouter();
  
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userPhone, setUserPhone] = useState(null);

  const fetchCatalog = async () => {
    try {
      const res = await fetch(`/api/catalogs/${slug}`);
      const data = await res.json();
      if (data.status === 'OK' || data.statusCode === 200) {
        setCatalog(data.data);
      } else {
        router.push('/catalogs');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [slug]);

  const handleUnlockRequest = () => {
    setShowModal(true);
  };

  const handleRegistrationSuccess = (phone) => {
    setShowModal(false);
    setUserPhone(phone);
    setLoading(true);
    fetchCatalog(); // Re-fetch to get all pages now that we are authorized
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!catalog) return null;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <Toaster position="top-center" />
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        <FlipbookViewer 
          catalog={catalog} 
          userPhone={userPhone}
          onUnlockRequest={handleUnlockRequest}
        />
      </div>

      <RegistrationModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSuccess={handleRegistrationSuccess}
      />
      
    </div>
  );
}
