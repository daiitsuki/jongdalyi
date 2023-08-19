import { useState } from "react";
import { authService } from "../fbase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
  const [value, setValue] = useState("");
  const [auth, setAuth] = useState(false);
  const onSocialClick = async () => {
    if (auth) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
    } else {
      alert("먼저 비밀번호를 입력하여 사용자임을 인증하세요");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (value === "0604") {
      setAuth(true);
      setValue("");
    } else {
      alert("잘못된 비밀번호입니다.");
      setValue("");
    }
  };
  const onChange = (event) => setValue(event.target.value);

  return (
    <div>
      <h1>달이 - 둘만의 비밀 이야기</h1>
      <form onSubmit={onSubmit}>
        <h4>
          {auth
            ? "인증되었습니다. 아래의 로그인 버튼을 통해 로그인하세요."
            : "계속하려면 비밀번호를 입력하세요."}
        </h4>
        <input
          onChange={onChange}
          value={value}
          type="password"
          maxLength={4}
          disabled={auth}
          required
        />
        <input type="submit" value="확인" disabled={auth} />
      </form>

      <button onClick={onSocialClick} disabled={!auth}>
        구글 계정으로 로그인
      </button>
    </div>
  );
};

export default Auth;
