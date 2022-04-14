// 新規登録処理

const mysql = require("mysql2/promise")//mysql2のライブラリ「promise」を読み込む
const config = require("../../config.js");// <-　[config.js]

/**
 * タスクを新規登録するAPI
 *
 * @returns レスポンス JSON
 */

postTasks = async function (body) {
    let connection = null;//この中にデータベースと接続できているかのしるしを入れる。お守り定型文
    try {
        connection = await mysql.createConnection(config.dbSetting);//config.jsにあるdbSettingオブジェクトを入れる
                                   //↑↑これでDBに接続する。これもお決まりお守り。mysql.createConnectionの仕様は調べて
        const sql = "INSERT INTO `todoapp`.`t_task` (`task_name`, `deadline`, `category_id`) VALUES(?, ?, ?);";
        let d = [body.taskName, body.deadline, body.category];
        const [rows, fields] = await connection.query(sql, d);

        return rows;//[api/index.js] ->
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.postTasks = postTasks;