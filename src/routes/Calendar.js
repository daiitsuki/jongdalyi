import moment from "moment/moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import ImgUpload from "./../components/calendar/ImgUpload";
import DateInfo from "./../components/calendar/DateInfo";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { dbService } from "../fbase";

const CalendarPage = ({ userInfo }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mark, setMark] = useState([]);
  const customWeekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const standard = new Date(2023, 5, 4, 0, 0, 0, -1);
  const dDay = Math.ceil(
    Math.abs(standard - selectedDate) / (1000 * 60 * 60 * 24)
  );
  const onChange = (value) => {
    setSelectedDate(value);
  };
  const onClick = () => setSelectedDate(new Date());

  const ff = async () => {
    const snap = await getDocs(collection(dbService, "calendar"));
    const arr = snap.docs.map((doc) => doc.id);
    setMark(arr);
  };

  useEffect(() => {
    ff();
  }, [mark]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <h1>{moment(selectedDate).format("YYYY-MM-DD")}</h1>
          <span>D + {dDay}</span>
          <button onClick={onClick}>오늘 날짜로 이동하기</button>

          <Calendar
            key={selectedDate.toISOString()}
            value={selectedDate}
            onChange={onChange}
            locale="en-US"
            formatMonthYear={(locale, date) =>
              `${date.getFullYear()}년 ${date.getMonth() + 1}월`
            }
            formatShortWeekday={(locale, date) =>
              customWeekdayNames[date.getDay()]
            }
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
                    <div className="dot" style={{ color: "black" }}>
                      ●
                    </div>
                  </>
                );
              }
            }}
          />
          <ImgUpload selectedDate={selectedDate} />
        </div>
        <div>
          <DateInfo selectedDate={selectedDate} userInfo={userInfo} />
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
