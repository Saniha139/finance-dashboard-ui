"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  type Transaction,
  type TransactionType,
  type TransactionCategory,
  type UserProfile,
  initialTransactions,
  initialProfile,
} from "./data";

export type UserRole = "viewer" | "admin";

export type FilterType = "all" | "income" | "expense";

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (
    transaction: Omit<Transaction, "id">
  ) => void;
  updateTransaction: (
    id: string,
    transaction: Partial<Transaction>
  ) => void;
  deleteTransaction: (id: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  filterType: FilterType;
  setFilterType: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: "date" | "amount";
  setSortBy: (sort: "date" | "amount") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  filteredTransactions: Transaction[];
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const STORAGE_KEY = "finance-dashboard-data";

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [role, setRole] = useState<UserRole>("admin");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [darkMode, setDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTransactions(parsed.transactions || initialTransactions);
        setProfile(parsed.profile || initialProfile);
        setRole(parsed.role || "admin");
        setDarkMode(parsed.darkMode ?? true);
      } catch {
        setTransactions(initialTransactions);
        setProfile(initialProfile);
      }
    } else {
      setTransactions(initialTransactions);
      setProfile(initialProfile);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ transactions, profile, role, darkMode })
      );
    }
  }, [transactions, profile, role, darkMode, isLoaded]);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (
    id: string,
    updates: Partial<Transaction>
  ) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((t) => {
      if (filterType !== "all" && t.type !== filterType) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "date") {
        return (
          multiplier *
          (new Date(a.date).getTime() - new Date(b.date).getTime())
        );
      }
      return multiplier * (a.amount - b.amount);
    });

  if (!isLoaded) {
    return null;
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        role,
        setRole,
        filterType,
        setFilterType,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        darkMode,
        toggleDarkMode,
        totalBalance,
        totalIncome,
        totalExpenses,
        filteredTransactions,
        profile,
        updateProfile,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
