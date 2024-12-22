import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//初期値（最初のユーザー状態）を定義
const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,

  //localStorageにユーザー情報が保存されているなら、
  //parseで解析してユーザー状態を取り出す。なければnullを返す
  // localStorageに情報があるときだけ、リロードしても大丈夫

  // JSON.parse() 静的メソッドは、文字列を JSON として解析し、
  //文字列によって記述されている JavaScript の値やオブジェクトを構築します。

  user:{
    _id: "66786ec2e23bde6d0e8ada51",
    username: "haga",
    email: "haga@example.com",
    password: "abcdef",
    profilePicture: "/person/1.jpeg",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
  },

  isFetching: false,  //ログインしようとしていない
  error: false,       //エラーもない  
};



//状態をグローバルに管理する 
export const AuthContext = createContext(initialState);
//初期値のユーザー状態をどこでも使えるようにして、変数AuthContextに格納

export const AuthContextProvider = ({ children }) => {
  //認証状態をどこでも提供する
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //第1引数にReducer関数、第二引数に初期値の状態を定義

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user]);
  //第2引数・・user状態が変わったら、useEffectの中身（第1引数）が発火
  //第1引数・・localStorageにuserという名前で、状態（JSON）をセットすることができる

  return(
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};