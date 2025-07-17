import { useState } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import { addLike } from '../services/likeService';
import { getUserIp } from '../utils/getUserIp';

function LikeButton({ postId, count = 0, onLike }) {
  const [likes, setLikes] = useState(count);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!liked) {
      setLoading(true);
      const userIp = await getUserIp();
      try {
        await addLike(postId, userIp);
        setLikes(likes + 1);
        setLiked(true);
        if (onLike) onLike(postId);
      } catch (e) {
        alert('Like əlavə edilə bilmədi!');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button onClick={handleLike} className={`flex items-center gap-1 text-sky ${liked ? 'font-bold' : ''}`}
      disabled={liked || loading}
      title="Like">
      <FaRegThumbsUp />
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton; 