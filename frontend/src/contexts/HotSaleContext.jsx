import React, { createContext, useContext, useEffect, useState } from "react";

const HotSaleContext = createContext();

export const useHotSales = () => {
  const context = useContext(HotSaleContext);
  if (!context) {
    throw new Error("useHotSales must be used within a HotSaleProvider");
  }
  return context;
};

export const HotSaleProvider = ({ children }) => {
  const [hotSales, setHotSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotSales = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hotsales");
        const data = await res.json();
        setHotSales(data);
      } catch (error) {
        console.error("Failed to fetch hot sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotSales();
  }, []);

  const getHotSaleById = (id) => {
    return hotSales.find((item) => item._id === id);
  };

  console.log('HotSales in Context:', hotSales);

  const value = {
    hotSales,
    loading,
    getHotSaleById,
  };

  return (
    <HotSaleContext.Provider value={value}>
      {children}
    </HotSaleContext.Provider>
  );
};
