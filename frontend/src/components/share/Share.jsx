import React, { useContext, useRef, useState } from 'react';
import "./Share.css";
import { Analytics, Face, Gif, Image } from '@mui/icons-material';
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';

export default function Share() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);//ログインしているユーザー
  const desc = useRef();

  const [file,setFile] = useState(null);
  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,   //ログイン中のユーザー
      desc: desc.current.value, //つぶやきの中身
    };

    if(file){
      const data = new FormData();  //フォームで打ち込まれたデータを読み込む
      const fileName = Date.now() + file.name;//ファイル名を格納
      data.append("name", fileName);//dataに、keyとvalueを設定
      data.append("file", file);
      newPost.img = fileName;   //newPostのimg属性にfileNameを付加 
      try {
        //画像APIをたたく
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);        
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);      
    }
  };
  
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture 
                : PUBLIC_FOLDER + "/person/noAvatar.png"
              } 
            alt=""
            className='shareProfileImg'
          />
          <input 
            type="text" 
            className='shareInput' 
            placeholder='今、何をしている？'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        <form className="shareButtons" onSubmit={(e)=> handleSubmit(e)}>
          <div className='shareOptions'>
            <label className='shareOption' htmlFor='file'>
              <Image className='shareIcon' htmlColor='blue' />
              <span className="shareOptionText">写真</span>
              <input 
                type="file" 
                id='file' 
                accept='.png, .jpeg, .jpg'
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              <Gif className='shareIcon' htmlColor='hotpink' />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className='shareOption'>
              <Face className='shareIcon' htmlColor='green' />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className='shareOption'>
              <Analytics className='shareIcon' htmlColor='red' />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            投稿
          </button>
        </form>
      </div>
    </div>
  )
}
