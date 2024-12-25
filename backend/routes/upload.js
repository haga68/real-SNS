const router = require("express").Router();
const multer = require("multer"); //画像投稿ライブラリ

// 画像は、ローカルサーバーにアップロード（MongoDBではない）

// storageの設定（どこに保存するか、保存する画像の名前）
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, req.originalname);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

//画像アップロード用API
// （第1引数：エンドポイントの指定、第2引数：ミドルウェアの設定、第3引数：コールバック関数）
router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("画像アップロードに成功しました");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
