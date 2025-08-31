import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceButton } from '@/components/ui/voice-button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Sprout, 
  Wheat, 
  TrendingUp, 
  Lightbulb, 
  MessageSquare, 
  MapPin,
  Wifi,
  WifiOff,
  TestTube,
  ArrowLeft,
  Globe,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';
import { useState } from 'react';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onBackToLanguage: () => void;
  onLogout?: () => void;
}

const dashboardItems = [
  { 
    key: 'my_soil', 
    icon: TestTube, 
    gradient: 'gradient-soil',
    color: 'text-secondary-dark'
  },
  { 
    key: 'best_crops', 
    icon: Wheat, 
    gradient: 'gradient-primary',
    color: 'text-primary-foreground'
  },
  { 
    key: 'market_prices', 
    icon: TrendingUp, 
    gradient: 'gradient-farm',
    color: 'text-primary-foreground'
  },
  { 
    key: 'smart_guidance', 
    icon: Lightbulb, 
    gradient: 'gradient-earth',
    color: 'text-secondary-dark'
  },
  { 
    key: 'ask_ai', 
    icon: MessageSquare, 
    gradient: 'gradient-primary',
    color: 'text-primary-foreground'
  },
  { 
    key: 'my_farm', 
    icon: Sprout, 
    gradient: 'gradient-farm',
    color: 'text-primary-foreground'
  }
];

export const Dashboard = ({ onNavigate, onBackToLanguage, onLogout }: DashboardProps) => {
  const { t } = useTranslation();
  const { speak } = useVoice();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleItemClick = (key: string) => {
    speak(t(key));
    onNavigate(key);
  };

  const handleLogout = () => {
    speak("Logging out. Goodbye!");
    onLogout?.();
  };

  return (
    <div className="min-h-screen gradient-earth">
      {/* Header */}
      <div className="bg-card shadow-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {t('welcome_farmer')}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Hyderabad, Telangana</span>
                </div>
                <Badge variant={isOnline ? "default" : "secondary"} className="flex items-center gap-1">
                  {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                  {t(isOnline ? 'online' : 'offline')}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToLanguage}
                className="h-10 w-10"
                title="Change Language"
              >
                <Globe className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10" title="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem disabled className="cursor-default">
                    <User className="mr-2 h-4 w-4" />
                    farmer@demo.com
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onBackToLanguage}>
                    <Globe className="mr-2 h-4 w-4" />
                    Change Language
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <VoiceButton 
                size="lg"
                className="shadow-voice"
                onClick={() => speak(t('welcome_farmer'))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {dashboardItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={item.key}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-card hover:shadow-voice border-0 overflow-hidden"
                onClick={() => handleItemClick(item.key)}
              >
                <CardContent className="p-0">
                  <div className={`h-32 ${item.gradient} flex items-center justify-center`}>
                    <IconComponent className={`h-12 w-12 ${item.color}`} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-center text-card-foreground">
                      {t(item.key)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Soil Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-soil-good">Good</div>
              <div className="text-xs text-muted-foreground">pH: 6.5 | NPK: Balanced</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Crops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Rice, Tomato, Cotton</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">2 min</div>
              <div className="text-xs text-muted-foreground">All data updated</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};