import { useSEO } from '../utils/seo';

function Contact() {
  useSEO({
    title: 'Əlaqə - FutbollPress',
    description: 'FutbollPress ilə əlaqə: info@futbollpress.com'
  });
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-navy mb-4">Əlaqə</h1>
      <p className="text-slate">Bizimlə əlaqə üçün: info@futbollpress.com</p>
    </div>
  );
}

export default Contact; 