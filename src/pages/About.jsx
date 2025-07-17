import { useSEO } from '../utils/seo';

function About() {
  useSEO({
    title: 'Haqqımızda - FutbollPress',
    description: 'FutbollPress haqqında məlumat: ən son futbol xəbərləri üçün müasir platforma.'
  });
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-navy mb-4">Haqqımızda</h1>
      <p className="text-slate">FutbollPress - ən son futbol xəbərləri üçün müasir platformadır.</p>
    </div>
  );
}

export default About; 