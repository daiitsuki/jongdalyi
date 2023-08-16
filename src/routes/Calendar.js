import moment from "moment/moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const customWeekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const onChange = (value, event) => {
    setSelectedDate(value);
  };
  const onClick = () => setSelectedDate(new Date());
  console.log(selectedDate);
  return (
    <>
      <h1>Calendar</h1>
      <Calendar
        key={selectedDate.toISOString()}
        value={selectedDate}
        onChange={onChange}
        locale="en-US"
        formatMonthYear={(locale, date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        }
        formatShortWeekday={(locale, date) => customWeekdayNames[date.getDay()]}
        formatDay={(locale, date) => moment(date).format("D")}
        minDetail="month"
        maxDetail="month"
        minDate={new Date("2023-06-04")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
      />
      <p>{String(selectedDate)}</p>
      <button onClick={onClick}>오늘 날짜로 이동하기</button>
    </>
  );
};

export default CalendarPage;
