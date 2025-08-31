import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import '@/lib/i18n';
import { LanguageSelector } from '@/components/LanguageSelector';
import { WelcomePage } from '@/components/WelcomePage';
import { LoginPage } from '@/components/LoginPage';
import { CreateAccountPage } from '@/components/CreateAccountPage';
import { Dashboard } from '@/components/Dashboard';
import { SoilHealthPage } from '@/components/SoilHealthPage';
import { BestCropsPage } from '@/components/BestCropsPage';
import { MarketPricesPage } from '@/components/MarketPricesPage';
import { SmartGuidancePage } from '@/components/SmartGuidancePage';
import { AskAIPage } from '@/components/AskAIPage';
import { MyFarmPage } from '@/components/MyFarmPage';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SmartAgricultureApp = () => {
  const [currentStep, setCurrentStep] = useState<'language' | 'welcome' | 'login' | 'createAccount' | 'dashboard' | 'soil' | 'bestCrops' | 'marketPrices' | 'smartGuidance' | 'askAI' | 'myFarm'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user has previously selected language and logged in
    const savedLanguage = localStorage.getItem('smartAgriLanguage');
    const savedUser = localStorage.getItem('smartAgriUser');
    
    if (savedLanguage && savedUser) {
      setSelectedLanguage(savedLanguage);
      setUserData(JSON.parse(savedUser));
      setCurrentStep('dashboard');
    }
  }, []);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('smartAgriLanguage', language);
    setCurrentStep('welcome');
  };

  const handleWelcomeContinue = () => {
    setCurrentStep('login');
  };

  const handleLogin = (user: any) => {
    setUserData(user);
    localStorage.setItem('smartAgriUser', JSON.stringify(user));
    setCurrentStep('dashboard');
  };

  const handleCreateAccount = () => {
    setCurrentStep('createAccount');
  };

  const handleAccountCreated = (user: any) => {
    setUserData(user);
    localStorage.setItem('smartAgriUser', JSON.stringify(user));
    setCurrentStep('dashboard');
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
  };

  const handleNavigate = (page: string) => {
    const pageMap: Record<string, typeof currentStep> = {
      'my_soil': 'soil',
      'best_crops': 'bestCrops',
      'market_prices': 'marketPrices',
      'smart_guidance': 'smartGuidance',
      'ask_ai': 'askAI',
      'my_farm': 'myFarm'
    };
    setCurrentStep(pageMap[page] || 'dashboard');
  };

  const handleBack = () => {
    setCurrentStep('dashboard');
  };

  const handleBackToLanguage = () => {
    localStorage.removeItem('smartAgriLanguage');
    localStorage.removeItem('smartAgriUser');
    setSelectedLanguage('');
    setUserData(null);
    setCurrentStep('language');
  };

  const handleLogout = () => {
    localStorage.removeItem('smartAgriLanguage');
    localStorage.removeItem('smartAgriUser');
    setSelectedLanguage('');
    setUserData(null);
    setCurrentStep('language');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
  };

  if (currentStep === 'language') {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  if (currentStep === 'welcome') {
    return <WelcomePage onContinue={handleWelcomeContinue} onBackToLanguage={handleBackToLanguage} />;
  }

  if (currentStep === 'login') {
    return <LoginPage onLogin={handleLogin} onCreateAccount={handleCreateAccount} onBack={handleBackToWelcome} />;
  }

  if (currentStep === 'createAccount') {
    return <CreateAccountPage onAccountCreated={handleAccountCreated} onBack={handleBackToLogin} />;
  }

  if (currentStep === 'soil') {
    return <SoilHealthPage onBack={handleBack} />;
  }

  if (currentStep === 'bestCrops') {
    return <BestCropsPage onBack={handleBack} />;
  }

  if (currentStep === 'marketPrices') {
    return <MarketPricesPage onBack={handleBack} />;
  }

  if (currentStep === 'smartGuidance') {
    return <SmartGuidancePage onBack={handleBack} />;
  }

  if (currentStep === 'askAI') {
    return <AskAIPage onBack={handleBack} />;
  }

  if (currentStep === 'myFarm') {
    return <MyFarmPage onBack={handleBack} />;
  }

  if (currentStep === 'dashboard') {
    return <Dashboard onNavigate={handleNavigate} onBackToLanguage={handleBackToLanguage} onLogout={handleLogout} />;
  }

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<SmartAgricultureApp />} />
            <Route path="/blank" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
