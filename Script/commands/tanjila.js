module.exports.config = {
  name: "tanjila",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Funny auto reply",
  commandCategory: "fun",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;

  const text = event.body.toLowerCase();

  if (
    text.includes("তানজিলা") ||
    text.includes("tanjila")
  ) {
    return api.sendMessage(
      "🥰 এই যে! তানজিলা আমাদের মুকুল বসের খুব প্রিয় মানুষ। 😎 কেউ বিরক্ত করো না, সবাই সম্মান দিয়ে কথা বলো। ❤️👑",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
