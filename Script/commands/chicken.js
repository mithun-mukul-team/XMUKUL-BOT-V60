const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "chicken",
    version: "1.0.0",
    author: "Mukul",
    countDown: 5,
    role: 0,
    category: "fun",
    shortDescription: "Funny Chicken",
    longDescription: "Turn your friend into a chicken",
    guide: "{pn} @mention | reply"
  },

  onStart: async function ({ api, event, message }) {

    const { threadID, messageID, mentions, messageReply } = event;

    let targetID;

    if (Object.keys(mentions).length > 0)
      targetID = Object.keys(mentions)[0];
    else if (messageReply)
      targetID = messageReply.senderID;
    else
      return message.reply("🐔 একজনকে মেনশন অথবা রিপ্লাই করুন!");

    const cache = path.join(__dirname, "cache");
    fs.ensureDirSync(cache);

    const output = path.join(cache, `chicken_${Date.now()}.png`);

    try {

      const info = await api.getUserInfo(targetID);
      const name = info[targetID].name;

      const accessToken =
        "6628568379|c1e620fa708a1d5696fb991c1bde5662";

      const avatar =
        `https://graph.facebook.com/${targetID}/picture?width=512&height=512&access_token=${accessToken}`;

      // আপনার Chicken Banner Imgur Link
      const template = "https://i.imgur.com/BxcYL5i.jpeg";

      message.reply("🐔 Chicken বানানো হচ্ছে...");
const [bg, avatarImg] = await Promise.all([
  loadImage(template),
  loadImage(avatar)
]);

const canvas = createCanvas(bg.width, bg.height);
const ctx = canvas.getContext("2d");

// Background
ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

// Chicken Face Position
const x = 124;
const y = 123;
const size = 143;

// গোল করে DP বসানো
ctx.save();

ctx.beginPath();
ctx.arc(
  x + size / 2,
  y + size / 2,
  size / 2,
  0,
  Math.PI * 2
);

ctx.closePath();
ctx.clip();

ctx.drawImage(
  avatarImg,
  x,
  y,
  size,
  size
);

ctx.restore();

// White Border
ctx.beginPath();
ctx.arc(
  x + size / 2,
  y + size / 2,
  size / 2,
  0,
  Math.PI * 2
);

ctx.lineWidth = 8;
ctx.strokeStyle = "#ffffff";
ctx.stroke();

// Name
ctx.font = "bold 38px Arial";
ctx.fillStyle = "#ffffff";
ctx.fillText(name, 620, 150);

// Title
ctx.font = "bold 30px Arial";
ctx.fillStyle = "#FFD700";
ctx.fillText("🐔 CHICKEN COMMAND", 620, 200);
// Save Image
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(output, buffer);

const caption =
`🐔 CHICKEN REPORT 🐔

👤 নাম: ${name}

😂 অভিনন্দন!
আজ থেকে তুমি অফিসিয়ালি
"গ্রুপের কিউট মুরগি" 🐔

🥚 ডিম পাড়ার জন্য প্রস্তুত থাকো! 🤣

❤️ MUKUL BOT TIM™✓`;

return api.sendMessage(
{
body: caption,
mentions: [
{
tag: name,
id: targetID
}
],
attachment: fs.createReadStream(output)
},
threadID,
() => {
if (fs.existsSync(output))
fs.unlinkSync(output);
},
messageID
);
    } catch (err) {
      console.log("CHICKEN ERROR:", err);
      return message.reply("❌ Chicken পোস্টার তৈরি করা যায়নি!");
    }

  }
};
