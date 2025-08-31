import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VoiceButton } from '@/components/ui/voice-button';
import { Volume2 } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' }
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

export const LanguageSelector = ({ onLanguageSelect }: LanguageSelectorProps) => {
  const { t, i18n } = useTranslation();
  const { speak } = useVoice();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    onLanguageSelect(languageCode);
  };

  const previewLanguage = (language: Language) => {
    const previews: Record<string, string> = {
      'en': 'This is how Smart Agriculture sounds in English',
      'hi': 'यह स्मार्ट कृषि हिंदी में कैसी लगती है',
      'te': 'స్మార్ట్ వ్యవసాయం తెలుగులో ఇలా ఉంటుంది'
    };
    
    // Temporarily change language for preview
    const currentLang = i18n.language;
    i18n.changeLanguage(language.code);
    speak(previews[language.code] || previews['en']);
    i18n.changeLanguage(currentLang);
  };

  return (
    <div className="min-h-screen gradient-earth flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {t('choose_language')}
            </h1>
            <p className="text-muted-foreground">
              {t('tap_to_choose')}
            </p>
          </div>

          <div className="space-y-4">
            {languages.map((language) => (
              <div key={language.code} className="relative">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleLanguageSelect(language.code)}
                  className="w-full h-16 text-left justify-start border-2 hover:border-primary hover:shadow-card transition-all duration-300"
                >
                  <span className="text-2xl mr-4">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{language.nativeName}</div>
                    <div className="text-sm text-muted-foreground">{language.name}</div>
                  </div>
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => previewLanguage(language)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              🌱 Smart Agriculture PWA
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};