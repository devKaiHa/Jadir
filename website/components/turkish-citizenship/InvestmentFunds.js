"use Client";
import Link from "next/link";
import React, { useState } from "react";

function InvestmentFunds() {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("tab-1");

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div>
     
    </div>
  );
}

export default InvestmentFunds;
