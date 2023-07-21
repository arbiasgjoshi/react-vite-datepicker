import { useState, useEffect } from "react";
import { endOfMonth, subDays, format, isSameDay } from "date-fns";
// import

import "./index.scss";

const DatePicker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentDate: Date = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const [dates, setDates] = useState<[]>([]);

  const getFirstDayOfWeek = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };
  const getLastDayOfWeek = (
    year: number,
    month: number,
    daysInMonth: number
  ) => {
    const lastDay = new Date(year, month - 1, daysInMonth);
    return lastDay.getDay();
  };

  const currentMonthLabel = format(new Date(), "MMMM");

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const dateFormat = (entry: number | Date, formatStyle: string) => {
    return format(entry, formatStyle);
  };

  console.log(selectedMonth);

  useEffect(() => {
    const today = new Date();
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
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
      const currentDate = new Date(selectedYear, selectedMonth - 1, i);
      const isActive = isSameDay(currentDate, today);
      const className = `date-picker-date${isActive ? " active" : ""}`;

      newDates.push(
        <div className={className} key={i}>
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

  // const handleYearChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   setSelectedYear(Number(event.target.value));
  // };

  // const handleMonthChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   setSelectedMonth(Number(event.target.value));
  // };

  // Generate arrays for all months and the last 10 years
  // const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
  // const years = Array.from({ length: 123 }, (_, index) => currentYear - index);
  const currentYear = new Date().getFullYear();

  return (
    <div className="date-picker">
      <div className="date-picker--details">{currentMonthLabel}</div>
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
