import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'user' | 'owner' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  userRole: UserRole | null;
  signIn: (email: string, password: string, role?: UserRole) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Check for existing authentication on startup
  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a token in storage
        setIsLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
      } catch (error) {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string, role?: UserRole) => {
    // In a real app, this would make an API call
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create different user types based on email
      // In a real app, the role would come from the server
      const detectedRole = role || 
        email.includes('admin') ? 'admin' : 
        email.includes('owner') ? 'owner' : 'user';
      
      const userData: User = {
        id: '123',
        name: detectedRole === 'admin' ? 'Admin User' : 
              detectedRole === 'owner' ? 'Stadium Owner' : 'John Doe',
        email,
        role: detectedRole as UserRole,
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
      };
      
      setUser(userData);
      setUserRole(userData.role);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    // In a real app, this would clear tokens
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        userRole,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}