import axios from "axios";

export const sendContactMessage = async (values) => {
  const { name, contactType, ...contactDetails } = values;

  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  // console.log('botToken', botToken, 'chatId', chatId);
  

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const details = {
    email: `Email: ${contactDetails.email}`,
    telegram: `Telegram: ${contactDetails.telegram}`,
    whatsapp: `WhatsApp: ${contactDetails.whatsapp}`,
    skype: `Skype: ${contactDetails.skype}`,
  }

  const text = `
    New message from ${name} \n\nContact Type: ${contactType.toUpperCase()} \n\n${details[contactType]}
  `;

  try {
    // Send the message via the Telegram Bot API
    const response = await axios.post(telegramUrl, {
      chat_id: chatId,
      text: text,
    });

    if (response.data.ok) {
      console.log('Message sent successfully!');
    } else {
      console.error('Failed to send message.');
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
};