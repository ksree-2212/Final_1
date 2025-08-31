import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceButton } from '@/components/ui/voice-button';
import { ArrowLeft, Droplets, Sun, TrendingUp, Clock } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface Crop {
  id: string;
  name: string;
  localName: string;
  season: string;
  waterNeed: 'Low' | 'Medium' | 'High';
  duration: string;
  yield: string;
  marketDemand: 'Low' | 'Medium' | 'High';
  soilType: string;
  description: string;
}

interface BestCropsPageProps {
  onBack: () => void;
}

export const BestCropsPage = ({ onBack }: BestCropsPageProps) => {
  const { t } = useTranslation();
  const { speak } = useVoice();
  
  const [crops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Rice',
      localName: 'వరిధాన్యం',
      season: 'Kharif',
      waterNeed: 'High',
      duration: '120-150 days',
      yield: '25-30 quintal/acre',
      marketDemand: 'High',
      soilType: 'Clay loam',
      description: 'Staple food crop with high market demand'
    },
    {
      id: '2',
      name: 'Cotton',
      localName: 'పత్తి',
      season: 'Kharif',
      waterNeed: 'Medium',
      duration: '180-200 days',
      yield: '15-20 quintal/acre',
      marketDemand: 'High',
      soilType: 'Black soil',
      description: 'High value cash crop suitable for your region'
    },
    {
      id: '3',
      name: 'Maize',
      localName: 'మొక్కజొన్న',
      season: 'Kharif/Rabi',
      waterNeed: 'Medium',
      duration: '90-120 days',
      yield: '20-25 quintal/acre',
      marketDemand: 'Medium',
      soilType: 'Well-drained',
      description: 'Versatile crop with good market price'
    },
    {
      id: '4',
      name: 'Groundnut',
      localName: 'వేరుశెనగ',
      season: 'Kharif',
      waterNeed: 'Low',
      duration: '100-130 days',
      yield: '12-18 quintal/acre',
      marketDemand: 'High',
      soilType: 'Sandy loam',
      description: 'Oil seed crop with steady demand'
    }
  ]);

  useEffect(() => {
    speak(`${t('best_crops')} recommendations for your farm`);
  }, [speak, t]);

  const getWaterNeedColor = (need: string) => {
    switch (need) {
      case 'High': return 'bg-blue-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarketDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const speakCropDetails = (crop: Crop) => {
    const details = `${crop.name}, Local name ${crop.localName}. ${crop.description}. Water requirement: ${crop.waterNeed}. Duration: ${crop.duration}. Expected yield: ${crop.yield}. Market demand: ${crop.marketDemand}.`;
    speak(details);
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
                {t('best_crops')}
              </h1>
            </div>
            <VoiceButton 
              size="lg"
              onClick={() => speak(`${t('best_crops')} recommendations based on your soil and location`)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Summary Card */}
        <Card className="shadow-card mb-6 gradient-farm">
          <CardContent className="p-6 text-center text-primary-foreground">
            <h2 className="text-xl font-bold mb-2">Recommended Crops for Your Farm</h2>
            <p className="opacity-90">Based on soil health, weather conditions, and market trends</p>
          </CardContent>
        </Card>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crops.map((crop) => (
            <Card key={crop.id} className="shadow-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-primary">{crop.name}</div>
                    <div className="text-sm text-muted-foreground">{crop.localName}</div>
                  </div>
                  <VoiceButton 
                    size="sm"
                    onClick={() => speakCropDetails(crop)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{crop.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs">Water Need</span>
                  </div>
                  <Badge className={`${getWaterNeedColor(crop.waterNeed)} text-white border-0 text-xs`}>
                    {crop.waterNeed}
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs">Market Demand</span>
                  </div>
                  <Badge className={`${getMarketDemandColor(crop.marketDemand)} text-white border-0 text-xs`}>
                    {crop.marketDemand}
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-xs">Duration</span>
                  </div>
                  <span className="text-xs font-medium">{crop.duration}</span>
                  
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs">Season</span>
                  </div>
                  <span className="text-xs font-medium">{crop.season}</span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Expected Yield:</span>
                    <span className="font-semibold text-primary">{crop.yield}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-muted-foreground">Soil Type:</span>
                    <span className="font-medium">{crop.soilType}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => speak(`More details about ${crop.name}: ${crop.description}`)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <Card className="shadow-card mt-6">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              💡 Recommendations are based on your soil health data and regional climate patterns.
              Consult with local agricultural experts for final decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};