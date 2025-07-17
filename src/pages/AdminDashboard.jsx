import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signOut } from '../services/authService';
import { fetchPosts } from '../services/postService';
import { supabase } from '../services/supabaseClient';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', category: '', created_at: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser().then(({ data }) => {
      if (!data?.user) navigate('/admin');
      else setUser(data.user);
    });
    loadPosts();
    // eslint-disable-next-line
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (e) {
      setError('Xəbərlər yüklənmədi!');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Silinsin?')) return;
    await supabase.from('posts').delete().eq('id', id);
    loadPosts();
  }

  async function handleEdit(post) {
    setForm({ ...post });
    setEditId(post.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await supabase.from('posts').update(form).eq('id', editId);
    } else {
      await supabase.from('posts').insert([{ ...form, created_at: new Date().toISOString() }]);
    }
    setShowForm(false);
    setForm({ title: '', description: '', image_url: '', category: '', created_at: '' });
    setEditId(null);
    loadPosts();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy">Admin Panel</h1>
        <button onClick={() => { signOut(); navigate('/admin'); }} className="text-sky hover:underline">Çıxış</button>
      </div>
      <button onClick={() => { setShowForm(true); setEditId(null); setForm({ title: '', description: '', image_url: '', category: '', created_at: '' }); }} className="bg-sky text-white px-4 py-2 rounded mb-4">Yeni xəbər əlavə et</button>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-4 mb-6">
          <input type="text" placeholder="Başlıq" className="border p-2 rounded" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          <textarea placeholder="Təsvir" className="border p-2 rounded" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
          <input type="text" placeholder="Şəkil URL" className="border p-2 rounded" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} required />
          <input type="text" placeholder="Kateqoriya" className="border p-2 rounded" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required />
          <button type="submit" className="bg-navy text-white py-2 rounded hover:bg-sky transition">{editId ? 'Yenilə' : 'Əlavə et'}</button>
          <button type="button" className="text-slate mt-2" onClick={() => setShowForm(false)}>Ləğv et</button>
        </form>
      )}
      {loading ? <div className="text-slate">Yüklənir...</div> : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-slate/10">
              <th className="p-2">Başlıq</th>
              <th className="p-2">Kateqoriya</th>
              <th className="p-2">Tarix</th>
              <th className="p-2">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-t">
                <td className="p-2">{post.title}</td>
                <td className="p-2">{post.category}</td>
                <td className="p-2">{new Date(post.created_at).toLocaleDateString()}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(post)} className="text-sky hover:underline">Redaktə</button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}

export default AdminDashboard; 