var express = require("express");
const create = require("../../src/tasks/create.js");
const list = require("../../src/tasks/list.js");
const get = require("../../src/tasks/get.js");
const update = require("../../src/tasks/update.js");
const del = require("../../src/tasks/delete.js"); //delete演算子なるものがありdeleteを変数にできないらしい

var router = express.Router();

/* タスク登録ルーティング */
router.post("/tasks", async function (req, res, next) {//こいつが動いてない？console.log(req.body)が出力されてないし
                                                      // asyncが抜けてました！！！！！
  console.log(req.body);//javascripts/index.jsのJSON.stringify(data)
  const createTask = await create.postTasks(req.body);
  res.send(createTask);
});

// タスク一覧ルーティング
router.get("/tasks", async function (req, res, next) {
  const listTask = await list.listTasks();
  res.send(JSON.stringify(listTask));
});

/*１件の情報を取得するルーティング */
router.get("/tasks/:id", async function (req, res, next) {//「:id」はidという名前のパラメーター 。「:_id」なら_idという名前のパラメーターになる
  const getTask = await get.getTasks(req.params.id);//「params.id」はidという名前のパラメーターを引っ張るという意味。params.id(:id)にはupdate_idが入っている
  res.send(JSON.stringify(getTask));
});

// タスク更新ルーティング
router.patch("/tasks/:id", async function (req, res, next) {
  const updateTask = await update.updateTasks(req.params.id, req.body);
  res.send(JSON.stringify(updateTask));
});

// タスク削除ルーティング
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTask = await del.deleteTasks(req.params.id);
  res.send(JSON.stringify(deleteTask));
});

module.exports = router;
