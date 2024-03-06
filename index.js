// env ni chaqiramiz
require("dotenv").config();
const { Bot } = require("grammy");

// bot tokenini, env fayldan import qilamiz
const bot = new Bot(process.env.BOT_API_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Salom! Men - Frontend Interview Question Bot 🤖 \n\nMen sizga fronted intervyuga tayyorlanishinga yordam beraman"
  );
});

bot.hears('HTML', async (ctx) => {
    await ctx.reply("HTML o'zi nima!")
})

bot.start();
