import { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  Image as ImageIcon,
  Globe,
  ChevronRight,
  Loader2,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const LANGUAGES = {
  english: {
    name: 'English',
    welcome: 'Welcome! How can I assist you today?',
    steps: [
      'To apply for a driver\'s license, first gather your identification documents.',
      'Next, fill out the application form. You can say "Show form" to see an example.',
      'Visit your local DMV office. Say "Find nearest office" for locations.',
      'Take the written test and eye exam at the DMV.',
      'Finally, take the driving test. Good luck!',
    ],
  },
  spanish: {
    name: 'Español',
    welcome: '¡Bienvenido! ¿Cómo puedo ayudarte hoy?',
    steps: [
      'Para solicitar una licencia de conducir, primero reúna sus documentos de identificación.',
      'Luego, complete el formulario de solicitud. Puede decir "Mostrar formulario" para ver un ejemplo.',
      'Visite su oficina local del DMV. Diga "Encontrar oficina más cercana" para ver ubicaciones.',
      'Realice el examen escrito y el examen de la vista en el DMV.',
      '¡Finalmente, tome el examen de manejo. ¡Buena suerte!',
    ],
  },
  french: {
    name: 'Français',
    welcome: 'Bienvenue ! Comment puis-je vous aider aujourd\'hui ?',
    steps: [
      'Pour demander un permis de conduire, rassemblez d\'abord vos documents d\'identité.',
      'Ensuite, remplissez le formulaire de demande. Dites "Afficher le formulaire" pour voir un exemple.',
      'Visitez votre bureau DMV local. Dites "Trouver le bureau le plus proche" pour les emplacements.',
      'Passez l\'examen écrit et l\'examen de la vue au DMV.',
      'Enfin, passez l\'examen de conduite. Bonne chance !',
    ],
  },
  swahili: {
    name: 'Kiswahili',
    welcome: 'Karibu! Nawezaje kukusaidia leo?',
    steps: [
      'Ili kuomba leseni ya udereva, kwanza kusanya nyaraka zako za utambulisho.',
      'Kisha, jaza fomu ya maombi. Unaweza kusema "Onyesha fomu" kuona mfano.',
      'Tembelea ofisi yako ya karibu ya DMV. Sema "Tafuta ofisi ya karibu" kwa maeneo.',
      'Fanya mtihani wa maandishi na uchunguzi wa macho katika DMV.',
      'Mwisho, fanya mtihani wa kuendesha gari. Kila la kheri!',
    ],
  },
};

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [conversation, setConversation] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setConversation([LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].welcome]);
  }, [selectedLanguage]);

  const handleMicClick = async () => {
    setIsListening(!isListening);
    if (!isListening) {
      setIsProcessing(true);
      // Simulate voice processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (currentStep < LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].steps.length) {
        setConversation((prev) => [
          ...prev,
          LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].steps[currentStep],
        ]);
        setCurrentStep((prev) => prev + 1);
      }
      setIsProcessing(false);
      setIsListening(false);
    }
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setCurrentStep(0);
    toast({
      title: 'Language Changed',
      description: `Switched to ${LANGUAGES[value as keyof typeof LANGUAGES].name}`,
    });
  };

  const handleScanDocument = () => {
    toast({
      title: 'Scanner Active',
      description: 'Position your document in front of the camera',
    });
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setConversation([LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].welcome]);
    toast({
      title: 'Reset Complete',
      description: 'Starting a new conversation',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-background/95 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Public Services Assistant
        </CardTitle>
        <CardDescription>Voice-activated guide in multiple languages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Select onValueChange={handleLanguageChange} defaultValue={selectedLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ScrollArea className="h-[300px] rounded-md border p-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg ${
                  index === conversation.length - 1
                    ? 'bg-primary/10 font-medium'
                    : 'bg-muted'
                }`}
              >
                {message}
              </div>
            ))}
            {isProcessing && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            )}
          </ScrollArea>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleScanDocument}
              className="h-12 w-12"
            >
              <Camera className="h-5 w-5" />
              <span className="sr-only">Scan Document</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => {
                toast({
                  title: 'Translation Active',
                  description: 'Speak in any language',
                });
              }}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Translate</span>
            </Button>
            <Button
              variant={isListening ? 'destructive' : 'default'}
              size="icon"
              onClick={handleMicClick}
              className="h-12 w-12"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => {
                toast({
                  title: 'Text-to-Speech Active',
                  description: 'Speaking current message',
                });
              }}
            >
              <Volume2 className="h-5 w-5" />
              <span className="sr-only">Text to Speech</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full gap-2"
          variant="secondary"
          onClick={handleStartOver}
        >
          <ChevronRight className="h-4 w-4" /> Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}