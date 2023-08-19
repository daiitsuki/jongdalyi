import moment from "moment/moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mark, setMark] = useState(["2023-08-11", "2023-08-12"]);
  const customWeekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const standard = new Date(2023, 5, 4, 0, 0, 0, -1);
  const dDay = Math.ceil(
    Math.abs(standard - selectedDate) / (1000 * 60 * 60 * 24)
  );
  const onChange = (value) => {
    setSelectedDate(value);
  };
  const onClick = () => setSelectedDate(new Date());
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
        tileContent={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div className="dot">1</div>
              </>
            );
          }
        }}
      />
      <br />
      <button onClick={onClick}>오늘 날짜로 이동하기</button>
      <p>{String(selectedDate)}</p>
      <span>D + {dDay}</span>
    </>
  );
};

export default CalendarPage;
