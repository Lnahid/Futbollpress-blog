import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

function ShareIcons({ post }) {
  const url = window.location.origin + '/post/' + post.id;
  const text = encodeURIComponent(post.title);
  return (
    <div className="flex gap-2">
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" title="Facebook">
        <FaFacebook className="text-sky hover:text-navy" />
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer" title="Twitter">
        <FaTwitter className="text-sky hover:text-navy" />
      </a>
      <a href={`https://wa.me/?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
        <FaWhatsapp className="text-sky hover:text-navy" />
      </a>
    </div>
  );
}

export default ShareIcons; 