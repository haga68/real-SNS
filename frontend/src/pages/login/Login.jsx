import React, { useContext, useRef } from 'react';
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import "./Login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  // AuthContextProviderをグローバルコンテキストとして使うことができるという宣言
  
  //ログインボタンを押す
  const handleSubmit = (e) => {
    e.preventDefault();
    //この関数を宣言することで、ログインボタンを押しても、リロードされない
    // console.log(email.current.value);
    // console.log(password.current.value);
    
    // loginCallの呼び出し
    loginCall({
        email: email.current.value, //inputフォームに打ち込んだ文字列
        password: password.current.value,
      },
      dispatch //ログインボタンを押した(handleSubmitを呼んだ)瞬間に通知（dispatch）
    );
  };

  console.log(user);

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Real SNS</h3>
          <span className='loginDesc'>本格的なSNSを自分の手で</span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={(e) => handleSubmit(e)}>
            <p className='loginMsg'>ログインはこちら</p>
            <input type="email" className='loginInput' 
              placeholder='Eメール' required ref={email} />
            <input type="password" className='loginInput' 
              placeholder='パスワード' required minLength="6" ref={password} />
            <button className='loginButton'>ログイン</button>
            <span className='loginForgot'>パスワードを忘れた方へ</span>
            <button className='loginRegisterButton'>アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
}
