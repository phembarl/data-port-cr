import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {useRou} from 'react-router-dom'
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords don't match");
    }
    localStorage.setItem('credrails-user', JSON.stringify(form));
    toast.success('User signed up successfully!');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="border border-[#4f54f880] rounded-2xl py-8 px-5 w-[25rem]">
        <form className="space-y-5" onSubmit={handleSignUp}>
          <h1 className="text-lg text-[#4f54f8] font-medium">Sign Up</h1>
          <input
            placeholder="First Name"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="firstname"
            onChange={handleChange}
          />

          <input
            placeholder="Last Name"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="lastname"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="email"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Mobile Number"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="phone"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
            name="confirmPassword"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-[#4f54f8] text-white w-full rounded-md p-3 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
