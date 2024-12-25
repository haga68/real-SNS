import React, { useContext, useEffect, useState } from 'react';
import "./TimeLine.css";
import Share from '../share/Share';
import Post from '../post/Post';
// import { Posts } from '../../dummyData';
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';


export default function TimeLine({ username }) {
  // APIをたたいて取得したときのデータを格納するための変数postsを用意
  //posts・・・自分の投稿と自分がフォローしているすべての投稿内容    
  const [posts, setPosts] = useState([]);

  //グローバルなユーザー状態を取得
  const {user} = useContext(AuthContext);

  // APIをたたいて投稿データをフェッチ
  useEffect(() => {
    const fetchPosts = async () => {
    //無名関数に直接asyncをつけるのではなく、いったん、関数（fetchPosts）を設定して、そこにasyncをつけるようにする      
      
      //ProfileComponentから渡されたprops（username）の有無で、timelineの表示内容を変える
      const response = username 
        ? await axios.get(`/posts/profile/${username}`)   //プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合
        // ? await axios.get(`/posts/profile/${username}`)
        // : await axios.get("/posts/timeline/67688ea7830e9389eb23d6e5");
        // エンドポイントは、proxy設定で"http://localhost:5000/api"を
        // 指定しているので、その後の/postsから打ち込めば良い
        // console.log(response);

      //fetchPostsでAPIをたたいた情報を、postsに格納
      // setPosts(response.data);
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      ); 

    };
    fetchPosts();
  }, [username, user._id]);
  //ユーザーの状態（username、user._id）が更新されるたび、APIがたたかれてtimelineが更新される
  // 第二引数が、[](空の配列)だと、マウント時に一回、読み込まれるだけ
  
  return (
    <div className='timeline'>
      <div className='timelineWrapper'>
        <Share />
        {/* 取得したpostsをmap関数で展開　*/}
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
          //postというpropsの名前としてPost Componentに渡す
        ))}
      </div>
    </div>
  );
}
