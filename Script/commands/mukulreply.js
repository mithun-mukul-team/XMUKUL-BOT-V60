module.exports.config = {
  name: "mukulreply",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Auto reply when someone says Mukul",
  commandCategory: "chat",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;

  const text = event.body.toLowerCase().trim();

  if (
    text.includes("মুকুল") ||
    text.includes("mukul")
  ) {
    return api.sendMessage(
      "🥰💣 আমার বস মুকুল বিজি আছে, যা বলার আমাকে বলো।",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
