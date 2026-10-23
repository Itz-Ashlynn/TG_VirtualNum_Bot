import { api } from 'sdk';

export default async function (input, ctx) {
  const me = await api.getMe();

  const descRes = await api.setMyDescription({
    description: "Welcome to Elite Virtual Number Bot! 🚀\n\nGenerate temporary virtual numbers, receive online SMS verifications and OTP codes in real time across 50+ countries.\n\n🌐 Co-Hosted WebApp: https://app8941571523.tgcloud.ai/\n⚡ Powered by Telegram Serverless V8"
  });

  const shortDescRes = await api.setMyShortDescription({
    short_description: "Free Virtual Numbers & Real-Time SMS Verification OTP Bot • TG Serverless V8"
  });

  const menuRes = await api.setChatMenuButton({
    menu_button: {
      type: "web_app",
      text: "⚡ Mini App",
      web_app: {
        url: "https://app8941571523.tgcloud.ai/"
      }
    }
  });

  return {
    ok: true,
    bot: me,
    description: descRes,
    shortDescription: shortDescRes,
    chatMenuButton: menuRes,
  };
}
