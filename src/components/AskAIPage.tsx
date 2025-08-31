import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VoiceButton } from '@/components/ui/voice-button';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AskAIPageProps {
  onBack: () => void;
}

export const AskAIPage = ({ onBack }: AskAIPageProps) => {
  const { t } = useTranslation();
  const { speak, startListening, isListening, transcript } = useVoice();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    speak(`${t('ask_ai')} assistant. Ask me anything about farming`);
    
    // Add welcome message
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your Smart Agriculture AI assistant. I can help you with farming advice, crop recommendations, pest control, weather guidance, and much more. What would you like to know?',
      timestamp: new Date()
    }]);
  }, [speak, t]);

  useEffect(() => {
    if (transcript && isVoiceInput && !isListening) {
      setInputText(transcript);
      setIsVoiceInput(false);
    }
  }, [transcript, isListening, isVoiceInput]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleVoiceInput = () => {
    setIsVoiceInput(true);
    speak("Ask your farming question");
    startListening();
  };

  const getAIResponse = async (question: string): Promise<string> => {
    // Simulate AI response based on common farming questions
    const responses: Record<string, string> = {
      'soil': 'Based on your soil health data, I recommend testing pH levels regularly and maintaining them between 6.0-7.5 for optimal crop growth. Consider adding organic matter to improve soil structure.',
      'water': 'For efficient water management, consider drip irrigation systems. Water your crops early morning or late evening to reduce evaporation. Monitor soil moisture regularly.',
      'pest': 'For pest control, use integrated pest management approaches. Neem-based pesticides are effective and organic. Regular field monitoring helps detect pest issues early.',
      'crop': 'Crop selection should be based on soil type, climate, water availability, and market demand. Consider diversifying crops to reduce risk and improve soil health.',
      'fertilizer': 'Use balanced NPK fertilizers based on soil test results. Organic fertilizers like compost and vermicompost improve long-term soil health.',
      'weather': 'Monitor weather forecasts regularly. Protect crops during extreme weather events. Adjust irrigation and fertilization schedules based on weather patterns.',
      'market': 'Track market prices regularly to make informed selling decisions. Consider value addition and direct marketing to improve profitability.',
      'organic': 'Organic farming requires 2-3 years transition period. Focus on soil health, use organic inputs, and implement biological pest control methods.'
    };

    // Find matching response
    const lowercaseQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseQuestion.includes(key)) {
        return response;
      }
    }

    // Default response
    return 'That\'s a great question! Based on modern agricultural practices, I recommend consulting with local agricultural experts and conducting soil tests for the most accurate advice. Would you like specific guidance on soil health, crop selection, or pest management?';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = await getAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      speak(aiResponse);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try asking your question again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'How to improve soil health?',
    'Best crops for my region?',
    'Pest control methods?',
    'Irrigation schedule?',
    'Market price trends?'
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="min-h-screen gradient-earth flex flex-col">
      {/* Header */}
      <div className="bg-card shadow-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">
                {t('ask_ai')}
              </h1>
            </div>
            <VoiceButton 
              size="lg"
              onClick={() => speak(`${t('ask_ai')} assistant ready to help with your farming questions`)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-4">
        {/* Quick Questions */}
        <Card className="shadow-card mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="shadow-card flex-1 flex flex-col">
          <CardContent className="flex-1 p-4 overflow-y-auto max-h-96">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="flex-1"
                disabled={isLoading}
              />
              <VoiceButton
                size="default"
                isListening={isListening && isVoiceInput}
                onClick={handleVoiceInput}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                size="icon"
                className="gradient-primary text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};