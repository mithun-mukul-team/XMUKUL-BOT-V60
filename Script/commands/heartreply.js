module.exports.config = {
  name: "heartreply",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Auto reply for ♥️ emoji",
  commandCategory: "chat",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;

  const text = event.body.trim();

  if (text.includes("♥️") || text.includes("❤️")) {
    return api.sendMessage(
      "🥰🥰 আমার মুকুল বসের পক্ষ থেকে সবাইকে I Love You ❤️",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
