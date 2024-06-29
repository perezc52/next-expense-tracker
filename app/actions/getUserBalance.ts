"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

interface BalanceResult {
  balance?: number;
  error?: string;
}

export default async function getUserBalance(): Promise<BalanceResult> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return { balance };
  } catch (error) {
    return {error: "Database error"}
  }
}
