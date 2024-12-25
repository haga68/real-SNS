import React, { useContext, useEffect, useState } from 'react';
import "./Post.css";
import { MoreVert } from '@mui/icons-material';
// import { Users } from '../../dummyData';
import axios from "axios";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Post({ post }) {  //TimeLine Componentからpropsの受取り
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // いいねの数
  const [like, setLike] = useState(post.likes.length);
  // いいねが押されてるかどうか
  const [isLiked, setIsLiked] = useState(false);
  //投稿しているユーザー情報
  const [user, setUser] = useState({}); //一人なので？配列ではなく、オブジェクトとしてもつ
  //ログインしているユーザー情報
  // （注：上記のuserとは別モノ・・・名前を被らないように、currentUserと命名しておく）
  const {user: currentUser} = useContext(AuthContext);

  // APIをたたいてユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      // const response = await axios.get(`/users/${post.userId}`);
      const response = await axios.get(`/users?userId=${post.userId}`);
      // post.userId（投稿したユーザーのユーザーID）//クエリ文に書き換え
      // console.log(response);

      // ユーザー情報の設定
      setUser(response.data); 
    };
    fetchUser();
  }, [post.userId]);
  //post.userIdが変わるたび、useEffectが発火して、何度もAPIが呼び出される
  // つまり、POSTが投稿されるたびにこの更新される


  const handleLike = async () => {
    try {
      //いいねのAPIをたたいていく（投稿IDと（いいねしようとしている）ユーザーIDが必要）
      await axios.put(`/posts/${post._id}/like`,{userId:currentUser._id});
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    //既に押されているなら、いいねを-1。押されてなければ+1
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img src={user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture 
                    : PUBLIC_FOLDER + "/person/noAvatar.png"} 
                className='postProfileImg' />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>

        <div className='postCenter'>
          <span className='postText'>{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.img} alt="" className='postImg' />
        </div>
        <div className='postBottom'>
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
              alt=""
              className='likeIcon'
              onClick={() => handleLike()}
            />
            <span className='postLikeCounter'>
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className='postCommentText'>{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  )
}
