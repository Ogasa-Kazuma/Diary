const router = require("express").Router();

router.get("/", (req, res) => {
    // cloud9のPreviewではなぜ見えない？
    res.render("articles");
})

router.get("/:date", (req, res) => {
    const date = req.params.date;
    res.render("articles/" + date);
})

router.use((req, res) => {
    res.send("article/ 以下のパスが不正です");
})

module.exports = router;