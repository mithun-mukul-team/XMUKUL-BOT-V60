const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "voice",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "বাংলা Voice",
  commandCategory: "media",
  usages: "voice <লেখা>",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  if (!args[0]) {
    return api.sendMessage(
      "ব্যবহার:\nvoice হ্যালো জান কেমন আছো",
      event.threadID,
      event.messageID
    );
  }

  const text = args.join(" ");
  const filePath = __dirname + "/cache/voice.mp3";

  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=bn&client=tw-ob`;

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  writer.on("finish", () => {
    api.sendMessage(
      {
        body: "🎤 বাংলা ভয়েস",
        attachment: fs.createReadStream(filePath)
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  });
};
