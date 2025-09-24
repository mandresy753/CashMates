import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  PlusIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";

import { useTransactions } from "../hooks/useTransactions";
import { defaultCategories } from "../lib/supabase";
import TransactionForm from "../components/TransactionForm";
import { format, subDays, startOfDay } from "date-fns";

const Dashboard = () => {
  const { transactions, loading, addTransaction, getStats } = useTransactions();
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const stats = getStats();

  const expenseData = Object.entries(stats.expensesByCategory).map(([category, amount]) => {
    const categoryInfo = defaultCategories.find(cat => cat.name === category);
    return {
      name: category,
      value: amount,
      color: categoryInfo?.color || "#8884d8"
    };
  });

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dayTransactions = transactions.filter(
      t => startOfDay(new Date(t.date)).getTime() === date.getTime()
    );

    const dailyIncome = dayTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const dailyExpenses = dayTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      date: format(date, "MMM dd"),
      income: dailyIncome,
      expenses: dailyExpenses
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Financial Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your expenses and manage your finances efficiently
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowIncomeForm(true)}
          className="flex items-center justify-center px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Income
        </motion.button>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowExpenseForm(true)}
          className="flex items-center justify-center px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Expense
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</p>
              <p className="text-3xl font-bold text-green-600">${stats.totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600">${stats.totalExpenses.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <ArrowTrendingDownIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Balance</p>
              <p className={`text-3xl font-bold ${stats.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${stats.balance.toFixed(2)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stats.balance >= 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
              <BanknotesIcon className={`w-6 h-6 ${stats.balance >= 0 ? "text-green-600" : "text-red-600"}`} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Expenses by Category */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Expenses by Category</h3>
          {expenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={value => [`$${Number(value).toFixed(2)}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-300 text-gray-500 dark:text-gray-400">
              No expense data available
            </div>
          )}
        </motion.div>

        {/* Income vs Expenses Trend */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">7-Day Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={value => `$${value}`} />
              <Tooltip formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]} contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#F9FAFB" }} />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981" }} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} dot={{ fill: "#EF4444" }} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Transactions</h3>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.slice(0, 5).map(transaction => {
              const categoryInfo = defaultCategories.find(cat => cat.name === transaction.category);
              return (
                <motion.div key={transaction.id} whileHover={{ x: 5 }} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{categoryInfo?.icon || "📊"}</div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{transaction.category}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(transaction.date), "MMM dd, yyyy")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No transactions yet. Add your first transaction to get started!
          </div>
        )}
      </motion.div>

      {/* Transaction Forms */}
      <TransactionForm isOpen={showIncomeForm} onClose={() => setShowIncomeForm(false)} onSubmit={addTransaction} type="income" title="Add Income" />
      <TransactionForm isOpen={showExpenseForm} onClose={() => setShowExpenseForm(false)} onSubmit={addTransaction} type="expense" title="Add Expense" />
    </div>
  );
};

export default Dashboard;
