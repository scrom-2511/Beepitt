import TelegramBot from "node-telegram-bot-api";
import { prisma } from "../database/prismaClient";

const token = process.env.TELEGRAM_BOT_ID!;

// Initialize Telegram bot in webhook mode
const bot = new TelegramBot(token, { webHook: true });

// Register webhook
bot.setWebHook("https://bin.h00k.dev/23986b84-e793-4f0a-a956-f4e5413cf1c0", {
  secret_token: "somthingiwilladd",
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hey tell give me the identifier key");
});

// Handle incoming messages
bot.on("message", async (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;

  const chatId = msg.chat.id.toString();
  const identifierKey = msg.text.trim();

  try {
    // Find user by identifier key
    const user = await prisma.user.findUnique({
      where: { identifierKey },
    });

    if (!user) {
      await bot.sendMessage(chatId, "Wrong identifier key.");
      return;
    }

    // Prisma transaction to handle concurrency safely
    await prisma.$transaction(async (tx) => {
      const contact = await tx.contactDetails.findUnique({
        where: { userId: user.id },
        select: { telegramChatIds: true },
      });

      // Create contact details if they do not exist
      if (!contact) {
        await tx.contactDetails.create({
          data: {
            userId: user.id,
            telegramChatIds: [chatId],
            discordChatIds: [],
          },
        });
        await bot.sendMessage(chatId, "Telegram account linked.");
        return;
      }

      // Prevent linking the same Telegram account twice
      if (contact.telegramChatIds.includes(chatId)) {
        throw new Error("ALREADY_LINKED");
      }

      const count = contact.telegramChatIds.length;

      // Enforce limit for Free users
      if (user.subscription_tier === "Free" && count >= 1) {
        throw new Error("FREE_LIMIT");
      }

      // Enforce limit for Premium users
      if (user.subscription_tier === "Premium" && count >= 4) {
        throw new Error("PREMIUM_LIMIT");
      }

      // Add Telegram chat ID
      await tx.contactDetails.update({
        where: { userId: user.id },
        data: {
          telegramChatIds: { push: chatId },
        },
      });
      await bot.sendMessage(chatId, "Telegram account linked.");
    });
  } catch (error: any) {
    // Handle known business errors
    switch (error.message) {
      case "ALREADY_LINKED":
        await bot.sendMessage(
          chatId,
          "This Telegram account is already linked.",
        );
        break;

      case "FREE_LIMIT":
        await bot.sendMessage(
          chatId,
          "Upgrade to premium to add more members.",
        );
        break;

      case "PREMIUM_LIMIT":
        await bot.sendMessage(
          chatId,
          "Maximum team members reached. Remove an existing one to add more.",
        );
        break;

      default:
        console.error(error);
        await bot.sendMessage(
          chatId,
          "Something went wrong. Please try again.",
        );
    }
  }
});

// Send alert messages to all linked Telegram chats
export const telegramBeep = async (telegramChatIds: string[]) => {
  try {
    if (!telegramChatIds.length) return;

    await Promise.allSettled(
      telegramChatIds.map((chatId) =>
        bot.sendMessage(chatId, "Backend error detected, please check it"),
      ),
    );
  } catch {
    // Ignore notification errors
  }
};
