// src/types.ts
export interface TransactionData {
    transaction_id: number;
    full_name: string;
    phone: string;
    currency: string;
    amount: number;
    type: "sent" | "withdraw" | "deposit";
    status: "pending" | "approved" | "declined";
    timestamp: string;
  }
  
  export interface TransactionGroup {
    date: string;
    transactions: TransactionData[];
  }
  
  export interface TransactionsResponse {
    success: boolean;
    data: {
      page: number;
      total: number;
      per_page: number;
      previous_page: number | null;
      next_page: number | null;
      last_page: number;
      data: TransactionGroup[];
    };
  }