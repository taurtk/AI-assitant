import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import AuthLayout from '@/components/layouts/auth-layout';
import AppLayout from '@/components/layouts/app-layout';
import Login from '@/components/auth/login';
import Register from '@/components/auth/register';
import VoiceAssistant from '@/components/voice-assistant';
import { AuthProvider, useAuth } from '@/components/auth/auth-provider';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <VoiceAssistant />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;