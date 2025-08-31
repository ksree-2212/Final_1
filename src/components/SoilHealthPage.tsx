import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { VoiceButton } from '@/components/ui/voice-button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Save } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';
import { useToast } from '@/hooks/use-toast';

interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
}

interface SoilHealthPageProps {
  onBack: () => void;
}

export const SoilHealthPage = ({ onBack }: SoilHealthPageProps) => {
  const { t } = useTranslation();
  const { speak, isListening, transcript, startListening, stopListening } = useVoice();
  const { toast } = useToast();

  const [soilData, setSoilData] = useState<SoilData>({
    ph: 6.5,
    nitrogen: 75,
    phosphorus: 60,
    potassium: 80,
    moisture: 45
  });

  const [activeVoiceField, setActiveVoiceField] = useState<string>('');

  // Process voice input
  useEffect(() => {
    if (transcript && activeVoiceField && !isListening) {
      const value = parseFloat(transcript.replace(/[^0-9.]/g, ''));
      if (!isNaN(value)) {
        setSoilData(prev => ({
          ...prev,
          [activeVoiceField]: value
        }));
        speak(`${t(activeVoiceField)} set to ${value}`);
      }
      setActiveVoiceField('');
    }
  }, [transcript, isListening, activeVoiceField, speak, t]);

  const getSoilHealthStatus = (ph: number, nitrogen: number, phosphorus: number, potassium: number, moisture: number): { status: string; color: string; score: number } => {
    // Calculate overall score based on all parameters
    let score = 0;
    let factors = 0;

    // pH score (6.0-7.5 is optimal)
    if (ph >= 6.0 && ph <= 7.5) {
      score += 100;
    } else if (ph >= 5.5 && ph < 6.0 || ph > 7.5 && ph <= 8.0) {
      score += 75;
    } else if (ph >= 5.0 && ph < 5.5 || ph > 8.0 && ph <= 8.5) {
      score += 50;
    } else {
      score += 25;
    }
    factors++;

    // NPK scores (80+ is excellent, 60+ is good, 40+ is fair)
    [nitrogen, phosphorus, potassium].forEach(nutrient => {
      if (nutrient >= 80) score += 100;
      else if (nutrient >= 60) score += 75;
      else if (nutrient >= 40) score += 50;
      else score += 25;
      factors++;
    });

    // Moisture score (40-70% is optimal)
    if (moisture >= 40 && moisture <= 70) {
      score += 100;
    } else if (moisture >= 30 && moisture < 40 || moisture > 70 && moisture <= 80) {
      score += 75;
    } else if (moisture >= 20 && moisture < 30 || moisture > 80 && moisture <= 90) {
      score += 50;
    } else {
      score += 25;
    }
    factors++;

    const averageScore = Math.round(score / factors);

    if (averageScore >= 85) {
      return { status: t('excellent'), color: 'soil-excellent', score: averageScore };
    } else if (averageScore >= 65) {
      return { status: t('good'), color: 'soil-good', score: averageScore };
    } else if (averageScore >= 45) {
      return { status: t('fair'), color: 'soil-fair', score: averageScore };
    } else {
      return { status: t('poor'), color: 'soil-poor', score: averageScore };
    }
  };

  const getNutrientStatus = (value: number, type: 'npk' | 'moisture'): { status: string; color: string } => {
    const thresholds = type === 'moisture' 
      ? { excellent: 60, good: 40, fair: 20 }
      : { excellent: 80, good: 60, fair: 40 };

    if (value >= thresholds.excellent) {
      return { status: t('excellent'), color: 'soil-excellent' };
    } else if (value >= thresholds.good) {
      return { status: t('good'), color: 'soil-good' };
    } else if (value >= thresholds.fair) {
      return { status: t('fair'), color: 'soil-fair' };
    } else {
      return { status: t('poor'), color: 'soil-poor' };
    }
  };

  const handleVoiceInput = (field: string) => {
    setActiveVoiceField(field);
    speak(`${t('speak_soil_ph')}`);
    startListening();
  };

  const handleSave = () => {
    toast({
      title: "Soil Data Saved",
      description: "Your soil health data has been updated successfully."
    });
    speak("Soil data saved successfully");
  };

  const soilHealth = getSoilHealthStatus(soilData.ph, soilData.nitrogen, soilData.phosphorus, soilData.potassium, soilData.moisture);
  const nitrogenHealth = getNutrientStatus(soilData.nitrogen, 'npk');
  const phosphorusHealth = getNutrientStatus(soilData.phosphorus, 'npk');
  const potassiumHealth = getNutrientStatus(soilData.potassium, 'npk');
  const moistureHealth = getNutrientStatus(soilData.moisture, 'moisture');

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
                {t('soil_health')}
              </h1>
            </div>
            <VoiceButton 
              size="lg"
              onClick={() => speak(`${t('soil_health')} ${soilHealth.status}`)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Soil Health Overview */}
        <Card className="shadow-soil mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Soil Health Report Card</span>
              <Badge className={`${soilHealth.color} text-white border-0`}>
                {soilHealth.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2" style={{ color: `hsl(var(--${soilHealth.color}))` }}>
                {soilHealth.score}/100
              </div>
              <Progress value={soilHealth.score} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Soil Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* pH Level */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t('soil_ph')}</span>
                <VoiceButton 
                  size="sm"
                  isListening={isListening && activeVoiceField === 'ph'}
                  onClick={() => handleVoiceInput('ph')}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={soilData.ph}
                  onChange={(e) => setSoilData(prev => ({ ...prev, ph: parseFloat(e.target.value) || 0 }))}
                  step="0.1"
                  min="0"
                  max="14"
                  className="h-12"
                />
                <Badge className={`${soilHealth.color} text-white border-0`}>
                  {soilHealth.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Nitrogen */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t('nitrogen')}</span>
                <VoiceButton 
                  size="sm"
                  isListening={isListening && activeVoiceField === 'nitrogen'}
                  onClick={() => handleVoiceInput('nitrogen')}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={soilData.nitrogen}
                  onChange={(e) => setSoilData(prev => ({ ...prev, nitrogen: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  max="100"
                  className="h-12"
                />
                <Badge className={`${nitrogenHealth.color} text-white border-0`}>
                  {nitrogenHealth.status}
                </Badge>
              </div>
              <Progress value={soilData.nitrogen} className="h-2" />
            </CardContent>
          </Card>

          {/* Phosphorus */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t('phosphorus')}</span>
                <VoiceButton 
                  size="sm"
                  isListening={isListening && activeVoiceField === 'phosphorus'}
                  onClick={() => handleVoiceInput('phosphorus')}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={soilData.phosphorus}
                  onChange={(e) => setSoilData(prev => ({ ...prev, phosphorus: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  max="100"
                  className="h-12"
                />
                <Badge className={`${phosphorusHealth.color} text-white border-0`}>
                  {phosphorusHealth.status}
                </Badge>
              </div>
              <Progress value={soilData.phosphorus} className="h-2" />
            </CardContent>
          </Card>

          {/* Potassium */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t('potassium')}</span>
                <VoiceButton 
                  size="sm"
                  isListening={isListening && activeVoiceField === 'potassium'}
                  onClick={() => handleVoiceInput('potassium')}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={soilData.potassium}
                  onChange={(e) => setSoilData(prev => ({ ...prev, potassium: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  max="100"
                  className="h-12"
                />
                <Badge className={`${potassiumHealth.color} text-white border-0`}>
                  {potassiumHealth.status}
                </Badge>
              </div>
              <Progress value={soilData.potassium} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Moisture Level */}
        <Card className="shadow-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('moisture')} (%)</span>
              <VoiceButton 
                size="sm"
                isListening={isListening && activeVoiceField === 'moisture'}
                onClick={() => handleVoiceInput('moisture')}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={soilData.moisture}
                onChange={(e) => setSoilData(prev => ({ ...prev, moisture: parseFloat(e.target.value) || 0 }))}
                min="0"
                max="100"
                className="h-12"
              />
              <Badge className={`${moistureHealth.color} text-white border-0`}>
                {moistureHealth.status}
              </Badge>
            </div>
            <Progress value={soilData.moisture} className="h-3" />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleSave}
            size="lg"
            className="gradient-primary text-primary-foreground px-8"
          >
            <Save className="mr-2 h-5 w-5" />
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};