"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceInput } from "@/hooks/useVoiceInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function speakText(text: string, lang = "de-DE") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  // Prefer a German voice
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(v => v.lang.startsWith("de"));
  if (germanVoice) utterance.voice = germanVoice;
  window.speechSynthesis.speak(utterance);
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hallo! 👋 Ich bin dein Wortwende-Tutor. Stell mir eine Frage zu Deutsch – Grammatik, Vokabeln, oder lass uns zusammen üben! Auf welchem Niveau lernst du?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isListening, transcript, startListening, stopListening, supported: voiceSupported } =
    useVoiceInput({ lang: "de-DE" });

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Voice transcript → input
  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const messageText = (text ?? input).trim();
      if (!messageText || loading) return;

      const userMessage: Message = { role: "user", content: messageText };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      try {
        const response = await fetch("/api/tutor/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!response.ok) {
          const err = await response.json();
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: `❌ Fehler: ${err.error ?? "Unbekannter Fehler"}` },
          ]);
          setLoading(false);
          return;
        }

        // Stream reader
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let assistantContent = "";
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages(prev => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", content: assistantContent };
                  return copy;
                });
              }
              if (parsed.error) {
                assistantContent = `❌ ${parsed.error}`;
              }
            } catch {
              // skip
            }
          }
        }
      } catch (error) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `❌ Netzwerkfehler: ${error instanceof Error ? error.message : "Unbekannt"}`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  const handleSpeak = (text: string) => {
    setSpeaking(true);
    speakText(text);
    setTimeout(() => setSpeaking(false), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
          <Bot size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Wortwende Tutor</h2>
          <p className="text-xs text-muted-foreground">
            {loading ? "Schreibt..." : "Online · KI-gestützt"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-premium"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Bot size={15} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border/50 text-foreground rounded-bl-md shadow-sm"
              }`}
            >
              {msg.content || (loading && i === messages.length - 1 ? <Loader2 size={14} className="animate-spin" /> : null)}
              {msg.role === "assistant" && msg.content && !loading && (
                <button
                  onClick={() => handleSpeak(msg.content)}
                  className="ml-2 inline-flex items-center text-muted-foreground/60 hover:text-accent transition-colors"
                  title="Vorlesen"
                >
                  <Volume2 size={12} />
                </button>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <User size={15} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border/40 bg-card/50 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center gap-2">
          {voiceSupported && (
            <button
              onClick={() => (isListening ? stopListening() : startListening())}
              className={`p-2.5 rounded-xl transition-all shrink-0 ${
                isListening
                  ? "bg-accent text-white animate-pulse shadow-lg shadow-accent/30"
                  : "bg-secondary text-muted-foreground hover:text-accent hover:bg-accent-muted"
              }`}
              title={isListening ? "Aufnahme stoppen" : "Spracheingabe"}
            >
              {isListening ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
          )}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Höre zu..." : "Frag mich etwas auf Deutsch..."}
            disabled={loading}
            className="flex-1 bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            size="icon"
            className="rounded-xl shrink-0 bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20 h-10 w-10"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </div>
        {voiceSupported && (
          <p className="text-[10px] text-muted-foreground/50 mt-1.5 text-center">
            {isListening ? "🎤 Sprich jetzt..." : "Tippe oder sprich – der Tutor versteht beides."}
          </p>
        )}
      </div>
    </div>
  );
}
