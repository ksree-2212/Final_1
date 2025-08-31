import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/hooks/useVoice';
import { Sprout, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userData: any) => void;
  onCreateAccount: () => void;
  onBack: () => void;
}

export const LoginPage = ({ onLogin, onCreateAccount, onBack }: LoginPageProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { speak } = useVoice();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      const message = "Please enter both email and password";
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: message
      });
      speak(message);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email) && password.length >= 6) {
        const successMessage = t('welcome_back');
        toast({
          title: "Login Successful",
          description: successMessage
        });
        speak(successMessage);
        onLogin({ email, password });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = "Please check your credentials and try again";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage
      });
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const useDemoAccount = () => {
    setEmail('farmer@demo.com');
    setPassword('farmer123');
  };

  return (
    <div className="min-h-screen gradient-earth flex items-center justify-center p-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 h-12 w-12"
        size="icon"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
            <Sprout className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            {t('welcome_back')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="h-12 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-12 w-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 gradient-primary text-primary-foreground font-semibold"
          >
            {isLoading ? "Logging in..." : t('login')}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={useDemoAccount}
            className="w-full h-12"
          >
            Use Demo Account
          </Button>

          <Button
            variant="ghost"
            onClick={onCreateAccount}
            className="w-full"
          >
            <User className="mr-2 h-4 w-4" />
            {t('create_account')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};