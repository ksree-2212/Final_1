import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceButton } from '@/components/ui/voice-button';
import { ArrowLeft, Droplets, Bug, Wheat, Sun, AlertTriangle, Clock } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface Guidance {
  id: string;
  title: string;
  category: 'watering' | 'pest' | 'fertilizer' | 'weather' | 'harvest';
  priority: 'high' | 'medium' | 'low';
  description: string;
  action: string;
  timeframe: string;
  icon: any;
}

interface SmartGuidancePageProps {
  onBack: () => void;
}

export const SmartGuidancePage = ({ onBack }: SmartGuidancePageProps) => {
  const { t } = useTranslation();
  const { speak } = useVoice();

  const [guidances] = useState<Guidance[]>([
    {
      id: '1',
      title: 'Irrigation Schedule',
      category: 'watering',
      priority: 'high',
      description: 'Based on soil moisture levels, your crops need watering within next 24 hours.',
      action: 'Apply 25mm water irrigation to rice fields',
      timeframe: 'Next 24 hours',
      icon: Droplets
    },
    {
      id: '2',
      title: 'Pest Alert',
      category: 'pest',
      priority: 'high',
      description: 'Brown plant hopper detected in nearby fields. Take preventive measures.',
      action: 'Spray neem-based pesticide on rice crops',
      timeframe: 'Immediate',
      icon: Bug
    },
    {
      id: '3',
      title: 'Fertilizer Application',
      category: 'fertilizer',
      priority: 'medium',
      description: 'Nitrogen levels are decreasing. Consider applying urea fertilizer.',
      action: 'Apply 50kg urea per acre',
      timeframe: 'Within 3 days',
      icon: Wheat
    },
    {
      id: '4',
      title: 'Weather Advisory',
      category: 'weather',
      priority: 'medium',
      description: 'Light rainfall expected in next 2 days. Adjust irrigation schedule.',
      action: 'Reduce watering frequency',
      timeframe: 'Next 2 days',
      icon: Sun
    },
    {
      id: '5',
      title: 'Harvest Timing',
      category: 'harvest',
      priority: 'low',
      description: 'Your cotton crop will be ready for harvest in 2-3 weeks.',
      action: 'Prepare harvesting equipment and labor',
      timeframe: '2-3 weeks',
      icon: Clock
    }
  ]);

  useEffect(() => {
    speak(`${t('smart_guidance')} recommendations for your farm`);
  }, [speak, t]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'watering': return 'text-blue-500';
      case 'pest': return 'text-red-500';
      case 'fertilizer': return 'text-green-500';
      case 'weather': return 'text-yellow-500';
      case 'harvest': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const speakGuidanceDetails = (guidance: Guidance) => {
    const details = `${guidance.title}. Priority: ${guidance.priority}. ${guidance.description} Action needed: ${guidance.action}. Timeframe: ${guidance.timeframe}.`;
    speak(details);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      watering: 'Irrigation',
      pest: 'Pest Control',
      fertilizer: 'Fertilization',
      weather: 'Weather',
      harvest: 'Harvest'
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen gradient-earth">
      {/* Header */}
      <div className="bg-card shadow-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">
                {t('smart_guidance')}
              </h1>
            </div>
            <VoiceButton 
              size="lg"
              onClick={() => speak(`${t('smart_guidance')} based on AI analysis of your farm data`)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Summary Card */}
        <Card className="shadow-card mb-6 gradient-farm">
          <CardContent className="p-6 text-center text-primary-foreground">
            <h2 className="text-xl font-bold mb-2">AI-Powered Farm Guidance</h2>
            <p className="opacity-90">Personalized recommendations based on your soil, weather, and crop data</p>
            <div className="flex justify-center gap-4 mt-4">
              <Badge className="bg-red-500 text-white border-0">
                {guidances.filter(g => g.priority === 'high').length} High Priority
              </Badge>
              <Badge className="bg-yellow-500 text-white border-0">
                {guidances.filter(g => g.priority === 'medium').length} Medium Priority
              </Badge>
              <Badge className="bg-green-500 text-white border-0">
                {guidances.filter(g => g.priority === 'low').length} Low Priority
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Guidance Cards */}
        <div className="space-y-4">
          {guidances.map((guidance) => {
            const IconComponent = guidance.icon;
            return (
              <Card key={guidance.id} className="shadow-card hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${getCategoryColor(guidance.category)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">{guidance.title}</div>
                        <div className="text-sm text-muted-foreground">{getCategoryLabel(guidance.category)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPriorityColor(guidance.priority)} text-white border-0 text-xs`}>
                        {guidance.priority.toUpperCase()}
                      </Badge>
                      <VoiceButton 
                        size="sm"
                        onClick={() => speakGuidanceDetails(guidance)}
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{guidance.description}</p>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-primary mb-1">Recommended Action:</div>
                        <p className="text-sm">{guidance.action}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Timeframe:</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{guidance.timeframe}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => speak(`Mark ${guidance.title} as completed`)}
                    >
                      Mark as Done
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1 gradient-primary text-primary-foreground"
                      onClick={() => speak(`Set reminder for ${guidance.title}`)}
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <Card className="shadow-card mt-6">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              🤖 Guidance is generated using AI analysis of your farm data, weather patterns, and agricultural best practices.
              Always consult with local agricultural experts for critical decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};