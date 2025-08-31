import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/hooks/useVoice';
import { Sprout, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface CreateAccountPageProps {
  onAccountCreated: (userData: any) => void;
  onBack: () => void;
}

export const CreateAccountPage = ({ onAccountCreated, onBack }: CreateAccountPageProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { speak } = useVoice();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    farmLocation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = async () => {
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      const message = "Please fill in all required fields";
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: message
      });
      speak(message);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const message = "Please enter a valid email address";
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: message
      });
      speak(message);
      return;
    }

    if (formData.password.length < 6) {
      const message = "Password must be at least 6 characters long";
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: message
      });
      speak(message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const message = "Passwords do not match";
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: message
      });
      speak(message);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for account creation
      await new Promise(resolve => setTimeout(resolve, 1500));

      const successMessage = "Account created successfully! Welcome to Smart Agriculture!";
      toast({
        title: "Account Created",
        description: successMessage
      });
      speak(successMessage);
      
      onAccountCreated({
        name: formData.name,
        email: formData.email,
        farmLocation: formData.farmLocation
      });
    } catch (error) {
      const errorMessage = "Failed to create account. Please try again.";
      toast({
        variant: "destructive",
        title: "Account Creation Failed",
        description: errorMessage
      });
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-earth flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="mx-auto h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            {t('create_account')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name..."
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email..."
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="farmLocation">Farm Location (Optional)</Label>
            <Input
              id="farmLocation"
              type="text"
              value={formData.farmLocation}
              onChange={(e) => handleInputChange('farmLocation', e.target.value)}
              placeholder="Enter your farm location..."
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a password..."
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password..."
                className="h-12 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-12 w-12"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleCreateAccount}
            disabled={isLoading}
            className="w-full h-12 gradient-primary text-primary-foreground font-semibold mt-6"
          >
            {isLoading ? "Creating Account..." : t('create_account')}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By creating an account, you agree to our terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};