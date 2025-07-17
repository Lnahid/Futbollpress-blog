import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import LikeButton from '../components/LikeButton';
import ShareIcons from '../components/ShareIcons';
import { useSEO } from '../utils/seo';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*, likes:likes(count)')
        .eq('id', id)
        .single();
      if (error) setError(error.message);
      else setPost({ ...data, likes_count: data.likes?.[0]?.count || 0 });
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  useSEO({
    title: post ? post.title + ' - FutbollPress' : 'FutbollPress',
    description: post ? post.description?.slice(0, 150) : 'Ən son futbol xəbərləri FutbollPress-də.'
  });

  if (loading) return <div className="container mx-auto py-8 px-4 text-slate">Yüklənir...</div>;
  if (error) return <div className="container mx-auto py-8 px-4 text-red-500">Xəta: {error}</div>;
  if (!post) return null;

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Link to="/" className="text-sky hover:underline">&larr; Geri</Link>
      <h1 className="text-3xl font-bold text-navy mb-2 mt-4">{post.title}</h1>
      <div className="text-xs text-slate mb-4">{new Date(post.created_at).toLocaleDateString()} | {post.category}</div>
      <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover rounded mb-4" />
      <p className="text-slate mb-6 whitespace-pre-line">{post.description}</p>
      <div className="flex items-center gap-4 mb-8">
        <LikeButton postId={post.id} count={post.likes_count} />
        <ShareIcons post={post} />
      </div>
    </div>
  );
}

export default PostDetail; 