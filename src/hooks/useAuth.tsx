import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, User } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchUserProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (data && !error) setUser(data);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) return { data, error };

    // Si confirmation par email nécessaire, attendre que l'utilisateur confirme
    // Sinon créer profil après connexion
    const sessionCheck = await supabase.auth.getSession();
    if (sessionCheck.data.session?.user) {
      const userId = sessionCheck.data.session.user.id;

      // Vérifier si profil existe déjà
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!existingUser) {
        const { error: insertError } = await supabase.from('users').insert({
          id: userId,
          email,
          name
        });

        if (insertError) {
          console.error("Erreur création profil :", insertError.message);
        }
      }
    }

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    return { error: { message: "Email et mot de passe requis" } };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (data.session?.user) {
    fetchUserProfile(data.session.user.id);
  }

  if (error) console.error("Erreur connexion :", error.message);

  return { data, error };
};


  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    if (!error) setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
