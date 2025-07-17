import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import AdPlaceholder from '../components/AdPlaceholder';
import { fetchPosts } from '../services/postService';
import { useSEO } from '../utils/seo';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Hamısı');
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPosts(category)
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  useSEO({
    title: 'FutbollPress - Futbol Xəbərləri',
    description: 'Ən son futbol xəbərləri, transferlər, liqalar və daha çoxu FutbollPress-də.'
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-navy mb-4">Futbol Xəbərləri</h1>
      <CategoryFilter selected={category} onSelect={setCategory} />
      <AdPlaceholder />
      {loading && <div className="text-slate">Yüklənir...</div>}
      {error && <div className="text-red-500">Xəta: {error}</div>}
      {!loading && posts.length === 0 && <div className="text-slate">Xəbər tapılmadı.</div>}
      <div>
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home; 