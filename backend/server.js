const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 5000;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

//データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });
//thenメソッドがパスワードの入力ミスだった場合のためcatch文を追加


//ミドルウェア(Express)
app.use("/images", express.static(path.join(__dirname, "public/images")));
  //静的フィアルに関しては、現在のディレクトリとpublic/imagesを見にいくようにという記載
app.use(express.json());          //json形式で情報を取り扱う
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);


// app.get("/", (req,res) => {
//   res.send("Hello Express");
// });



app.listen(PORT, () => console.log("サーバーが起動しました"));
