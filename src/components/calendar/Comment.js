import { useEffect } from "react";

const Comment = () => {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {}, []);
  return (
    <>
      <div
        style={{ width: "500px", height: "100px", border: "1px solid black" }}
      >
        댓글창
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" />
        <input type="submit" />
      </form>
    </>
  );
};

export default Comment;
