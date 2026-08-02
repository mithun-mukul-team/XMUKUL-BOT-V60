module.exports.config = {
  name: "bombreply",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Auto reply for 💣 emoji",
  commandCategory: "chat",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;

  const text = event.body.trim();

  if (text.includes("💣")) {
    return api.sendMessage(
      "💣😩 বোম মেরে তোর গার্লফ্রেন্ডের বাসার ছাদ উড়াইয়া দিমু! 😂",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
