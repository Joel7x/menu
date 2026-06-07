"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "./menuData";

export interface SelectedItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderContextType {
  selectedItems: SelectedItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
  clearTray: () => void;
  getItemQuantity: (name: string) => number;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // Load selection from localStorage if available on the client
  useEffect(() => {
    const saved = localStorage.getItem("kapi-cafe-selection");
    if (saved) {
      try {
        setSelectedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved selection", e);
      }
    }
  }, []);

  const saveSelection = (items: SelectedItem[]) => {
    setSelectedItems(items);
    localStorage.setItem("kapi-cafe-selection", JSON.stringify(items));
  };

  const addItem = (item: MenuItem) => {
    const existing = selectedItems.find((i) => i.name === item.name);
    if (existing) {
      const updated = selectedItems.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveSelection(updated);
    } else {
      const updated = [...selectedItems, { name: item.name, price: item.price, quantity: 1 }];
      saveSelection(updated);
    }
  };

  const removeItem = (item: MenuItem) => {
    const existing = selectedItems.find((i) => i.name === item.name);
    if (!existing) return;
    if (existing.quantity === 1) {
      const updated = selectedItems.filter((i) => i.name !== item.name);
      saveSelection(updated);
    } else {
      const updated = selectedItems.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
      );
      saveSelection(updated);
    }
  };

  const clearTray = () => {
    saveSelection([]);
  };

  const getItemQuantity = (name: string) => {
    return selectedItems.find((i) => i.name === name)?.quantity || 0;
  };

  const getTotalQuantity = () => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        selectedItems,
        addItem,
        removeItem,
        clearTray,
        getItemQuantity,
        getTotalQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
