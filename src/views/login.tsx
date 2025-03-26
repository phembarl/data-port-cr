import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedData = localStorage.getItem('credrails-user');
    if (!storedData) {
      toast.error('No user found! Please sign up first.');
      return;
    }
    try {
      const savedUser = JSON.parse(storedData);

      if (
        savedUser.email === form.email &&
        savedUser.password === form.password
      ) {
        navigate('/');
      } else {
        toast.error('Invalid credentials!');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="border border-[#4f54f880] rounded-2xl py-8 px-5 w-[25rem]">
        <form className="space-y-5" onSubmit={handleLogin}>
          <h1 className="text-lg text-[#4f54f8] font-medium">Log In</h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-[#4f54f8] text-white w-full rounded-md p-3 cursor-pointer"
          >
            Log In
          </button>

          <div className="text-right text-[#4f54f8] text-sm">
            <Link to="/signup">New Here? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
