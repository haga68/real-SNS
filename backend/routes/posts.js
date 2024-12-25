const router = require("express").Router();
const { pluralize } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

//投稿を作成する
router.post("/", async (req, res) => {
  const newPost = new Post(req.body); //インスタンス化
  try {
    const savedPost = await newPost.save(); //保存（データベースに）
    return res.status(200).json(savedPost);
  } catch (err) {
    //エラーがはかれる場合（例：条件をみたしていない、型が違う・・・）
    return res.status(500).json(err);
  }
});

//投稿を更新する
router.put("/:id", async (req, res) => {
  try {
    //とある一つのpost情報を探してくる
    const post = await Post.findById(req.params.id);

    //投稿した本人である場合
    //投稿したuserのId（post.userId）とこれから編集するuserIdが等しい場合
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body, //Postmanで打ち込む情報をセットして、情報を更新
      });
      return res.status(200).json("投稿編集に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を編集できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//投稿を削除する
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //投稿したID
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("投稿削除に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//特定の投稿を取得する（第三者も取得できる）
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
  try {
    //いいねを押したい投稿のid(req.params.id)から投稿を取り出す
    const post = await Post.findById(req.params.id);

    //まだ投稿にいいねが押されていなければ、いいねが押せる
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId, //likesの中に自分のuserIdを入れていく
        },
      });
      return res.status(200).json("投稿にいいねを押しました！");
      //投稿にすでにいいねが押されていたら
    } else {
      //いいねしているユーザーIDを取り除く
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json("投稿にいいねを外しました");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//プロフィール専用のタイムラインの取得
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    //IDではなく、名前によって探すのでfindByIdではなくfindOne（propatyの指定が必要）を使用
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//タイムラインの投稿を取得(:userIdで誰のタイムラインをみたいのかを指定)
router.get("/timeline/:userId", async (req, res) => {
  try {
    //自分自身の投稿の取得
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    //自分がフォローしている友達の投稿内容を取得
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
        //friendIdをuserId属性として指定すると、
        //そのuserIdのポストをすべて見つけることができる
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
