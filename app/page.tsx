"use client";
import {useState} from 'react'; 

export default function Home() {
  //statemanagement for the calculator
  const[desposit, setDeposit] = useState<number>(10000);
  const[rate, setRate] = useState<number>(7);
  const[time, setTime] = useState<number>(5);
  const[payout, setPayout] = useState<string>('');

  //formula : M = P+((P*R*T)/100)
  const interest = (desposit * rate * time) / 100;
  const maturityAmount = desposit + interest;

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
    //left section of the calculator
    <div className="w-full md:w-[55%] p-8 md:p-10 bg-white">
      <h2 className="text-2xl font-semibold text-white rounded-2xl flex flex-col md:flex-row overflow-hidden">FD Calculator</h2>
      <p className="text">Estimate how much your fixed deposit investment will grow over time.</p>
       
      //Desposit Ammount slider 
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Deposit Amount(₹)</span>
          <span>{formatINR(desposit)}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={desposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      //Rate slider
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Rate of Return(%)</span>
          <span>{rate}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="15"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      //Time slider
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Time Period (Years)</span>
          <span>{time}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      //Payout section
      <div>
        <span className="text-sm font-medium text-gray-700">Interest Payout</span>
       <div className="mt-2 p-4 bg-gray-100 rounded-lg">
        {["quaterly", "half-yearly", "yearly", "maturity"].map((option) => (
          <label key={option} className={`block mb-2 cursor-pointer p-2 rounded-lg ${
            payout === option
            ? "bg-blue-500 text-white"
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

    //right section of the calculator
    <div className="w-full md:w-2/5 p-6 sm:p-10 bg-blue-50 flex felx-col justify-center space-y-8">
    <div>
      <h4 classsName="text-sm font-medium text-slate-500 mn-2">Maturity Amount</h4>
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">{formatINR(maturityAmount)}</h1>
    </div>
    <div>
      <h4 classsName="text-sm font-medium text-slate-500 mn-2">Interest Earned</h4>
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">{formatINR(interest)}</h1>
    </div>
    </div>
    </div>
    </div>
  </main>
 );
}