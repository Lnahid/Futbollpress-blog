import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/postService';
import NewsCard from '../components/NewsCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get('q') || '';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchPosts().then(data => {
        setPosts(data.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.description.toLowerCase().includes(query.toLowerCase())));
        setLoading(false);
      });
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-navy mb-4">Axtarış nəticələri</h1>
      {loading ? <div className="text-slate">Yüklənir...</div> : (
        posts.length === 0 ? <div className="text-slate">Nəticə tapılmadı.</div> : (
          posts.map(post => <NewsCard key={post.id} post={post} />)
        )
      )}
    </div>
  );
}

export default Search; 