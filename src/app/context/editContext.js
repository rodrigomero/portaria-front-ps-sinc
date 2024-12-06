"use client";

import { createContext, useState } from "react";

export const EditContext = createContext({});

// eslint-disable-next-line react/prop-types
export const EditProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <EditContext.Provider
      value={{ formData, setFormData, isModalOpen, setIsModalOpen }}
    >
      {children}
    </EditContext.Provider>
  );
};
