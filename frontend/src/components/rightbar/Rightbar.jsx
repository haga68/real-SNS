import React from 'react';
import "./Rightbar.css";
import { Users } from '../../dummyData';
import Online from '../online/Online';

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  
  // HomeComponentのrightbar
  const HomeRightbar = () => {
    return(
      <>
        {/* イベント */}
        <div className="eventContainer">
          <img src={ PUBLIC_FOLDER + "/star.png" } className='starImg' />
          <span className='eventText'>
            <b>フォロワー限定</b>イベント開催中！
          </span>
        </div>
        {/* オンラインの友人 */}
        <img src={ PUBLIC_FOLDER + "/event.jpeg"} className='eventImg'/>x
        <h4 className='rightbarTitle'>オンラインの友達</h4>
        <ul className='rightbarFriendList'>
          {Users.map((user) => (
          <Online user={user} key={user.id} />  
          ))}
        </ul>
        {/* プロモーション広告 */}
        <p className='promotionTitle'>プロモーション広告</p>
        <img src={ PUBLIC_FOLDER + "/promotion/promotion1.jpeg"} className='rightbarPromotionImg'/>
        <p className='promotionName'>ショッピング</p>
        <img src={ PUBLIC_FOLDER + "/promotion/promotion2.jpeg"} className='rightbarPromotionImg'/>
        <p className='promotionName'>カーショップ</p>
        <img src={ PUBLIC_FOLDER + "/promotion/promotion3.jpeg"} className='rightbarPromotionImg' />
        <p className='promotionName'>株式会社</p>
      </>
    )
  };

  // ProfileComponentのrightbar
  const ProfileRightbar = () => {
    return (
      <>
      <h4 className='rightbarTitle'>ユーザー情報</h4>
      <div className='rightbarInfo'>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>出身：</span>
          <span className='rightbarInfoKey'>福岡</span>
        </div>
        <h4 className='rightbarTitle'>あなたの友達</h4>
        <div className='rightbarFollowings'>
          <div className="rightbarFollowing">
            <img src={ PUBLIC_FOLDER + "/person/1.jpeg" } className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Shin Code</span>
          </div>
          <div className="rightbarFollowing">
            <img src={ PUBLIC_FOLDER + "/person/2.jpeg" } className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Yamaki</span>
          </div>
          <div className="rightbarFollowing">
            <img src={ PUBLIC_FOLDER + "/person/3.jpeg" } className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Koga</span>
          </div>
          <div className="rightbarFollowing">
            <img src={ PUBLIC_FOLDER + "/person/4.jpeg" } className='rightbarFollowingImg' />
            <span className='rightbarFollowingName'>Matsukubo</span>
          </div>
          <div className="rightbarFollowing">
            <img src={ PUBLIC_FOLDER + "/person/5.jpeg" } className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Kikukawa</span>
          </div>
        </div>
      </div>
      </>
    )
  };

  // 共通部分
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {/* userの有無で表示を分ける */}
        {user ? <ProfileRightbar /> : <HomeRightbar /> }
      </div>
    </div>
  );
}
