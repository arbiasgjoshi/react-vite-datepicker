import React, { useState, useEffect } from "react";
import { endOfMonth, subDays } from "date-fns";

import "./index.scss";

const DatePicker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState([]);

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };
  const getLastDayOfWeek = (year, month, daysInMonth) => {
    const lastDay = new Date(year, month - 1, daysInMonth);
    return lastDay.getDay();
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

    console.log(daysInMonth);
    const firstDayOfWeek = getFirstDayOfWeek(selectedYear, selectedMonth);
    const lastDayOfWeek = getLastDayOfWeek(
      selectedYear,
      selectedMonth,
      daysInMonth
    );

    const newDates = [];
    // Add empty date placeholders for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDate = subDays(
        endOfMonth(subDays(new Date(selectedYear, selectedMonth - 1, 1), 1)),
        firstDayOfWeek - i - 1
      );
      newDates.push(
        <div className="date-picker-date empty" key={`empty-${i}`}>
          {emptyDate.getDate()}
        </div>
      );
    }

    // Add the actual dates for the selected month
    for (let i = 1; i <= daysInMonth; i++) {
      newDates.push(
        <div className="date-picker-date" key={i}>
          {i}
        </div>
      );
    }

    const nextMonth = selectedMonth + 1;
    const daysInNextMonth = getDaysInMonth(nextMonth, currentYear);

    for (let i = 0; i < 6 - lastDayOfWeek; i++) {
      const date = daysInMonth + i + 1;
      const nextMonthDate =
        date <= daysInNextMonth ? date : date - daysInNextMonth;

      newDates.push(
        <div
          className="date-picker-date empty"
          key={`empty-${nextMonth}-${nextMonthDate}`}>
          {nextMonthDate}
        </div>
      );
    }

    setDates(newDates);
  }, [selectedMonth, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  // Generate arrays for all months and the last 10 years
  const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 123 }, (_, index) => currentYear - index);

  return (
    <div className="date-picker">
      <div className="date-picker-dropdowns">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="date-picker-selected-month">
        {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
          month: "long",
        })}
      </div>
      <div className="date-picker-selected-year">{selectedYear}</div> */}
      <div className="date-picker-labels">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-dates">{dates}</div>
    </div>
  );
};

export default DatePicker;
