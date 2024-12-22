const router = require("express").Router();
const User = require("../models/User");

//CRUD
//ユーザー情報の作成（auth.jsで作成済み）

//ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //打ち込まれたuserのIDが、パラメターのIDと等しければ、もしくは、isAdminがtrue（権限がある）場合
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        //一人のユーザーを見つけて更新(mongoose)
        //req.params.id(ログイン中のid)のユーザー情報を更新        
        $set: req.body,
        //User.jsのパラメターをすべてを、Postmanで打ち込むbody要素で書き換える
      });
      res.status(200).json("ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントのときだけ情報を更新できます");
  }
})

//ユーザー情報の削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントのときだけ情報を削除できます");
  }
})


//ユーザー情報の取得
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, updatedAt, ...other } = user._doc;//分割代入、スプレッド構文で代入
//     return res.status(200).json(other);//password,updateAtを除外したotherを取得
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//クエリでユーザー情報を取得
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId 
    ? await User.findById(userId) 
    : await User.findOne({ username : username});

    const { password, updatedAt, ...other } = user._doc;//分割代入、スプレッド構文で代入
    return res.status(200).json(other);//password,updateAtを除外したotherを取得
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    //自分自身のIDとこれからフォローするユーザーIDと等しくない場合、フォロー可能
    try {
      //これからフォローするID
      const user = await User.findById(req.params.id);
      //自分自身のID
      const currentUser = await User.findById(req.body.userId);

      //followersに自分自身が含まれていなければ、フォローできる
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {  //配列にPushしていく
            followers: req.body.userId,//followersの中に、自分自身のユーザーIDを入れていく
          },
        });
        //自身のフォロー数を1カウントアップ
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,//followingsの中に、フォローするIDをいれる
          },
        });
        return res.status(200).json("フォローに成功しました");
      } else {
        return res
          .status(403)
          .json("あなたはすでにこうユーザーをフォローしています");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません");
  }
});

//ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      //followersに自身が含まれていれば、フォローを外せる
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {  //配列から取り除く（pull）
            followers: req.body.userId,//followersの中から、自身のユーザーIDを除外
          },
        });
        //自身のフォロー数を1カウントダウン
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォロー解除しました");
      } else {
        return res
          .status(403)
          .json("このユーザーは、フォロー解除できません");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません");
  }
});

module.exports = router;