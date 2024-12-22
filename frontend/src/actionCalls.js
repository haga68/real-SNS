import axios from "axios";
// import { LoginStart, LoginSuccess, LoginError } from "../apiCall.js"

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" }); // dispatch(LoginStart(user)) こちらでも可です。
  try {
    //APIをたたく
    const response = await axios.post("auth/login", user);
    //ログインサクセスを通知して、状態を更新
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data }); // dispatch(LoginSuccess(user)) こちらでも可です。
  } catch (err) {
    //エラーであれば、エラーの状態を更新
    dispatch({ type: "LOGIN_ERROR", payload: err }); // dispatch(LoginError(err)) こちらでも可です。  
  }
};


// JavaScript の例外 "is not a function" は、値を関数として呼び出そうとしたが、
// その値が実際には関数ではなかった場合に発生します。
// また適切な関数が定義されていることを期待されているが、定義されていない場合も発生します。