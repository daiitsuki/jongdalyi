import { useEffect, useState } from "react";
import { authService, dbService } from "./fbase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AppRouter from "./components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const refreshUserData = async () => {
    const data = (
      await getDoc(doc(dbService, "users", `${userInfo.uid}`))
    ).data();
    console.log(data);
    setUserInfo(data);
  };

  const onAuthStateChange = async () => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);

        const docSnap = await getDoc(doc(dbService, "users", user.uid));
        if (!docSnap.exists()) {
          setUserInfo({
            displayName: user.displayName,
            uid: user.uid,
          });
          await setDoc(doc(dbService, "users", user.uid), {
            displayName: user.displayName,
            uid: user.uid,
          });
        } else {
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
        "불러오는 중입니다..."
      )}
    </>
  );
}

export default App;
