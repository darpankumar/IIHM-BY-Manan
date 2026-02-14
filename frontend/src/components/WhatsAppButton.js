import React from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '917206975263';
  const message = 'Hi! I would like to know more about your salon services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
      data-testid="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
