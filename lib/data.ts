export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Salary"
  | "Freelance"
  | "Investments"
  | "Food & Dining"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Bills & Utilities"
  | "Healthcare"
  | "Travel"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  panNumber: string;
  bankAccount: string;
  ifscCode: string;
  upiId: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  memberSince: string;
}

export const categories: TransactionCategory[] = [
  "Salary",
  "Freelance",
  "Investments",
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Other",
];

export const incomeCategories: TransactionCategory[] = [
  "Salary",
  "Freelance",
  "Investments",
  "Other",
];

export const expenseCategories: TransactionCategory[] = [
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Other",
];

export const initialProfile: UserProfile = {
  name: "Saniha Manjunath",
  email: "sanihamanjunath139@gmail.com",
  phone: "+91 99999 99999",
  avatar: "",
  panNumber: "ABCDE1234F",
  bankAccount: "XXXX XXXX 4589",
  ifscCode: "HDFC0001234",
  upiId: "snm@okicici",
  address: "123, Sector 45",
  city: "Banagalore",
  state: "Karnataka",
  pincode: "1234567",
  memberSince: "January 2024",
};

export const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2026-04-01",
    description: "Monthly Salary",
    amount: 85000,
    type: "income",
    category: "Salary",
  },
  {
    id: "2",
    date: "2026-04-02",
    description: "Grocery Shopping - BigBasket",
    amount: 3250,
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: "3",
    date: "2026-04-03",
    description: "Netflix Subscription",
    amount: 649,
    type: "expense",
    category: "Entertainment",
  },
  {
    id: "4",
    date: "2026-04-04",
    description: "Freelance Project - Web Design",
    amount: 25000,
    type: "income",
    category: "Freelance",
  },
  {
    id: "5",
    date: "2026-04-05",
    description: "Electricity Bill - TATA Power",
    amount: 2800,
    type: "expense",
    category: "Bills & Utilities",
  },
  {
    id: "6",
    date: "2026-04-05",
    description: "Petrol - Indian Oil",
    amount: 2500,
    type: "expense",
    category: "Transportation",
  },
  {
    id: "7",
    date: "2026-03-28",
    description: "March Salary",
    amount: 85000,
    type: "income",
    category: "Salary",
  },
  {
    id: "8",
    date: "2026-03-25",
    description: "Amazon Shopping",
    amount: 8499,
    type: "expense",
    category: "Shopping",
  },
  {
    id: "9",
    date: "2026-03-20",
    description: "Dinner at Restaurant",
    amount: 2850,
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: "10",
    date: "2026-03-15",
    description: "Mutual Fund Dividend",
    amount: 12500,
    type: "income",
    category: "Investments",
  },
  {
    id: "11",
    date: "2026-03-10",
    description: "Gym Membership - Cult Fit",
    amount: 1999,
    type: "expense",
    category: "Healthcare",
  },
  {
    id: "12",
    date: "2026-03-05",
    description: "Weekend Trip - Manali",
    amount: 15000,
    type: "expense",
    category: "Travel",
  },
  {
    id: "13",
    date: "2026-02-28",
    description: "February Salary",
    amount: 85000,
    type: "income",
    category: "Salary",
  },
  {
    id: "14",
    date: "2026-02-20",
    description: "Jio Fiber Bill",
    amount: 1499,
    type: "expense",
    category: "Bills & Utilities",
  },
  {
    id: "15",
    date: "2026-02-15",
    description: "Ola/Uber Rides",
    amount: 2100,
    type: "expense",
    category: "Transportation",
  },
  {
    id: "16",
    date: "2026-02-10",
    description: "Freelance - App Development",
    amount: 35000,
    type: "income",
    category: "Freelance",
  },
  {
    id: "17",
    date: "2026-02-05",
    description: "IPL Tickets",
    amount: 5000,
    type: "expense",
    category: "Entertainment",
  },
  {
    id: "18",
    date: "2026-01-28",
    description: "January Salary",
    amount: 85000,
    type: "income",
    category: "Salary",
  },
  {
    id: "19",
    date: "2026-01-20",
    description: "Clothing - Myntra",
    amount: 6500,
    type: "expense",
    category: "Shopping",
  },
  {
    id: "20",
    date: "2026-01-15",
    description: "Doctor Consultation - Apollo",
    amount: 1500,
    type: "expense",
    category: "Healthcare",
  },
];

export const monthlyData = [
  { month: "Jan", income: 120000, expenses: 35000, balance: 85000 },
  { month: "Feb", income: 120000, expenses: 42000, balance: 163000 },
  { month: "Mar", income: 97500, expenses: 48000, balance: 212500 },
  { month: "Apr", income: 110000, expenses: 28000, balance: 294500 },
];
