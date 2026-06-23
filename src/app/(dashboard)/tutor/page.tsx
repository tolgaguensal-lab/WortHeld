import { AIChat } from "@/components/ai/AIChat";

export const metadata = {
  title: "KI-Tutor – Wortwende",
  description: "Dein persönlicher Deutsch-Tutor – frag, übe, lerne mit KI.",
};

export default function TutorPage() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <AIChat />
    </div>
  );
}
