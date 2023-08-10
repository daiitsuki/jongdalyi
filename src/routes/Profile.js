import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

const Profile = ({ userInfo, refreshUserData }) => {
  const [value, setValue] = useState(userInfo.displayName);
  const userDataRef = doc(dbService, "users", `${userInfo.uid}`);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (event) => setValue(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(userDataRef, {
      displayName: value,
    });
    refreshUserData();
  };

  return (
    <>
      <h1>{userInfo.displayName}님 환영합니다!</h1>

      <div>
        <form onSubmit={onSubmit}>
          <h4>프로필 네임 변경</h4>
          <input
            type="text"
            value={value}
            onChange={onChange}
            maxLength={20}
            placeholder="최대 20자까지 설정할 수 있습니다."
            required
          />
          <input type="submit" value="변경" />
        </form>
      </div>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
