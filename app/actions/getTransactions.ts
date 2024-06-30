"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transactions";

interface GetTransactionResult {
  transactions?: Transaction[];
  error?: string;
}

export default async function getTransactions(): Promise<GetTransactionResult> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { transactions };
  } catch (error) {
    return {error: "Database error"}
  }
}
