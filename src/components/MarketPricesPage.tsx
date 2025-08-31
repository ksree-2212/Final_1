import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { VoiceButton } from '@/components/ui/voice-button';
import { ArrowLeft, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface MarketPrice {
  id: string;
  crop: string;
  localName: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface MarketPricesPageProps {
  onBack: () => void;
}

export const MarketPricesPage = ({ onBack }: MarketPricesPageProps) => {
  const { t } = useTranslation();
  const { speak, startListening, isListening, transcript } = useVoice();
  const [searchTerm, setSearchTerm] = useState('');
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);

  const [marketPrices] = useState<MarketPrice[]>([
    {
      id: '1',
      crop: 'Rice',
      localName: 'వరిధాన్యం',
      currentPrice: 2850,
      previousPrice: 2780,
      unit: 'per quintal',
      market: 'Warangal Mandi',
      lastUpdated: '2 hours ago',
      trend: 'up'
    },
    {
      id: '2',
      crop: 'Cotton',
      localName: 'పత్తి',
      currentPrice: 6200,
      previousPrice: 6350,
      unit: 'per quintal',
      market: 'Adilabad Market',
      lastUpdated: '1 hour ago',
      trend: 'down'
    },
    {
      id: '3',
      crop: 'Maize',
      localName: 'మొక్కజొన్న',
      currentPrice: 1980,
      previousPrice: 1980,
      unit: 'per quintal',
      market: 'Nizamabad Mandi',
      lastUpdated: '30 minutes ago',
      trend: 'stable'
    },
    {
      id: '4',
      crop: 'Groundnut',
      localName: 'వేరుశెనగ',
      currentPrice: 5400,
      previousPrice: 5250,
      unit: 'per quintal',
      market: 'Karimnagar Market',
      lastUpdated: '45 minutes ago',
      trend: 'up'
    },
    {
      id: '5',
      crop: 'Turmeric',
      localName: 'పసుపు',
      currentPrice: 8500,
      previousPrice: 8200,
      unit: 'per quintal',
      market: 'Nizamabad Turmeric Market',
      lastUpdated: '1 hour ago',
      trend: 'up'
    },
    {
      id: '6',
      crop: 'Chilli',
      localName: 'మిర్చి',
      currentPrice: 12000,
      previousPrice: 12500,
      unit: 'per quintal',
      market: 'Khammam Market',
      lastUpdated: '2 hours ago',
      trend: 'down'
    }
  ]);

  useEffect(() => {
    speak(`${t('market_prices')} from local mandis`);
  }, [speak, t]);

  useEffect(() => {
    if (transcript && isVoiceSearching && !isListening) {
      setSearchTerm(transcript);
      setIsVoiceSearching(false);
    }
  }, [transcript, isListening, isVoiceSearching]);

  const filteredPrices = marketPrices.filter(price =>
    price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    price.localName.includes(searchTerm)
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const speakPriceDetails = (price: MarketPrice) => {
    const priceDiff = price.currentPrice - price.previousPrice;
    const trendText = price.trend === 'up' ? 'increased' : price.trend === 'down' ? 'decreased' : 'remained stable';
    const details = `${price.crop} current price is ${price.currentPrice} rupees ${price.unit} at ${price.market}. Price has ${trendText} by ${Math.abs(priceDiff)} rupees. Last updated ${price.lastUpdated}.`;
    speak(details);
  };

  const handleVoiceSearch = () => {
    setIsVoiceSearching(true);
    speak("Speak the crop name you want to search for");
    startListening();
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
                {t('market_prices')}
              </h1>
            </div>
            <VoiceButton 
              size="lg"
              onClick={() => speak(`Current ${t('market_prices')} from local mandis and markets`)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Search Bar */}
        <Card className="shadow-card mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for crop prices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <VoiceButton
                size="lg"
                isListening={isListening && isVoiceSearching}
                onClick={handleVoiceSearch}
              />
            </div>
          </CardContent>
        </Card>

        {/* Market Status */}
        <Card className="shadow-card mb-6 gradient-farm">
          <CardContent className="p-6 text-center text-primary-foreground">
            <h2 className="text-xl font-bold mb-2">Live Market Rates</h2>
            <p className="opacity-90">Updated from Telangana State Agricultural Marketing</p>
            <Badge className="bg-white/20 text-white border-0 mt-2">
              Last sync: {new Date().toLocaleTimeString()}
            </Badge>
          </CardContent>
        </Card>

        {/* Prices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrices.map((price) => (
            <Card key={price.id} className="shadow-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-primary">{price.crop}</div>
                    <div className="text-sm text-muted-foreground">{price.localName}</div>
                  </div>
                  <VoiceButton 
                    size="sm"
                    onClick={() => speakPriceDetails(price)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ₹{price.currentPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{price.unit}</div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {getTrendIcon(price.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                    {price.trend === 'up' && '+'}
                    {price.trend === 'down' && '-'}
                    {price.trend !== 'stable' && Math.abs(price.currentPrice - price.previousPrice)}
                    {price.trend === 'stable' && 'No change'}
                  </span>
                </div>

                <div className="space-y-2 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Market:</span>
                    <span className="font-medium">{price.market}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Previous Price:</span>
                    <span className="font-medium">₹{price.previousPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="font-medium">{price.lastUpdated}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => speak(`${price.crop} price trend and market analysis`)}
                >
                  Price Trend Analysis
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrices.length === 0 && (
          <Card className="shadow-card mt-6">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No crops found matching your search.</p>
            </CardContent>
          </Card>
        )}

        {/* Footer Note */}
        <Card className="shadow-card mt-6">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              📊 Prices are indicative and may vary at actual market transactions.
              Always verify current rates before making selling decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};