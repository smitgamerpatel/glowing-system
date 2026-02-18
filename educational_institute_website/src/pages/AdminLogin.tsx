import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Lock, User, ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ROUTE_PATHS, ADMIN_CREDENTIALS, INSTITUTE_CONFIG } from '@/lib/index';

/**
 * AdminLogin Page
 * Implements a secret access pattern:
 * 1. Default view shows a "Thank You" message.
 * 2. Dragging upward reveals the hidden admin login form.
 */
export default function AdminLogin() {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Artificial delay for premium feel
    setTimeout(() => {
      if (
        username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
      ) {
        toast.success('Access Granted', {
          description: 'Welcome back, Admin.',
        });
        localStorage.setItem('genius_admin_session', 'active');
        navigate(ROUTE_PATHS.ADMIN_PANEL);
      } else {
        toast.error('Access Denied', {
          description: 'Invalid credentials. Please try again.',
        });
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    // If dragged upward more than 100px
    if (info.offset.y < -100) {
      setIsFormVisible(true);
      toast.info('Secret Portal Unlocked', {
        description: 'Authorized personnel only.',
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!isFormVisible ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center z-10"
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.02 }}
              className="cursor-grab active:cursor-grabbing p-12 bg-card border border-border rounded-3xl shadow-xl max-w-lg mx-auto"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Thank you for visiting
              </h1>
              <p className="text-xl font-medium text-primary mb-2">
                {INSTITUTE_CONFIG.name}
              </p>
              <p className="text-muted-foreground italic mb-8">
                "{INSTITUTE_CONFIG.slogan}"
              </p>
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowLeft className="rotate-90 text-muted-foreground w-5 h-5" />
                </motion.div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Hold and Drag Upward
                </span>
              </div>
            </motion.div>
            
            <Button 
              variant="ghost" 
              className="mt-8 text-muted-foreground hover:text-primary"
              onClick={() => navigate(ROUTE_PATHS.HOME)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10"
          >
            <Card className="border-2 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <Lock className="text-primary-foreground w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Admin Login</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your credentials to access the content manager
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        placeholder="Enter username"
                        className="pl-10 h-11 border-border focus-visible:ring-primary"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11 border-border focus-visible:ring-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 mt-4 text-base font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      "Login to Dashboard"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t border-border pt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-3 h-3" />
                  <span>Only authorized administrators can access this area.</span>
                </div>
                <Button 
                  variant="link" 
                  className="text-xs h-auto p-0"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel and Go Back
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
