import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Role } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // Check if it's a "no rows" error
        if (error.code === 'PGRST116' || error.message.includes('no rows')) {
          console.log('No user profile found. User may need profile creation:', userId);
          // For demo accounts, try to create the profile if it doesn't exist
          const user = await supabase.auth.getUser();
          const email = user.data.user?.email;
          
          if (email && (email === 'admin@gecofarm.com' || email === 'employee@gecofarm.com')) {
            console.log('Creating profile for demo account:', email);
            const demoUser = await createDemoUser(email, userId);
            setUser(demoUser);
            return;
          }
          
          setUser(null);
          return;
        }
        
        throw error;
      }
      
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    }
  };

  const createDemoUser = async (email: string, userId: string) => {
    try {
      console.log('Creating demo user profile for:', email);
      const { data, error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            name: email === 'admin@gecofarm.com' ? 'Admin User' : 'Employee User',
            email,
            role: {
              type: email === 'admin@gecofarm.com' ? 'admin' : 'employee',
              position: email === 'admin@gecofarm.com' ? 'Farm Manager' : 'Farm Attendant'
            },
            profile_photo: email === 'admin@gecofarm.com' 
              ? 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
              : 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
          }
        ])
        .select()
        .single();

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        throw profileError;
      }
      
      console.log('Successfully created user profile:', data);
      return data;
    } catch (error) {
      console.error('Error in createDemoUser:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<string> => {
    try {
      console.log('Starting login process for:', email);
      
      // Proceed with sign in
      console.log('Attempting to sign in...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in failed:', signInError);
        throw signInError;
      }

      if (!signInData.user) {
        console.error('No user data after sign in');
        throw new Error('No user data received');
      }

      console.log('Sign in successful, checking/creating profile...');
      
      // Check for existing profile
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('users')
        .select('*')
        .eq('id', signInData.user.id)
        .single();

      if (profileCheckError && !profileCheckError.message.includes('No rows found')) {
        console.error('Error checking profile:', profileCheckError);
        throw profileCheckError;
      }

      if (!existingProfile && (email === 'admin@gecofarm.com' || email === 'employee@gecofarm.com')) {
        console.log('No profile found for demo account, creating one...');
        try {
          await createDemoUser(email, signInData.user.id);
        } catch (createError) {
          console.error('Profile creation failed:', createError);
          throw createError;
        }
      }

      // Fetch final profile
      await fetchUserProfile(signInData.user.id);
      
      console.log('Login process completed successfully');
      
      // Return appropriate route
      if (email === 'admin@gecofarm.com') {
        return '/admin';
      } else if (email === 'employee@gecofarm.com') {
        return '/employee';
      }
      return '/dashboard';

    } catch (error) {
      console.error('Login process failed:', error);
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw new Error('An unexpected error occurred during login');
    }
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    try {
      console.log('Starting registration process for:', email);
      
      // Include all user data in the signup request
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role_type: role.type,
            role_position: role.position
          }
        }
      });
      console.log('Signup response received>>>:', { data: signUpData, error: signUpError });
      // Handle signup errors
      if (signUpError) {
        console.error('Auth signup failed:', signUpError);
        
        // If the user already exists, provide a clear user-friendly error message
        if (signUpError.message.includes('already registered') || signUpError.code === 'user_already_exists') {
          throw new Error('This email address is already registered. Please use a different email or go to the login page.');
        }
        
        throw new Error(signUpError.message);
      }

      // Check if we have user data
      if (!signUpData.user) {
        console.error('No user data after signup');
        throw new Error('Failed to create user account');
      }
      
      const userId = signUpData.user.id;
      console.log('Auth signup successful, creating user profile...');
      
      console.log('User profile created successfully');
      
      // Fetch the complete user profile
      await fetchUserProfile(userId);
    } catch (error) {
      console.error('Registration process failed:', error);
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw new Error('An unexpected error occurred during registration');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const isAdmin = () => {
    return user?.role.type === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};