
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Bot, Send, User } from "lucide-react";
import type { ChatMessage } from '@/types';
import { mentorChat } from '@/ai/flows/mentor-chat-flow';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null); // Ref for the viewport div

  const initialMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'assistant',
    text: "Hello! I'm the Wisdom Bridge Python Learning Assistant. I'm here to help with your Python programming questions. Ask me anything about Python!",
    timestamp: new Date().toISOString(),
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);


  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: inputValue,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInputValue = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      console.log("[ChatbotWidget] Sending query to AI:", currentInputValue);
      const response = await mentorChat({ query: userMessage.text });
      console.log("[ChatbotWidget] Received AI response:", response);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: response.reply,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("[ChatbotWidget] Error calling AI flow:", error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: "Sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open Chatbot"
      >
        <Bot className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 flex flex-col h-[70vh] max-h-[600px] sm:h-[80vh] sm:max-h-[700px] rounded-lg shadow-xl">
          <DialogHeader className="p-4 pb-2 border-b">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-6 w-6 text-primary" /> Wisdom Bridge Python Assistant
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Ask me your Python programming questions.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-grow" viewportRef={scrollViewportRef}>
            <div className="space-y-4 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border bg-primary/10 text-primary flex items-center justify-center">
                      <AvatarImage src="" alt="AI Avatar" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm shadow-sm break-words ${ 
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-card-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                   {msg.role === 'user' && (
                    <Avatar className="h-8 w-8 border bg-secondary/20 text-secondary-foreground flex items-center justify-center">
                      <AvatarImage src="" alt="User Avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2.5 justify-start">
                   <Avatar className="h-8 w-8 border bg-primary/10 text-primary flex items-center justify-center">
                      <AvatarImage src="" alt="AI Avatar" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  <div className="max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm shadow-sm bg-muted text-card-foreground">
                    <span className="italic">Wisdom Bridge AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-3 border-t bg-background rounded-b-lg">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask about Python..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-grow h-10 rounded-md focus:ring-primary"
                aria-label="Chat message input"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 bg-primary hover:bg-primary/90"
                onClick={handleSendMessage} 
                disabled={isLoading || inputValue.trim() === ''}
                aria-label="Send message"
                >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
