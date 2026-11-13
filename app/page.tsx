"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State variables for the calculator inputs
  const [deposit, setDeposit] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7);
  const [time, setTime] = useState<number>(5);
  const [payout, setPayout] = useState<string>("Maturity");
  
  // State to trigger the graph animation on page load
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // A tiny delay ensures the browser renders the 0% height first before animating up
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Format numbers to Indian Rupees (e.g., ₹1,00,000)
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate compound interest based on payout frequency
  const calculateReturns = () => {
    let n = 4; // Default to quarterly compounding
    if (payout === "Half-Yearly") n = 2;
    if (payout === "Yearly") n = 1;

    const r = rate / 100;
    const maturity = deposit * Math.pow(1 + r / n, n * time);
    const interest = maturity - deposit;
    
    return { maturity, interest };
  };

  const { maturity, interest } = calculateReturns();

  return (
    <main className="min-h-screen bg-[#F4F4F6] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-[1000px] w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden border border-gray-100">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="w-full md:w-[55%] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="text-2xl font-semibold text-slate-800 mb-1">FD Calculator</h2>
          <p className="text-sm text-slate-500 mb-10">Estimates how much your fixed deposit investment will grow over time.</p>

          {/* Deposit Slider */}
          <div className="mb-8">
            <div className="flex justify-between mb-3 text-sm font-medium text-slate-700">
              <span>Deposit Amount (₹)</span>
              <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-md">{formatINR(deposit).replace('₹', '')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer outline-none"
              style={{ accentColor: '#C58B74' }}
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>10,000</span>
              <span>10,00,000</span>
            </div>
          </div>

          {/* Rate Slider */}
          <div className="mb-8">
            <div className="flex justify-between mb-3 text-sm font-medium text-slate-700">
              <span>Rate Of Return (%)</span>
              <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-md">{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer outline-none"
              style={{ accentColor: '#C58B74' }}
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>1%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Time Slider */}
          <div className="mb-10">
            <div className="flex justify-between mb-3 text-sm font-medium text-slate-700">
              <span>Time Period (Years)</span>
              <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-md">{time}</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer outline-none"
              style={{ accentColor: '#C58B74' }}
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>1</span>
              <span>30</span>
            </div>
          </div>

          {/* Payout Options */}
          <div className="mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-4">Interest Payout</span>
            <div className="flex flex-wrap gap-3">
              {["Quarterly", "Half-Yearly", "Yearly", "Maturity"].map((option) => (
                <label
                  key={option}
                  className={`px-5 py-2 text-[13px] font-medium rounded-full cursor-pointer border transition-colors ${
                    payout === option
                      ? "bg-[#C58B74] text-white border-[#C58B74]"
                      : "bg-transparent text-slate-500 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payout"
                    className="hidden"
                    checked={payout === option}
                    onChange={() => setPayout(option)}
                  />
                  {option === "Maturity" ? "At Maturity" : option}
                </label>
              ))}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: OUTPUTS & PROMOS */}
        <div className="w-full md:w-[45%] bg-[#FDF9F6] p-6 md:p-8 flex flex-col">
          
          {/* Main Results Card */}
          <div className="bg-[#F6EBE5] rounded-2xl p-6 md:p-8 flex-grow flex flex-col mb-4">
            <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
              <div>
                <h4 className="text-[13px] font-medium text-slate-500 mb-1">Maturity Amount</h4>
                <h2 className="text-2xl lg:text-[28px] font-bold text-slate-800 tracking-wide">{formatINR(maturity)}</h2>
              </div>
              <div className="sm:text-right">
                <h4 className="text-[13px] font-medium text-slate-500 mb-1">Interest Earned</h4>
                <h2 className="text-2xl lg:text-[28px] font-bold text-[#C58B74] tracking-wide">{formatINR(interest)}</h2>
              </div>
            </div>

            {/* Dynamic Visual Bar Chart Area */}
            <div className="flex-grow flex flex-col justify-end mt-4 min-h-[150px]">
              <div className="flex justify-between text-[10px] text-slate-500 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[#C58B74] inline-block"></span> Selected Year
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[#EADCCF] inline-block"></span> Other Years
                </span>
              </div>
              
              {/* Animated Bars Container */}
              <div className="flex justify-between items-end h-32 border-b border-gray-300 pb-0 gap-2 mt-4 w-full">
                {[1, 2, 3, 4, 5].map((step, index) => {
                  // Dynamically calculate the year for this specific bar based on the Time slider
                  const currentYear = Math.max(1, Math.round((time / 5) * step));
                  
                  // Calculate actual compound interest for this specific bar
                  let n = 4;
                  if (payout === "Half-Yearly") n = 2;
                  if (payout === "Yearly") n = 1;
                  
                  const r = rate / 100;
                  const barMaturity = deposit * Math.pow(1 + r / n, n * currentYear);
                  
                  // Calculate the absolute max maturity to scale the heights relative to 100%
                  const maxMaturity = deposit * Math.pow(1 + r / n, n * time);
                  
                  // Set a base height of 15% so Year 1 is always visible, scale the rest
                  const computedHeight = 15 + ((barMaturity / maxMaturity) * 85);
                  
                  return (
                    <div key={index} className="flex-1 h-full flex flex-col justify-end items-center group">
                      <div 
                        className="w-full rounded-t-md transition-all duration-700 ease-out hover:opacity-80"
                        style={{ 
                          // Starts at 0% and animates to computedHeight on load, updates live on drag
                          height: mounted ? computedHeight + '%' : '0%', 
                          backgroundColor: index === 4 ? '#C58B74' : '#EADCCF'
                        }}
                      ></div>
                      {/* Dynamic Labels */}
                      <span className="text-[11px] font-medium text-slate-500 mt-2">
                        {time <= 5 ? currentYear : `Yr ${currentYear}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </main>
  );
}