import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { dbService } from "../../fbase";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const DateInfo = ({ selectedDate }) => {
  const [imgs, setImgs] = useState([]);
  const [displayIMG, setDisplayIMG] = useState(0);
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

  const previous = () => {
    // displayIMG는 0부터 시작
    // imgs.length는 1부터 시작
    const n = imgs.length;
    if (n > 1 && displayIMG !== 0) {
      setDisplayIMG((c) => c - 1);
    }
  };

  const next = () => {
    // displayIMG는 0부터 시작
    // imgs.length는 1부터 시작
    const n = imgs.length;
    if (n > 1 && displayIMG !== n - 1) {
      setDisplayIMG((c) => c + 1);
    }
  };

  const imgDelete = async () => {
    const confirm = window.confirm("사진을 삭제할까요?");
    if (confirm) {
      const id = imgs[displayIMG].id;
      await deleteDoc(doc(dbService, "calendar", date, "IMG", id));
      if (imgs.length === 1) {
        await deleteDoc(doc(dbService, "calendar", date));
      }
    }
  };

  useEffect(() => {
    setDisplayIMG(0);
  }, [selectedDate, imgs]);

  return (
    <>
      <div>dateInfo</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "500px",
          height: "300px",
          border: "1px solid black",
        }}
      >
        {imgs.length !== 0
          ? imgs.map((img, i) => (
              <Link to={img.url} key={img.id}>
                <img
                  src={img.url}
                  alt="img"
                  style={
                    i !== displayIMG
                      ? {
                          display: "none",
                          maxWidth: "500px",
                          maxHeight: "300px",
                        }
                      : {
                          display: "block",
                          maxWidth: "500px",
                          maxHeight: "300px",
                        }
                  }
                />
              </Link>
            ))
          : "imgs가없음"}
      </div>
      {imgs.length !== 0 && (
        <>
          <button onClick={previous}>◀</button>
          <button onClick={next}>▶</button>
          <span>
            {displayIMG + 1}/{imgs.length}
          </span>
          <button onClick={imgDelete}>Delete</button>
        </>
      )}
      <Comment />

      {/* <div>
        imgur에 업로드되어 있는 url→날짜별로 정리해서 다운로드 or 일괄 or
        zip다운로드 되게 개발하기
      </div> */}
    </>
  );
};

export default DateInfo;
