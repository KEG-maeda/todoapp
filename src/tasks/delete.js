// 1件のデータ削除処理

const mysql = require("mysql2/promise")//mysql2のライブラリ「promise」を読み込む
const config = require("../../config.js");// <-　[config.js]

/**
 * タスクを削除するAPI
 *
 * @returns レスポンス JSON
 */

deleteTasks = async function (id) {
    let connection = null;//この中にデータベースと接続できているかのしるしを入れる。お守り定型文
    try {
        console.log("body.id is " + id)
        connection = await mysql.createConnection(config.dbSetting);//config.jsにあるdbSettingオブジェクトを入れる
                                   //↑↑これでDBに接続する。これもお決まりお守り。mysql.createConnectionの仕様は調べて
        const sql = "DELETE FROM `todoapp`.`t_task` WHERE id=?;";
        let d = [id]
        const [rows, fields] = await connection.query(sql, d);

        return rows;//[api/index.js] ->
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.deleteTasks = deleteTasks;