import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Timesheet() {
  const [consultantInfo, setConsultantInfo] = useState({
    name: '',
    email: '',
    phone: '',
    weekEnding: ''
  });

  const [timeEntries, setTimeEntries] = useState([
    { id: 1, client: '', task: '', hours: [0, 0, 0, 0, 0, 0, 0], rate: 0, isClientRow: true },
    { id: 2, client: '', task: '', hours: [0, 0, 0, 0, 0, 0, 0], rate: 0, isClientRow: false },
    { id: 3, client: '', task: '', hours: [0, 0, 0, 0, 0, 0, 0], rate: 0, isClientRow: true },
    { id: 4, client: '', task: '', hours: [0, 0, 0, 0, 0, 0, 0], rate: 0, isClientRow: false },
    { id: 5, client: '', task: '', hours: [0, 0, 0, 0, 0, 0, 0], rate: 0, isClientRow: true }
  ]);

  const [notes, setNotes] = useState('');

  // Set default week ending date to next Friday
  useEffect(() => {
    const today = new Date();
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (5 - today.getDay()));
    setConsultantInfo(prev => ({
      ...prev,
      weekEnding: nextFriday.toISOString().split('T')[0]
    }));
  }, []);

  const updateConsultantInfo = (field, value) => {
    setConsultantInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTimeEntry = (id, field, value, dayIndex = null) => {
    setTimeEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        if (field === 'hours' && dayIndex !== null) {
          const newHours = [...entry.hours];
          newHours[dayIndex] = parseFloat(value) || 0;
          return { ...entry, hours: newHours };
        }
        return { ...entry, [field]: field === 'rate' ? parseFloat(value) || 0 : value };
      }
      return entry;
    }));
  };

  const calculateTotals = () => {
    let grandTotalHours = 0;
    let grandTotalAmount = 0;
    const dailyTotals = [0, 0, 0, 0, 0, 0, 0];

    timeEntries.forEach(entry => {
      const rowTotal = entry.hours.reduce((sum, hours) => sum + hours, 0);
      const amount = rowTotal * entry.rate;
      
      grandTotalHours += rowTotal;
      grandTotalAmount += amount;
      
      entry.hours.forEach((hours, index) => {
        dailyTotals[index] += hours;
      });
    });

    return {
      grandTotalHours,
      grandTotalAmount,
      dailyTotals,
      avgRate: grandTotalHours > 0 ? grandTotalAmount / grandTotalHours : 0
    };
  };

  const { grandTotalHours, grandTotalAmount, dailyTotals, avgRate } = calculateTotals();

  const handlePrint = () => {
    window.print();
  };

  const addRow = () => {
    const newId = Math.max(...timeEntries.map(e => e.id)) + 1;
    setTimeEntries(prev => [...prev, {
      id: newId,
      client: '',
      task: '',
      hours: [0, 0, 0, 0, 0, 0, 0],
      rate: 0,
      isClientRow: false
    }]);
  };

  const removeRow = (id) => {
    if (timeEntries.length > 1) {
      setTimeEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>Weekly Timesheet</title>
        <meta name="description" content="Independent consultant timesheet" />
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .timesheet-print, .timesheet-print * {
              visibility: visible;
            }
            .timesheet-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="timesheet-print max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          {/* Header */}
          <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">WEEKLY TIMESHEET</h1>
            <p className="text-lg text-gray-600">Independent Consultant</p>
          </div>

          {/* Consultant Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Consultant Name:
              </label>
              <input
                type="text"
                value={consultantInfo.name}
                onChange={(e) => updateConsultantInfo('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Week Ending:
              </label>
              <input
                type="date"
                value={consultantInfo.weekEnding}
                onChange={(e) => updateConsultantInfo('weekEnding', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                value={consultantInfo.email}
                onChange={(e) => updateConsultantInfo('email', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone:
              </label>
              <input
                type="tel"
                value={consultantInfo.phone}
                onChange={(e) => updateConsultantInfo('phone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Timesheet Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-800 p-3 text-left font-semibold w-1/8">Client/Project</th>
                  <th className="border border-gray-800 p-3 text-left font-semibold w-1/4">Task Description</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Mon</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Tue</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Wed</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Thu</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Fri</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Sat</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16">Sun</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-20">Total Hours</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-24">Rate/Hr</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-24">Amount</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-16 no-print">Action</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((entry) => {
                  const rowTotal = entry.hours.reduce((sum, hours) => sum + hours, 0);
                  const amount = rowTotal * entry.rate;

                  return (
                    <tr key={entry.id} className={entry.isClientRow ? 'bg-gray-50' : ''}>
                      <td className="border border-gray-800 p-2">
                        <input
                          type="text"
                          value={entry.client}
                          onChange={(e) => updateTimeEntry(entry.id, 'client', e.target.value)}
                          className={`w-full bg-transparent text-center ${entry.isClientRow ? 'font-semibold' : ''} focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500`}
                          placeholder={entry.isClientRow ? 'Client Name' : ''}
                        />
                      </td>
                      <td className="border border-gray-800 p-2">
                        <input
                          type="text"
                          value={entry.task}
                          onChange={(e) => updateTimeEntry(entry.id, 'task', e.target.value)}
                          className="w-full bg-transparent text-left text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                          placeholder="Task description"
                        />
                      </td>
                      {entry.hours.map((hours, dayIndex) => (
                        <td key={dayIndex} className="border border-gray-800 p-2">
                          <input
                            type="number"
                            step="0.25"
                            min="0"
                            value={hours || ''}
                            onChange={(e) => updateTimeEntry(entry.id, 'hours', e.target.value, dayIndex)}
                            className="w-16 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                      ))}
                      <td className="border border-gray-800 p-2 text-center font-semibold">
                        {rowTotal.toFixed(2)}
                      </td>
                      <td className="border border-gray-800 p-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={entry.rate || ''}
                          onChange={(e) => updateTimeEntry(entry.id, 'rate', e.target.value)}
                          className="w-20 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                          placeholder="300.00"
                        />
                      </td>
                      <td className="border border-gray-800 p-2 text-center font-semibold">
                        ${amount.toFixed(2)}
                      </td>
                      <td className="border border-gray-800 p-2 text-center no-print">
                        <button
                          onClick={() => removeRow(entry.id)}
                          className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                          disabled={timeEntries.length <= 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                
                {/* Total Row */}
                <tr className="bg-blue-50 font-semibold">
                  <td colSpan={2} className="border border-gray-800 p-3 text-center">
                    <strong>WEEKLY TOTALS</strong>
                  </td>
                  {dailyTotals.map((total, index) => (
                    <td key={index} className="border border-gray-800 p-3 text-center">
                      {total.toFixed(2)}
                    </td>
                  ))}
                  <td className="border border-gray-800 p-3 text-center">
                    {grandTotalHours.toFixed(2)}
                  </td>
                  <td className="border border-gray-800 p-3"></td>
                  <td className="border border-gray-800 p-3 text-center">
                    ${grandTotalAmount.toFixed(2)}
                  </td>
                  <td className="border border-gray-800 p-3 no-print"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <div className="mb-8 no-print">
            <button
              onClick={addRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Row
            </button>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="border-2 border-gray-800 p-6 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span>Total Hours Worked:</span>
                  <span className="font-semibold">{grandTotalHours.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span>Total Amount Due:</span>
                  <span className="font-semibold">${grandTotalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span>Average Hourly Rate:</span>
                  <span className="font-semibold">${avgRate.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-800 p-6 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes & Expenses</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Additional notes, travel expenses, or other billable items..."
              />
            </div>
          </div>

          {/* Print Button */}
          <div className="text-center no-print">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
