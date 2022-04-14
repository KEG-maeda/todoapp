var express = require("express");
// const items = require("../../src/items");
const create = require("../../src/tasks/create.js");

var router = express.Router();

/* タスク登録ルーティング */
router.post("/tasks", async function (req, res, next) {//こいつが動いてない？console.log(req.body)が出力されてないし
                                                      // asyncが抜けてました！！！！！
  console.log(req.body);//javascripts/index.jsのJSON.stringify(data)
  const createTask = create.postTasks(req.body);
  res.send(createTask);
});

/*１件の商品情報を取得するルーティング */
// router.get("/items/:id", function (req, res, next) {
//   const item = items.getItem(req.params.id);
//   res.send(item);
// });

module.exports = router;
