import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface UseVoiceReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  isSupported: boolean;
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useVoice = (): UseVoiceReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const { i18n } = useTranslation();

  const isSupported = typeof window !== 'undefined' && 
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = getLanguageCode(i18n.language);

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    setRecognition(recognition);

    return () => {
      recognition.stop();
    };
  }, [isSupported, i18n.language]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setTranscript('');
      recognition.start();
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(i18n.language);
      
      // Try to use a specific voice for the language
      const voice = getVoiceForLanguage(i18n.language);
      if (voice) {
        utterance.voice = voice;
      }
      
      // Set speech parameters for better clarity
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      speechSynthesis.speak(utterance);
    }
  }, [i18n.language]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    isSupported
  };
};

const getLanguageCode = (language: string): string => {
  const languageMap: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN', 
    'te': 'te-IN'
  };
  return languageMap[language] || 'en-US';
};

// Function to get available voices for a language
const getVoiceForLanguage = (language: string): SpeechSynthesisVoice | null => {
  if (!('speechSynthesis' in window)) return null;
  
  const voices = speechSynthesis.getVoices();
  const langCode = getLanguageCode(language);
  
  // Try to find a voice for the specific language
  let voice = voices.find(v => v.lang === langCode);
  
  // Fallback to language without region code
  if (!voice) {
    const baseLang = langCode.split('-')[0];
    voice = voices.find(v => v.lang.startsWith(baseLang));
  }
  
  return voice || null;
};