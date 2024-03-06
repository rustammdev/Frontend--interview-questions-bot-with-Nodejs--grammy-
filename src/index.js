// env ni chaqiramiz
require("dotenv").config();
const {
  Bot,
  Keyboard,
  InlineKeyboard,
  GrammyError,
  HttpError,
} = require("grammy");
const { randomQuestion, getCorrectAnswear } = require("./components/utils");

// Keyboard - bu oddiy bosilganda ushbu textni qaytaruvchi text

// bot tokenini, env fayldan import qilamiz
const bot = new Bot(process.env.BOT_API_TOKEN);

bot.command("start", async (ctx) => {
  // Keyboardlarni sozlash
  const startKeyboar = new Keyboard()
    .text("HTML")
    .text("CSS")
    .row() // Keyingi qism yangi qatordan
    .text("JavaScript")
    .text("React")
    .resized(); // Minimallashtirilgan size

  await ctx.reply(
    "Salom! Men - Frontend Interview Question Bot 🤖 \n\nMen sizga fronted intervyuga tayyorlanishga yordam beraman"
  );

  // Keyboardni import qilish
  await ctx.reply("Bo'limlardan birini tanlang!", {
    reply_markup: startKeyboar,
  });
});

// Malum bir textlar uchun filter o'rnatish
bot.hears(["HTML", "CSS", "JavaScript", "React"], async (ctx) => {
  const topic = ctx.message.text;
  const question = randomQuestion(topic);

  let inlineKeyboard;

  if (question.hasOptions) {
    const buttonRows = question.options.map((option) => [
      InlineKeyboard.text(
        option.text,
        JSON.stringify({
          type: `${topic}-option`,
          isCorrect: option.isCorrect,
          questionId: question.id,
        })
      ),
    ]);

    inlineKeyboard = InlineKeyboard.from(buttonRows);
  } else {
    inlineKeyboard = new InlineKeyboard().text(
      "Get answear",
      JSON.stringify({
        type: topic,
        questionId: question.id,
      })
    );
  }
  await ctx.reply(question.text, {
    reply_markup: inlineKeyboard,
  });
});

bot.on("callback_query:data", async (ctx) => {
  // Qaytgan qiymatni qayta json formatga o'tkizami
  const callbackData = JSON.parse(ctx.callbackQuery.data);

  if (!callbackData.type.includes("option")) {
    const answear = getCorrectAnswear(
      callbackData.type,
      callbackData.questionId
    );
    await ctx.reply(answear);
    await ctx.answerCallbackQuery();
  }
});

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
