import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceButton } from '@/components/ui/voice-button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, Calendar, TrendingUp, Droplets, Thermometer, Wind } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface FarmData {
  farmName: string;
  location: string;
  area: string;
  soilHealth: number;
  cropCount: number;
  lastWatered: string;
  nextHarvest: string;
  weatherToday: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
  };
}

interface MyFarmPageProps {
  onBack: () => void;
}

export const MyFarmPage = ({ onBack }: MyFarmPageProps) => {
  const { t } = useTranslation();
  const { speak } = useVoice();

  const [farmData] = useState<FarmData>({
    farmName: 'Green Valley Farm',
    location: 'Warangal, Telangana',
    area: '5.2 acres',
    soilHealth: 78,
    cropCount: 3,
    lastWatered: '2 days ago',
    nextHarvest: '45 days',
    weatherToday: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy'
    }
  });

  const [activities] = useState([
    { id: '1', activity: 'Soil pH testing completed', date: '2 days ago', type: 'soil' },
    { id: '2', activity: 'Fertilizer application - Urea 50kg', date: '5 days ago', type: 'fertilizer' },
    { id: '3', activity: 'Irrigation system maintenance', date: '1 week ago', type: 'irrigation' },
    { id: '4', activity: 'Pest monitoring - No issues found', date: '1 week ago', type: 'pest' },
    { id: '5', activity: 'Cotton seeds planted in Field B', date: '2 weeks ago', type: 'planting' }
  ]);

  const [crops] = useState([
    { id: '1', name: 'Rice', localName: 'వరిధాన్యం', area: '2.5 acres', stage: 'Growing', health: 85 },
    { id: '2', name: 'Cotton', localName: 'పత్తి', area: '2.0 acres', stage: 'Flowering', health: 92 },
    { id: '3', name: 'Maize', localName: 'మొక్కజొన్న', area: '0.7 acres', stage: 'Maturity', health: 88 }
  ]);

  useEffect(() => {
    speak(`${t('my_farm')} overview. ${farmData.farmName} located at ${farmData.location}`);
  }, [speak, t, farmData.farmName, farmData.location]);

  const getSoilHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-500';
    if (health >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'growing': return 'bg-blue-500';
      case 'flowering': return 'bg-purple-500';
      case 'maturity': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const speakFarmSummary = () => {
    const summary = `Farm Summary: ${farmData.farmName} covers ${farmData.area} with ${farmData.cropCount} different crops. Soil health is at ${farmData.soilHealth} percent. Weather today: ${farmData.weatherToday.condition} with ${farmData.weatherToday.temperature} degrees celsius.`;
    speak(summary);
  };

  const speakCropDetails = (crop: any) => {
    const details = `${crop.name} occupies ${crop.area}, currently in ${crop.stage} stage with ${crop.health} percent health status.`;
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
                {t('my_farm')}
              </h1>
            </div>
            <VoiceButton 
              size="lg"
              onClick={speakFarmSummary}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Farm Overview */}
        <Card className="shadow-card mb-6 gradient-farm">
          <CardContent className="p-6 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{farmData.farmName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{farmData.location}</span>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-0 text-lg px-4 py-2">
                {farmData.area}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{farmData.cropCount}</div>
                <div className="text-sm opacity-90">Active Crops</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${getSoilHealthColor(farmData.soilHealth)}`}>
                  {farmData.soilHealth}%
                </div>
                <div className="text-sm opacity-90">Soil Health</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{farmData.nextHarvest}</div>
                <div className="text-sm opacity-90">Next Harvest</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              Today's Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{farmData.weatherToday.temperature}°C</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{farmData.weatherToday.humidity}%</div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">{farmData.weatherToday.windSpeed} km/h</div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{farmData.weatherToday.condition}</div>
                <div className="text-sm text-muted-foreground">Condition</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crops Status */}
        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Crop Status</span>
              <VoiceButton 
                size="sm"
                onClick={() => speak(`Current crop status overview`)}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crops.map((crop) => (
                <div key={crop.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-primary">{crop.name}</div>
                      <div className="text-sm text-muted-foreground">{crop.localName} • {crop.area}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStageColor(crop.stage)} text-white border-0`}>
                        {crop.stage}
                      </Badge>
                      <VoiceButton 
                        size="sm"
                        onClick={() => speakCropDetails(crop)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Status</span>
                      <span className="font-medium">{crop.health}%</span>
                    </div>
                    <Progress value={crop.health} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{activity.activity}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="h-12"
            onClick={() => speak("Farm analytics and insights")}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button 
            className="h-12 gradient-primary text-primary-foreground"
            onClick={() => speak("Add new farm activity")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
        </div>
      </div>
    </div>
  );
};