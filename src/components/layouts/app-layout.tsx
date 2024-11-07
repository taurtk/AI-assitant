import { Outlet } from 'react-router-dom';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function AppLayout() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Public Services Assistant</h1>
          <Button variant="ghost" size="icon" onClick={() => signOut()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}