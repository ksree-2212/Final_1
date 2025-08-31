import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, Leaf, Sun, Droplets } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface WelcomePageProps {
  onContinue: () => void;
}

export const WelcomePage = ({ onContinue }: WelcomePageProps) => {
  const { t } = useTranslation();
  const { speak } = useVoice();

  useEffect(() => {
    // Speak welcome message after a brief delay
    const timer = setTimeout(() => {
      speak(t('welcome_farmer'));
    }, 1000);

    return () => clearTimeout(timer);
  }, [speak, t]);

  const handleContinue = () => {
    speak(t('welcome_back'));
    onContinue();
  };

  return (
    <div className="min-h-screen gradient-earth flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-card">
        <CardContent className="p-8 text-center">
          {/* Animated Icons */}
          <div className="relative mb-8">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="animate-bounce">
                <Sprout className="h-12 w-12 text-primary" />
              </div>
              <div className="animate-bounce delay-200">
                <Leaf className="h-10 w-10 text-success" />
              </div>
              <div className="animate-bounce delay-300">
                <Sun className="h-11 w-11 text-warning" />
              </div>
              <div className="animate-bounce delay-150">
                <Droplets className="h-10 w-10 text-primary-light" />
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {t('welcome_farmer')}
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              🌱 Smart Agriculture PWA
            </p>
            <p className="text-muted-foreground">
              {t('smart_guidance')} | {t('voice_command')} | {t('my_soil')}
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h3 className="font-semibold text-primary mb-1">{t('soil_health')}</h3>
              <p className="text-xs text-muted-foreground">pH, NPK Analysis</p>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h3 className="font-semibold text-success mb-1">{t('best_crops')}</h3>
              <p className="text-xs text-muted-foreground">Smart Recommendations</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <h3 className="font-semibold text-warning mb-1">{t('market_prices')}</h3>
              <p className="text-xs text-muted-foreground">Live Updates</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h3 className="font-semibold text-accent mb-1">{t('ask_ai')}</h3>
              <p className="text-xs text-muted-foreground">Voice Assistant</p>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full h-14 gradient-primary text-primary-foreground font-semibold text-lg hover:scale-105 transition-transform duration-200"
          >
            {t('next')} →
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            {t('tap_to_choose')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};