"use client";
import {useState} from 'react';


export default function Home() {
  //statemanagement for the calculator
  const[desposit, setDeposit] = useState<number>(10000);
  const[rate, setRate] = useState<number>(7);
  const[time, setTime] = useState<number>(5);
  const[payout, setPayout] = useState<string>('quaterly');

  const [interest, setInterest] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);

  //Calculate button
  const handleCalculate = () => {
    //formula : M = P+((P*r*t)/100)
    const newInterest = (desposit * rate * time) / 100;
    setInterest(newInterest);
    setMaturityAmount(desposit + newInterest);
  };

  //currency formatter
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);


};

 return (
  <main className="min-h-screen bg-[#f4f4f6] flex items-center justify-center md:p-8 font-sans">
    <div className="max-w-[1000px] w-full bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden">
    {/* left section of the calculator */}
    <div className="w-full md:w-[55%] p-8 md:p-10 bg-white">
      <h2 className="text-2xl font-semibold text-[#b48c70] mb-2">FD Calculator</h2>
      <p className="text-sm text-gray-500 mb-8">Estimate how much your fixed deposit investment will grow over time.</p>

      {/* Desposit Ammount slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Deposit Amount(₹)</span>
          <span className="text-gray-700">{formatINR(desposit)}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={desposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#b48c70]"
        />
      </div>

      {/* Rate slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Rate of Return(%)</span>
          <span className="text-gray-700">{rate}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="15"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#b48c70]"
        />
      </div>

      {/* Time slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Time Period (Years)</span>
          <span className="text-gray-700">{time}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#b48c70]"
        />
      </div>

      {/* Payout section */}
      <div>
        <span className="text-sm font-medium text-gray-700">Interest Payout</span>
       <div className="mt-2 p-4 bg-gray-100 rounded-lg">
        {["quaterly", "half-yearly", "yearly", "maturity"].map((option) => (
          <label key={option} className={`block mb-2 cursor-pointer p-2 rounded-lg ${
            payout === option
            ? "bg-[#b48c70] text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          >
            <input
              type="radio"
              name="payout"
              value={option}
              checked={payout === option}
              onChange={(e) => setPayout(e.target.value)}
              className="mr-2"
            />
            {option === "half-yearly" ? "Half-Yearly" : option === "maturity" ? "Maturity" : option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>
    </div>

      {/* Calculate button */}
      <button
        type="button"
        onClick={handleCalculate}
        className="mt-6 px-8 py-3 rounded-full bg-[#b48c70] text-white text-sm hover:bg-[#9c7760] cursor-pointer"
      >
        Calculate
      </button>
    </div>

    {/* right section of the calculator */}
    <div className="w-full md:w-[45%] p-6 sm:p-10 bg-[#d2b29b] flex flex-col justify-center space-y-8">
    <div>
      <h4 className="text-sm font-medium text-white mb-2">Maturity Amount</h4>
      <h1 className="text-3xl sm:text-4xl font-bold text-white">{formatINR(maturityAmount)}</h1>
    </div>
    <div>
      <h4 className="text-sm font-medium text-white mb-2">Interest Earned</h4>
      <h1 className="text-3xl sm:text-4xl font-bold text-white">{formatINR(interest)}</h1>
    </div>
    <div className="flex-grow felx flex-col justify-end mt-4 min-h-[150px]">
      <div className="flex justify-between text-[10px] text-slate-400 mb-2 px-1">
        <span className="flex items-centrer gap-1">
          <span className="w-2 h-2 rounded bg-[#c58b74] inline-block"></span>
          Selected Year
        </span>
        <span className="flex items-centrer gap-1">
          <span className="w-2 h-2 rounded bg-[#938985] inline-block"></span>
          Other Years
        </span>
      </div>

      <div className="flex justify-between items-end h-32 border-b border-gray-200 pb-2 gap-2 mt-4">
        {[1,2,3,4,5].map((year, index) =>{
          const baseHeight = 25;
          const growth = Math.pow(1.3, year) * 6;
          const computedHeight = Math.min(100, baseHeight + growth);

          return (
            <div key={year} className="flex-1 h-full flex flex-col justify-end group">
              <div
                className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                style={{
                  height: computedHeight + '%',
                  backgroundColor: index === 4 ? '#a64823' : '#343130',
                }}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2 px-2">
        <span>Year 1</span>
        <span>Year 2</span>
        <span>Year 3</span>
        <span>Year 4</span>
        <span>Year 5</span>
      </div>
    </div>
    </div>
    </div>
  </main>
 );
}