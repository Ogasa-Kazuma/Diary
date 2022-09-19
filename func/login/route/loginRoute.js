const router = require("express").Router();
const AccountManager = require("../AccountManager.js");
const accountManager = new AccountManager();

router.get("/", (req, res) => {
    res.render("login", {message : ""});
})

function isValidRequest(req){
    if(req === undefined){
        return false;
    }
    if(!req.body.id){
        return false;
    }
    if(!req.body.password){
        return false;
    }
    return true;
}

router.post("/", async (req, res, next) => {
    /**
     * リクエストでユーザーIDとパスワードを受け取る 
     * ユーザIDから、DBに実際に登録されているパスワードを見つけてくる
     * 入力されたパスワードと、登録済みアカウントのパスワードを照合する
     * パスワードが一致しない場合はもう一度ログインページへ。このとき認証できなかったことを通知
     * ログインに成功した場合はセッションを発行
     * サイトのトップページに移動
     * */
     
     // 未登録の場合はどうする？
    if(!isValidRequest(req)){
        console.log("必須項目(ユーザーIDとpassword)が入力されていません");
        return res.render("login", {message : "必須項目(ユーザーIDとpassword)が入力されていません"});
    }
    const readResult = (await accountManager.read(req.body.id));
    console.log(readResult);
    if(readResult == null){
        console.log("ユーザーデータが登録されていません");
        // ユーザーデータが登録されてないことをユーザにどう伝える？
        return res.render("login", {message : "ユーザーデータが登録されていません"});
    }
    const registeredPassword = readResult.dataValues.password;
    
    if(req.body.password === registeredPassword){
        req.session.loginID = req.body.id;
        res.redirect("/articles/");
    }else{
        res.render("login", {message : "パスワードが一致しませんでした"});
    }
})

router.use((req, res) => {
    res.send("ログインページへのパスパラメータが不正です");
})

module.exports = router;