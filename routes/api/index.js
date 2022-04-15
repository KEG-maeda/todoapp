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
router.get("/tasks/id", async function (req, res, next) {
  const getTask = await get.getTasks(req.body);
  res.send(JSON.stringify(getTask));
});

// タスク更新ルーティング
router.patch("/tasks", async function (req, res, next) {
  const updateTask = await update.updateTasks(req.body);
  res.send(JSON.stringify(updateTask));
});

// タスク削除ルーティング
router.delete("/tasks", async function (req, res, next) {
  console.log("hello delete")
  const deleteTask = await del.deleteTasks(req.body);
  res.send(JSON.stringify(deleteTask));
});

module.exports = router;
