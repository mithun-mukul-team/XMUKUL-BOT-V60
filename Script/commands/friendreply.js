module.exports.config = {
  name: "friendreply",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Auto reply for names",
  commandCategory: "chat",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;

  const text = event.body.toLowerCase();

  if (
    text.includes("সজিব") ||
    text.includes("সিফাত") ||
    text.includes("রাহাত") ||
    text.includes("আসিফ") ||
    text.includes("sajib") ||
    text.includes("sifat") ||
    text.includes("rahat") ||
    text.includes("asif")
  ) {
    return api.sendMessage(
      "😝😩 এরা ক্রাশ নিয়ে বিজি আছে, বিরক্ত করিস না! 😂",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
