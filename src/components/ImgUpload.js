import { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import moment from "moment";

const ImgUpload = ({ selectedDate }) => {
  const [uploading, setUploading] = useState(false);
  const [imgURL, setImgURL] = useState();
  const [img, setImg] = useState();
  const [form, setForm] = useState();
  const date = moment(selectedDate).format("YYYY-MM-DD");

  const onChange = (event) => {
    const imgFile = event.target.files[0];
    setImg(imgFile);

    const reader = new FileReader();
    reader.onloadend = (event) => {
      const {
        target: { result },
      } = event;
      setImgURL(result);
    };
    reader.readAsDataURL(imgFile);

    const formData = new FormData();
    formData.append("image", imgFile);
    setForm(formData);
    for (let value of formData.values()) {
      console.log(value);
    }
  };

  const onSubmit = async (event) => {
    let url;
    event.preventDefault();
    setUploading(true);
    if (img && img.size < 5000000) {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "Client-ID f9bc4c5b24a8bfd",
          Accept: "application/json",
        },
        body: form,
      });
      const json = await response.json();
      // console.log(json);
      url = json.data.link;
      dbSave(url);
    }
    setImgURL();
    setUploading(false);
  };

  const dbSave = async (url) => {
    await setDoc(doc(collection(dbService, "calendar", date, "IMG")), {
      url,
      createdAt: Date.now(),
    });
  };

  return (
    <>
      {!uploading && (
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="file" accept="image/*" required />
          {imgURL && <img alt="preview" src={imgURL} />}
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default ImgUpload;
