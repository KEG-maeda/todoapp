// 更新処理

const mysql = require("mysql2/promise")//mysql2のライブラリ「promise」を読み込む
const config = require("../../config.js");// <-　[config.js]

/**
 * タスクを更新するAPI
 *
 * @returns レスポンス JSON
 */

updateTasks = async function (id, body) {
    let connection = null;//この中にデータベースと接続できているかのしるしを入れる。お守り定型文
    try {
        connection = await mysql.createConnection(config.dbSetting);//config.jsにあるdbSettingオブジェクトを入れる
                                   //↑↑これでDBに接続する。これもお決まりお守り。mysql.createConnectionの仕様は調べて
        const sql = 
        "UPDATE `todoapp`.`t_task` SET `task_name`=?, `deadline`=?, `category_id`=?, `task_status`=?, `updated_at`=? WHERE id=?;";
        // SQL文（文字列）は改行できない
        //update_atはSQL構文の中に「CURRENT_TIMESTAMP()」でも出来たが・・・
        let d = [
            body.taskName, 
            body.deadline, 
            body.category, 
            body.status, 
            new Date(),
            id];
        const [rows, fields] = await connection.query(sql, d);

        return rows;//[api/index.js] ->
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.updateTasks = updateTasks;