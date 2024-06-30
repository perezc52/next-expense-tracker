"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface DeleteTransactionResult {
  message?: string;
  error?: string;
}

export default async function deleteTransaction(transactionId: string): Promise<DeleteTransactionResult> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {

    await db.transaction.delete({
        where: {
            id: transactionId,
            userId,
        }
    })

    revalidatePath("/")

    return { message: "Transaction deleted" };
  } catch (error) {
    return {error: "Database error"}
  }
}
