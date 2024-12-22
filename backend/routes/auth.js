const router = require("express").Router();
const User = require("../models/User");

//ユーザー登録のアルゴリズム
router.post("/register", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,//requestに含まれるbody要素の中のusernameを格納
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();//ドキュメントを保存
    return res.status(200).json(user);//200番エラーなし
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ログイン
router.post("/login",async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //打ち込まれたemail情報を含む、userを一人探してくる（mongooseの関数）
    if(!user) return res.status(404).send("ユーザーが見つかりません");

    const vailedPassword = req.body.password === user.password;
    //打ち込まれたパスワードとuserのパスワードが適合したら、
    //変数vailedPasswordにtrueを格納、適合しなければ、falseを格納

    //パスワードが正しくなければ
    if(!vailedPassword) return res.status(400).json("パスワードが違います");
    //パスワードが正しければ
    return res.status(200).json(user);
    
  } catch (err) {
   return res.status(500).json(err); 
  }
});


// router.get("/", (req, res) => {
//   res.send("auth router");
// });

module.exports = router;