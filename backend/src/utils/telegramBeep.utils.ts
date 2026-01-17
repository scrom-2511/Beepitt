import TelegramBot from "node-telegram-bot-api";
import { prisma } from "../database/prismaClient";

const token = process.env.TELEGRAM_BOT_ID!;
const bot = new TelegramBot(token, { webHook: true });
bot.setWebHook("https://bin.h00k.dev/23986b84-e793-4f0a-a956-f4e5413cf1c0", {
  secret_token: "somthingiwilladd",
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  console.log(chatId);

  bot.sendMessage(chatId, "Hey tell give me the identifier key");
});

bot.on("message", async (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;

  const chatId = msg.chat.id.toString();
  const identifierKey = msg.text;

  const user = await prisma.user.findUnique({
    where: { identifierKey },
  });

  if (!user) {
    await bot.sendMessage(chatId, "Wrong identifier key.");
    return;
  }

  const contact = await prisma.contactDetails.findUnique({
    where: { userId: user.id },
    select: { telegramChatIds: true },
  });

  if (!contact) {
    await prisma.contactDetails.create({
      data: {
        userId: user.id,
        telegramChatIds: [chatId],
        discordChatIds: [],
      },
    });

    await bot.sendMessage(chatId, "Telegram connected successfully.");
    return;
  }

  if (contact.telegramChatIds.includes(chatId)) {
    await bot.sendMessage(chatId, "This Telegram account is already linked.");
    return;
  }

  const count = contact.telegramChatIds.length;

  if (user.subscription_tier === "Free" && count >= 1) {
    await bot.sendMessage(chatId, "Upgrade to premium to add more members.");
    return;
  }

  if (user.subscription_tier === "Premium" && count >= 4) {
    await bot.sendMessage(
      chatId,
      "Maximum team members reached. To add another team member, you should remove an existing one.",
    );
    return;
  }

  await prisma.contactDetails.update({
    where: { userId: user.id },
    data: {
      telegramChatIds: {
        push: chatId,
      },
    },
  });

  await bot.sendMessage(chatId, "Telegram account linked.");
});

export const telegramBeep = async (telegramChatIds: string[]) => {
  try {
    if (!telegramChatIds.length) return;
    await Promise.allSettled(
      telegramChatIds.map((chatId) =>
        bot.sendMessage(chatId, "Backend error detected, please check it"),
      ),
    );
  } catch (error) {}
};
