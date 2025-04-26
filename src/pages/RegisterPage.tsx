import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car as Farm, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleType, setRoleType] = useState<'admin' | 'employee'>('employee');
  const [adminPosition, setAdminPosition] = useState('Farm Manager');
  const [employeePosition, setEmployeePosition] = useState('Farm Attendant');
  const [error, setError] = useState<React.ReactNode>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Starting form submission with values:', { name, email, roleType, adminPosition, employeePosition });

    try {
      if (password !== confirmPassword) {
        console.log('Password validation failed: passwords do not match');
        throw new Error('Passwords do not match');
      }

      if (!name || !email || !password || !roleType) {
        console.log('Form validation failed: missing required fields');
        throw new Error('Please fill in all fields');
      }

      const role = roleType === 'admin' 
        ? { type: 'admin' as const, position: adminPosition }
        : { type: 'employee' as const, position: employeePosition };
      
      console.log('Calling register with:', { name, email, role });
      await register(name, email, password, role);
      
      // Navigate based on role
      console.log('Registration successful, navigating to role-specific page');
      if (roleType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } catch (error) {
      console.error('Registration error caught in form handler:', error);
      if (error instanceof Error) {
        // Check if it's an "already registered" error and add link to login
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          console.log('Detected "already registered" error, showing login link');
          setError(
            <>
              {error.message} <Link to="/login" className="font-medium text-green-700 hover:text-green-500">Sign in here</Link>.
            </>
          );
        } else {
          console.log('Setting generic error message:', error.message);
          setError(error.message);
        }
      } else {
        console.log('Setting fallback error message for non-Error object');
        setError('Failed to create an account. Please try again.');
      }
    } finally {
      console.log('Form submission completed, setting loading to false');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <Farm size={40} className="text-green-700" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-700 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role Type
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={roleType}
                  onChange={(e) => setRoleType(e.target.value as 'admin' | 'employee')}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
            </div>

            {roleType === 'admin' ? (
              <div>
                <label htmlFor="adminPosition" className="block text-sm font-medium text-gray-700">
                  Admin Position
                </label>
                <div className="mt-1">
                  <select
                    id="adminPosition"
                    name="adminPosition"
                    value={adminPosition}
                    onChange={(e) => setAdminPosition(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Farm Manager">Farm Manager</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Supply Chain Manager">Supply Chain Manager</option>
                    <option value="Veterinarian">Veterinarian</option>
                    <option value="Crop Production Manager">Crop Production Manager</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="employeePosition" className="block text-sm font-medium text-gray-700">
                  Employee Position
                </label>
                <div className="mt-1">
                  <select
                    id="employeePosition"
                    name="employeePosition"
                    value={employeePosition}
                    onChange={(e) => setEmployeePosition(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Farm Attendant">Farm Attendant</option>
                    <option value="Cow Attendant">Cow Attendant</option>
                    <option value="Labourer">Labourer</option>
                    <option value="Field Worker">Field Worker</option>
                    <option value="Veterinary Assistant">Veterinary Assistant</option>
                    <option value="Driver">Driver</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Intern">Intern</option>
                    <option value="Storekeeper">Storekeeper</option>
                    <option value="Security Guard">Security Guard</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;