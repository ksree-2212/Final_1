import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Language Selection
      "choose_language": "Choose Your Language",
      "tap_to_choose": "Tap to choose your language",
      "language_preview": "This is how Smart Agriculture sounds in {{language}}",
      
      // Navigation
      "dashboard": "Dashboard",
      "my_soil": "My Soil",
      "best_crops": "Best Crops",
      "market_prices": "Market Prices",
      "smart_guidance": "Smart Guidance",
      "ask_ai": "Ask AI",
      "my_farm": "My Farm",
      
      // Authentication
      "login": "Login",
      "welcome_back": "Welcome Back",
      "enter_token": "Enter your access token",
      "create_account": "Create New Account",
      "invalid_token": "Invalid access token",
      
      // Dashboard
      "welcome_farmer": "Welcome, Farmer!",
      "your_location": "Your Location",
      "sync_status": "Sync Status",
      "online": "Online",
      "offline": "Offline",
      
      // Soil Health
      "soil_health": "Soil Health",
      "soil_ph": "Soil pH",
      "nitrogen": "Nitrogen (N)",
      "phosphorus": "Phosphorus (P)",
      "potassium": "Potassium (K)",
      "moisture": "Moisture",
      "excellent": "Excellent",
      "good": "Good",
      "fair": "Fair",
      "poor": "Poor",
      "update_soil_data": "Update Soil Data",
      "speak_soil_ph": "Speak your soil pH value",
      
      // Voice Commands
      "voice_command": "Voice Command",
      "listening": "Listening...",
      "speak_now": "Speak now",
      "voice_not_supported": "Voice recognition not supported",
      
      // General
      "save": "Save",
      "cancel": "Cancel",
      "update": "Update",
      "back": "Back",
      "next": "Next",
      "settings": "Settings"
    }
  },
  hi: {
    translation: {
      // Language Selection
      "choose_language": "अपनी भाषा चुनें",
      "tap_to_choose": "अपनी भाषा चुनने के लिए टैप करें",
      "language_preview": "स्मार्ट कृषि {{language}} में इस प्रकार लगती है",
      
      // Navigation
      "dashboard": "डैशबोर्ड",
      "my_soil": "मेरी मिट्टी",
      "best_crops": "सर्वोत्तम फसलें",
      "market_prices": "बाजार मूल्य",
      "smart_guidance": "स्मार्ट मार्गदर्शन",
      "ask_ai": "AI से पूछें",
      "my_farm": "मेरा खेत",
      
      // Authentication
      "login": "लॉगिन",
      "welcome_back": "वापस स्वागत है",
      "enter_token": "अपना एक्सेस टोकन दर्ज करें",
      "create_account": "नया खाता बनाएं",
      "invalid_token": "अमान्य एक्सेस टोकन",
      
      // Dashboard
      "welcome_farmer": "स्वागत है, किसान जी!",
      "your_location": "आपका स्थान",
      "sync_status": "सिंक स्थिति",
      "online": "ऑनलाइन",
      "offline": "ऑफलाइन",
      
      // Soil Health
      "soil_health": "मिट्टी का स्वास्थ्य",
      "soil_ph": "मिट्टी pH",
      "nitrogen": "नाइट्रोजन (N)",
      "phosphorus": "फॉस्फोरस (P)",
      "potassium": "पोटेशियम (K)",
      "moisture": "नमी",
      "excellent": "उत्कृष्ट",
      "good": "अच्छा",
      "fair": "ठीक",
      "poor": "खराब",
      "update_soil_data": "मिट्टी डेटा अपडेट करें",
      "speak_soil_ph": "अपनी मिट्टी का pH मान बोलें",
      
      // Voice Commands
      "voice_command": "आवाज कमांड",
      "listening": "सुन रहा है...",
      "speak_now": "अब बोलें",
      "voice_not_supported": "आवाज पहचान समर्थित नहीं है",
      
      // General
      "save": "सेव करें",
      "cancel": "रद्द करें",
      "update": "अपडेट करें",
      "back": "वापस",
      "next": "आगे",
      "settings": "सेटिंग्स"
    }
  },
  te: {
    translation: {
      // Language Selection
      "choose_language": "మీ భాషను ఎంచుకోండి",
      "tap_to_choose": "మీ భాషను ఎంచుకోవడానికి ట్యాప్ చేయండి",
      "language_preview": "స్మార్ట్ వ్యవసాయం {{language}} లో ఇలా ఉంటుంది",
      
      // Navigation
      "dashboard": "డాష్‌బోర్డ్",
      "my_soil": "నా మట్టి",
      "best_crops": "ఉత్తమ పంటలు",
      "market_prices": "మార్కెట్ ధరలు",
      "smart_guidance": "స్మార్ట్ మార్గదర్శకత్వం",
      "ask_ai": "AI ని అడగండి",
      "my_farm": "నా వ్యవసాయ క్షేత్రం",
      
      // Authentication
      "login": "లాగిన్",
      "welcome_back": "తిరిగి స్వాగతం",
      "enter_token": "మీ యాక్సెస్ టోకెన్ నమోదు చేయండి",
      "create_account": "కొత్త ఖాతా సృష్టించండి",
      "invalid_token": "చెల్లని యాక్సెస్ టోకెన్",
      
      // Dashboard
      "welcome_farmer": "స్వాగతం, రైతు గారు!",
      "your_location": "మీ స్థానం",
      "sync_status": "సింక్ స్థితి",
      "online": "ఆన్‌లైన్",
      "offline": "ఆఫ్‌లైన్",
      
      // Soil Health
      "soil_health": "మట్టి ఆరోగ్యం",
      "soil_ph": "మట్టి pH",
      "nitrogen": "నైట్రోజన్ (N)",
      "phosphorus": "ఫాస్ఫరస్ (P)",
      "potassium": "పొటాషియం (K)",
      "moisture": "తేమ",
      "excellent": "అద్భుతమైన",
      "good": "మంచి",
      "fair": "సరైన",
      "poor": "చెడు",
      "update_soil_data": "మట్టి డేటా అప్‌డేట్ చేయండి",
      "speak_soil_ph": "మీ మట్టి pH విలువను చెప్పండి",
      
      // Voice Commands
      "voice_command": "వాయిస్ కమాండ్",
      "listening": "వింటున్నాను...",
      "speak_now": "ఇప్పుడు మాట్లాడండి",
      "voice_not_supported": "వాయిస్ గుర్తింపు మద్దతు లేదు",
      
      // General
      "save": "సేవ్ చేయండి",
      "cancel": "రద్దు చేయండి",
      "update": "అప్‌డేట్ చేయండి",
      "back": "వెనుకకు",
      "next": "తదుపరి",
      "settings": "సెట్టింగ్‌లు"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;