// env ni chaqiramiz
require("dotenv").config();
const { Bot, GrammyError, HttpError } = require("grammy");

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


// Error
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});


bot.start();
