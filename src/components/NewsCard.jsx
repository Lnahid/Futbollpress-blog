import LikeButton from './LikeButton';
import ShareIcons from './ShareIcons';

function NewsCard({ post, onLike }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4 mb-6">
      <img src={post.image_url} alt={post.title} className="w-full md:w-48 h-32 object-cover rounded" />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy mb-2">{post.title}</h2>
          <p className="text-slate mb-2 line-clamp-2">{post.description}</p>
          <div className="text-xs text-slate mb-2">{new Date(post.created_at).toLocaleDateString()}</div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <a href={`/post/${post.id}`} className="text-sky hover:underline font-medium">Davamını oxu</a>
          <LikeButton postId={post.id} count={post.likes_count} onLike={onLike} />
          <ShareIcons post={post} />
        </div>
      </div>
    </div>
  );
}

export default NewsCard; 