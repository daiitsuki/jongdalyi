import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { dbService } from "../fbase";

const DateInfo = ({ selectedDate }) => {
  const [imgs, setImgs] = useState([]);
  const date = moment(selectedDate).format("YYYY-MM-DD");

  useEffect(() => {
    const q = query(
      collection(dbService, "calendar", date, "IMG"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const imgArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImgs(imgArr);
    });
  }, [date]);

  return (
    <>
      <div>dateInfo</div>
      <div>
        {imgs.length !== 0
          ? imgs.map((img) => <img key={img.id} src={img.url} alt="img" />)
          : "imgs가없음"}
      </div>

      <div>
        imgur에 업로드되어 있는 url→날짜별로 정리해서 다운로드 or 일괄 or
        zip다운로드 되게 개발하기
      </div>
    </>
  );
};

export default DateInfo;
