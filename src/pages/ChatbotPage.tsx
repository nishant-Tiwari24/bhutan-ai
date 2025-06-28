import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Mic, MicOff, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
  useSidebar,
} from "../components/ui/sidebar";

const DUMMY_MESSAGES = [
  { sender: "user", text: "Hello!" },
  { sender: "bot", text: "Kuzu zangpo! How can BhutanAI assist you today?" },
];

const LANGUAGES = [
  { code: "dz", name: "Dzongkha", flag: "🇧🇹" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ne", name: "Nepali", flag: "🇳🇵" },
  { code: "sh", name: "Sharchop", flag: "🇧🇹" },
];

const VoiceAnimation = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}${isActive ? ' pointer-events-none' : ''}`}>
      <div className="relative">
        {/* Main voice wave container */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          
          {/* Outer wave ring */}
          <div className={`absolute w-48 h-48 rounded-full border-2 border-pulse-400/40 animate-ping ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ animationDuration: '2s' }}></div>
          
          {/* Middle wave ring */}
          <div className={`absolute w-36 h-36 rounded-full border-2 border-pulse-400/60 animate-ping ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}></div>
          
          {/* Inner wave ring */}
          <div className={`absolute w-24 h-24 rounded-full border-2 border-pulse-400/80 animate-ping ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ animationDuration: '1s', animationDelay: '1s' }}></div>
          
          {/* Central microphone icon with glow */}
          <div className={`relative w-20 h-20 bg-gradient-to-br from-pulse-500 to-pulse-600 rounded-full flex items-center justify-center shadow-2xl ${isActive ? 'animate-pulse' : ''}`} style={{ animationDuration: '1.5s' }}>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pulse-400 to-pulse-600 rounded-full blur-lg opacity-50 animate-pulse" style={{ animationDuration: '2s' }}></div>
            
            {/* Inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-pulse-300 to-pulse-500 rounded-full blur-sm opacity-70"></div>
            
            {/* Microphone icon */}
            <Mic className="text-white z-10" size={28} />
          </div>
        </div>
        
        {/* Floating voice waves */}
        {isActive && (
          <>
            {/* Top wave */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-10 bg-gradient-to-r from-transparent via-pulse-400/30 to-transparent rounded-full animate-pulse" style={{ animationDuration: '1.2s' }}></div>
            
            {/* Bottom wave */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-r from-transparent via-pulse-400/40 to-transparent rounded-full animate-pulse" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }}></div>
            
            {/* Left wave */}
            <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 w-8 h-20 bg-gradient-to-b from-transparent via-pulse-400/30 to-transparent rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0.6s' }}></div>
            
            {/* Right wave */}
            <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-b from-transparent via-pulse-400/40 to-transparent rounded-full animate-pulse" style={{ animationDuration: '1.3s', animationDelay: '0.9s' }}></div>
          </>
        )}
        
        {/* Orbiting particles */}
        {isActive && (
          <>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pulse-300 rounded-full animate-bounce" style={{ animationDuration: '1.2s' }}></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pulse-400 rounded-full animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-pulse-500 rounded-full animate-bounce" style={{ animationDuration: '1.3s', animationDelay: '0.8s' }}></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 bg-pulse-300 rounded-full animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '1.1s' }}></div>
          </>
        )}
      </div>
      
      {/* Voice status with better styling */}
      <div className={`text-center mt-10 ${isActive ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <div className="w-4 h-4 bg-pulse-500 rounded-full animate-pulse mr-3"></div>
            <p className="text-xl font-semibold text-white">Listening...</p>
          </div>
          
          <p className="text-pulse-200 mb-4">Speak now</p>
          
          {/* Simple animated dots */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-pulse-400 rounded-full animate-bounce" style={{ animationDuration: '1s' }}></div>
            <div className="w-2 h-2 bg-pulse-400 rounded-full animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pulse-400 rounded-full animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating trigger component
const FloatingSidebarTrigger = () => {
  const { state, isMobile } = useSidebar();
  // Only show when sidebar is collapsed (desktop) or closed (mobile)
  if (state === "expanded" && !isMobile) return null;
  return (
    <div className="fixed top-4 left-4 z-[1000] pointer-events-auto">
      <SidebarTrigger className="bg-white/80 hover:bg-white text-pulse-600 shadow-lg border border-pulse-200 pointer-events-auto" />
    </div>
  );
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [input, setInput] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("dz");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const OPENAI_API_KEY = "";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageToOpenAI = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const languageNames = {
        dz: "Dzongkha",
        en: "English", 
        ne: "Nepali",
        sh: "Sharchop"
      };

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are BhutanAI, a helpful AI assistant for Bhutan. Always respond in ${languageNames[selectedLanguage as keyof typeof languageNames]} language. Be culturally appropriate and helpful. Keep responses concise and friendly.`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const botResponse = data.choices[0].message.content;
        setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
      } else {
        throw new Error('No response from OpenAI');
      }
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // For now, we'll simulate voice-to-text
        // In a real implementation, you'd send this to a speech-to-text service
        const simulatedText = "Hello BhutanAI, how are you today?";
        setMessages(prev => [...prev, { sender: "user", text: simulatedText }]);
        await sendMessageToOpenAI(simulatedText);
        setIsVoiceActive(false);
      };

      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      recorder.start();
      setIsVoiceActive(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use voice features.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    setIsVoiceActive(false);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();
      setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
      setInput("");
      await sendMessageToOpenAI(userMessage);
    }
  };

  return (
    <SidebarProvider>
      {/* Floating trigger for collapsed sidebar */}
      <FloatingSidebarTrigger />
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url("/Header-background.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <Sidebar side="left" collapsible="offcanvas" className="bg-white/10 backdrop-blur-md border-r border-white/20 z-10" >
          <SidebarHeader className="flex items-center justify-between p-4 border-b border-white/20">
            {/* <span className="text-lg font-bold text-white">BhutanAI</span> */}
            <SidebarTrigger className="ml-2" />
          </SidebarHeader>
          <SidebarContent className="flex-1 p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Chat">Chat</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Language">Language</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Laws">Laws</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator className="my-4" />
            {/* Add more sidebar content here if needed */}
          </SidebarContent>
        </Sidebar>
        {/* Main Content */}
        <div className="flex flex-1 min-h-screen z-10">
          <div className="flex flex-col flex-1">
            <Navbar hideBrand />
            <main className="flex-1 flex items-center justify-center px-4 py-8">
              <Card className={`w-full max-w-2xl flex flex-col h-[70vh] shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 ${isVoiceActive ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}>
                {/* Language Selector */}
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Globe className="text-white" size={20} />
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-48 bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-[70%] text-base font-medium shadow-lg backdrop-blur-sm ${
                          msg.sender === "user"
                            ? "bg-pulse-500/90 text-white rounded-br-none border border-pulse-400/30"
                            : "bg-white/20 text-gray-900 rounded-bl-none border border-white/30"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="px-4 py-2 rounded-2xl bg-white/20 text-gray-900 rounded-bl-none border border-white/30 shadow-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pulse-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-pulse-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-pulse-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form
                  className="flex items-center gap-2 border-t border-white/20 px-4 py-3 bg-white/10 backdrop-blur-sm"
                  onSubmit={handleSubmit}
                >
                  <Input
                    className="flex-1 bg-white/20 border-white/30 text-gray-900 placeholder-gray-600 backdrop-blur-sm focus:bg-white/30"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                  />
                  <Button
                    type="button"
                    onClick={toggleVoice}
                    disabled={isLoading}
                    className={`rounded-full p-3 transition-all duration-300 ${
                      isVoiceActive
                        ? 'bg-red-500/90 text-white border border-red-400/30 hover:bg-red-600/90'
                        : 'bg-pulse-500/90 text-white border border-pulse-400/30 hover:bg-pulse-600/90'
                    } backdrop-blur-sm`}
                  >
                    {isVoiceActive ? <MicOff size={20} /> : <Mic size={20} />}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-pulse-500/90 text-white rounded-full px-6 backdrop-blur-sm border border-pulse-400/30 hover:bg-pulse-600/90 disabled:opacity-50"
                  >
                    Send
                  </Button>
                </form>
              </Card>
            </main>
            {/* Voice Animation Overlay */}
            <VoiceAnimation isActive={isVoiceActive} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ChatbotPage; 