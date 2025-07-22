import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Admin')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUserData } = useUser();

const handleLogin = async () => {
  setError('');

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError) {
    setError(authError.message);
    console.log('Login error:', authError);
    return;
  }

  const userId = data.user.id;
  console.log('Signed in user:', data.user);

  if (role === 'Admin') {
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', userId)
      .single();

    if (adminError || !adminData) {
      setError('You are not registered as Admin');
      return;
    }

    setUserData(adminData); // Save admin data to context
    navigate('/dashboard');
  }

  if (role === 'Staff') {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      setError('You are not registered as Staff');
      return;
    }

    setUserData(userData); // Save staff data to context
    navigate('/staff/dashboard');
  }
};


 

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 relative">
      {/* Glow effect */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-200 opacity-40 blur-3xl animate-pulse" />

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-xl px-10 py-10 z-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign In</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your credentials to access your account
        </p>

        {/* Email Input */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your Email here"
  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-sm outline-none"
/>
        </div>

        {/* Password Input */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your Password"
  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-sm outline-none"
/>
        </div>

        {/* Role Toggle (Admin & Staff only) */}
       <div className="mb-6 text-left">
  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
  <div className="flex gap-4">
    {['Admin', 'Staff'].map((r) => (
      <button
        key={r}
        onClick={() => handleRoleSelect(r)}
        className={`w-1/2 px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-200
          ${
            role === r
              ? 'bg-[#002B5B] text-white border-[#002B5B]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent'
          }`}
      >
        {r}
      </button>
    ))}
  </div>
</div>


        {/* Login Button */}
        <button
  onClick={handleLogin}
  className="w-full bg-[#002B5B] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
>
  Login
</button>

        {/* Footer */}
        <p className="text-xs text-gray-600 mt-4">
          Don’t have an account? Contact your administrator
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
