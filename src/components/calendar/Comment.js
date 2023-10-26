import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../../fbase";

const Comment = ({ id, date, userInfo }) => {
  const [comment, setComment] = useState("");
  const uid = userInfo.uid;
  const onSubmit = async (event) => {
    event.preventDefault();
    await setDoc(
      doc(collection(dbService, "calendar", date, "IMG", id, "comment")),
      {
        uid,
        comment,
        createdAt: Date.now(),
      }
    );
    setComment("");
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      <div
        style={{ width: "500px", height: "100px", border: "1px solid black" }}
      >
        댓글창
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={comment} />
        <input type="submit" />
      </form>
    </>
  );
};

export default Comment;
