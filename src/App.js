import { useEffect, useState } from "react";
import { authService, dbService } from "./fbase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AppRouter from "./components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // DB에 저장한 유저 데이터를 userInfo에 저장하여 컴포넌트에 다시 뿌려주는 역할.
  // DB에 유저 데이터가 수정될 경우 무조건 호출할 것.
  const refreshUserData = async () => {
    const data = (
      await getDoc(doc(dbService, "users", `${userInfo.uid}`))
    ).data();
    setUserInfo(data);
  };

  // 로그인 여부 감지 함수
  const onAuthStateChange = async () => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const docSnap = await getDoc(doc(dbService, "users", user.uid));
        if (!docSnap.exists()) {
          // 첫 로그인의 경우 userInfo를 설정한 후 setDoc함
          setUserInfo({
            displayName: user.displayName,
            uid: user.uid,
          });
          await setDoc(doc(dbService, "users", user.uid), {
            displayName: user.displayName,
            uid: user.uid,
          });
        } else {
          // 첫 로그인이 아닌 경우 DB로부터 userInfo를 받아옴.
          const data = (
            await getDoc(doc(dbService, "users", `${user.uid}`))
          ).data();
          setUserInfo(data);
        }
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
      setInit(true);
    });
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          refreshUserData={refreshUserData}
        />
      ) : (
        "불러오는 중..."
      )}
    </>
  );
}

export default App;
