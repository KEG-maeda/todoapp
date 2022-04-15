// 1件の情報取得処理

const mysql = require("mysql2/promise")//mysql2のライブラリ「promise」を読み込む
const config = require("../../config.js");// <-　[config.js]

/**
 * タスクを取得するAPI
 *
 * @returns レスポンス JSON
 */

getTasks = async function (body) {
    let connection = null;//この中にデータベースと接続できているかのしるしを入れる。お守り定型文
    try {
        console.log(body.id);
        console.log()
        connection = await mysql.createConnection(config.dbSetting);//config.jsにあるdbSettingオブジェクトを入れる
                                   //↑↑これでDBに接続する。これもお決まりお守り。mysql.createConnectionの仕様は調べて
        const sql = "SELECT `id`, `task_name`, `deadline`, `category_id`, `task_status` FROM `todoapp`.`t_task`;";
        let d = [body.id]
        const [rows, fields] = await connection.query(sql, d);

        return rows;//[api/index.js] ->
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.getTasks = getTasks;