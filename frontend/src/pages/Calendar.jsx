import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarView, setCalendarView] = useState(getCurrentMonthAndYear());

  function getCurrentMonthAndYear() {
    const date = new Date();
    return {
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear()
    };
  }

  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    setCalendarView({
      month: newMonth.toLocaleString('default', { month: 'long' }),
      year: newMonth.getFullYear()
    });
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    setCalendarView({
      month: newMonth.toLocaleString('default', { month: 'long' }),
      year: newMonth.getFullYear()
    });
  };

  // Generate calendar grid for current month
  const generateCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get days from previous month to display
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
    const adjustedDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Adjust for Monday start
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarDays = [];
    
    // Add days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    
    for (let i = 0; i < adjustedDay; i++) {
      const day = daysInPrevMonth - adjustedDay + i + 1;
      calendarDays.push({
        day,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Add days from current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        i === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
      
      calendarDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
        isToday
      });
    }
    
    // Add days from next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const totalDaysNeeded = 42; // 6 rows of 7 days
    
    for (let i = 1; calendarDays.length < totalDaysNeeded; i++) {
      calendarDays.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return calendarDays;
  };

  // Sample data for birthdays and anniversaries
  const getSampleData = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    
    // Default empty data
    const data = {
      birthdays: [],
      anniversaries: [],
      events: []
    };
    
    // February data
    if (month === 1) {
      data.anniversaries = [
        { name: 'Senthilkumar A', date: '04-02' },
        { name: 'Gopalsamy R', date: '08-02' },
        { name: 'Vaidyanathan K', date: '08-02' },
        { name: 'Rajeswari Vaidyanthan', date: '08-02' },
        { name: 'Sivasamy K Dr.', date: '10-02' }
      ];
    }
    // April data
    else if (month === 3) {
      data.birthdays = [
        { name: 'Savari Muthu Raju A', date: '16-04' },
        { name: 'Sivasubramaniam Sukumaran', date: '24-04' },
        { name: 'Annamalai P', date: '27-04' }
      ];
      data.anniversaries = [
        { name: 'Subashree E', date: '10-04' }
      ];
    }
    
    return data;
  };

  const calendarDays = generateCalendarGrid();
  const data = getSampleData();
  
  // Function to check if a day has special dates
  const getSpecialDates = (day) => {
    if (!day.isCurrentMonth) return [];
    
    const month = day.month + 1;
    const paddedMonth = month < 10 ? `0${month}` : `${month}`;
    const paddedDay = day.day < 10 ? `0${day.day}` : `${day.day}`;
    const dateStr = `${paddedDay}-${paddedMonth}`;
    
    const specialDates = [];
    
    // Check birthdays
    data.birthdays.forEach(item => {
      if (item.date === dateStr) {
        specialDates.push({ type: 'birthday', name: item.name });
      }
    });
    
    // Check anniversaries
    data.anniversaries.forEach(item => {
      if (item.date === dateStr) {
        specialDates.push({ type: 'anniversary', name: item.name });
      }
    });
    
    // Check events
    data.events.forEach(item => {
      if (item.date === dateStr) {
        specialDates.push({ type: 'event', name: item.name });
      }
    });
    
    return specialDates;
  };

  // Organize days into weeks for rendering
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className="bg-white">
      {/* Calendar Content - Removed duplicate navigation elements */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Birthday Section */}
          <div className="border rounded shadow-sm p-4">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Birthday</h2>
            {data.birthdays.length > 0 ? (
              <div>
                {data.birthdays.map((birthday, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">{birthday.name}</p>
                    <p className="text-gray-500 text-sm">{birthday.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No Data Found..!</p>
            )}
          </div>
          
          {/* Anniversary Section */}
          <div className="border rounded shadow-sm p-4">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Anniversary</h2>
            <div className="relative">
              {/* Gold/yellow border accent on the right */}
              <div className="absolute top-0 bottom-0 right-0 w-1 bg-yellow-500"></div>
              
              {data.anniversaries.length > 0 ? (
                <div>
                  {data.anniversaries.map((anniversary, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium">{anniversary.name}</p>
                      <p className="text-gray-500 text-sm">{anniversary.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No Data Found..!</p>
              )}
            </div>
          </div>
          
          {/* Events Section */}
          <div className="border rounded shadow-sm p-4">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Events</h2>
            {data.events.length > 0 ? (
              <div>
                {data.events.map((event, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">{event.name}</p>
                    <p className="text-gray-500 text-sm">{event.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No Data Found..!</p>
            )}
          </div>
          
          {/* Calendar Section */}
          <div className="border rounded shadow-sm">
            {/* Month Navigation */}
            <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between rounded-t">
              <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-lg font-bold">{calendarView.month} {calendarView.year}</h3>
              <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center">
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="bg-white">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 text-center border-b">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="py-2 font-medium text-gray-600">{day}</div>
                ))}
              </div>
              
              {/* Calendar Days */}
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7">
                  {week.map((day, dayIndex) => {
                    const specialDates = getSpecialDates(day);
                    const hasSpecialDate = specialDates.length > 0;
                    
                    return (
                      <div 
                        key={dayIndex}
                        className={`h-12 flex items-center justify-center border relative
                          ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
                          ${day.isToday ? 'bg-blue-900 text-white' : ''}
                          ${hasSpecialDate && !day.isToday ? 'bg-blue-900 text-white' : ''}
                        `}
                      >
                        {day.day}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;