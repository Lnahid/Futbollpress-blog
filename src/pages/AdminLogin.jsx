import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (e) {
      setError('Giriş uğursuz oldu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <h1 className="text-2xl font-bold text-navy mb-4">Admin Giriş</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifrə"
          className="border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-sky text-white py-2 rounded hover:bg-navy transition" disabled={loading}>
          {loading ? 'Giriş...' : 'Giriş et'}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin; 