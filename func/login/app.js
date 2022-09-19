const path = require('path');
const loginRoute = require("./route/loginRoute.js");
const articlesRoute = require("./route/articleRoute.js");
const express = require("express");
const app = express();
const logger = require("morgan");
const session = require('express-session');
const bodyParser = require('body-parser');
const AccountManager = require("./AccountManager.js");

const accountManager = new AccountManager();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

function checkLogin(req, res, next){
    // めちゃくちゃ無限ループ的にloginページにリダイレクトしちゃったwwwwwww
    if(!req.session.loginID){
        console.log("ログインしていない状態であるためログインページをrenderします");
        res.render("login", {message: ""});
    }else{
        console.log("ログイン成功後、アクセスしました");
        next();
    }
}

const session_opt = {
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}

app.use(logger("dev"));
// これがなかったらreqオブジェクトの中にsessionプロパティなくなる？
app.use(session(session_opt));
// よくわからない
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// 上記のミドルウェアの定義後に書く！
app.use("/login", loginRoute);

// まずログイン済みかチェック
app.use(checkLogin);

// 各パスにルーティング
app.use("/articles", articlesRoute);
app.use("/test/login", (req, res) => {
    console.log("form action test path");
})

app.listen(8080, async () => {
    await accountManager.changeAllUserName("Jagewkopekwpopt");
    console.log("port 8080 listen start");
})
