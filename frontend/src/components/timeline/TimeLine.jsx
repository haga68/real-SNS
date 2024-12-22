import React, { useContext, useEffect, useState } from 'react';
import "./TimeLine.css";
import Share from '../share/Share';
import Post from '../post/Post';
// import { Posts } from '../../dummyData';
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';


export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);

  //グローバルなユーザー状態を取得
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
    //無名関数に直接asyncをつけるのではなく、いったん、関数（fetchPosts）を設定して、そこにasyncをつけるようにする      
      const response = username 
        ? await axios.get(`/posts/profile/${username}`)   //プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合
      // console.log(response);
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      ); 
      //fetchPostsでたたいた情報responseを、postsに格納
      //posts・・・自分の投稿と自分がフォローしているすべての投稿内容    
    };
    fetchPosts();
  }, [username, user._id]);
  //username、user._idが更新されるたび、APIがたたかれてtimelineが更新される

  
  return (
    <div className='timeline'>
      <div className='timelineWrapper'>
        <Share />
        {/* posts・・・自分の投稿と自分がフォローしているすべての投稿内容 */}
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
          //postというpropsの名前として渡す
        ))}
      </div>
    </div>
  );
}
