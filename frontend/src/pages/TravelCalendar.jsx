import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EVENTS = [
  { day: 12, month: 11, year: 2026, type: 'Flight', title: 'Flight DEL ➔ GOI (11:30 AM)', color: 'bg-blue-500' },
  { day: 13, month: 11, year: 2026, type: 'Activity', title: 'Scuba Diving at Calangute', color: 'bg-pink-500' },
  { day: 15, month: 11, year: 2026, type: 'Hotel', title: 'Check-in: Windermere Estate', color: 'bg-teal-500' },
  { day: 16, month: 11, year: 2026, type: 'AI Suggestion', title: 'AI Hack: Tea Gardens Early Tour', color: 'bg-indigo-500' },
  { day: 18, month: 11, year: 2026, type: 'Hotel', title: 'Check-out: Windermere Estate', color: 'bg-amber-500' },
  { day: 19, month: 11, year: 2026, type: 'Flight', title: 'Flight GOI ➔ DEL (18:15 PM)', color: 'bg-blue-500' },
  { day: 25, month: 11, year: 2026, type: 'Holiday', title: 'Christmas Day (Public Holiday)', color: 'bg-red-500' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TravelCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 11, 1)); // December 2026
  const [selectedDay, setSelectedDay] = useState(12);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get total days in month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Get first day offset (0 = Sunday, 1 = Monday, etc.)
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  // Days list construction
  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null); // padding
  }
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push(d);
  }

  // Selected Day Details
  const selectedEvents = EVENTS.filter(
    e => e.day === selectedDay && e.month === month && e.year === year
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Travel Calendar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track flight dates, hotel check-ins, local holidays, and custom activities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
          {/* Header Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              {MONTHS[month]} {year}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
              </button>
              <button
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {DAYS_OF_WEEK.map(d => (
              <span key={d} className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider py-2">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {daysArray.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-14" />;
              }

              const dayEvents = EVENTS.filter(
                e => e.day === day && e.month === month && e.year === year
              );
              const isSelected = selectedDay === day;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`h-14 rounded-2xl relative flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-transparent text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-extrabold">{day}</span>

                  {/* Event indicator dots */}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 absolute bottom-2">
                      {dayEvents.slice(0, 3).map((e, index) => (
                        <span
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : e.color}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda View */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Agenda View
              </h3>
              {selectedDay && (
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-xl">
                  Dec {selectedDay}, {year}
                </span>
              )}
            </div>

            {selectedDay ? (
              selectedEvents.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
                  <p className="text-xs">No bookings or trips scheduled for this date.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((e, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/40 dark:border-slate-700/30 flex items-start gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${e.color}`} />
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                          {e.type}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                          {e.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="py-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">touch_app</span>
                <p className="text-xs">Select a date on the calendar to view itinerary details.</p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 mt-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">AI Recommendations Calendar</h4>
            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl text-[11px] text-slate-600 dark:text-indigo-300 leading-relaxed border border-indigo-100/40 dark:border-indigo-950/40">
              <strong className="block mb-1 text-indigo-600 dark:text-indigo-400">Smart Calendar Alert</strong>
              Add your flight booking code and sarthiAi will automatically sync your hotel check-ins and suggest localized weekend trips.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
