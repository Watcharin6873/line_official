const conn = require('../Config/ConnectDB')

exports.getAllBroadcast = async (req, res) => {
    try {
        //Code
        const sql = "SELECT " +
            "DATE_FORMAT(date_send,'%Y-%m-%d') AS date_send," +
            "SUM(send_broadcast) AS send_broadcast," +
            "SUM(open_broadcast) AS open_broadcast," +
            "SUM(user_click) AS user_click," +
            "SUM(user_watch) AS user_watch," +
            "SUM(user_watch_end) AS user_watch_end" +
            " FROM broadcast" +
            " GROUP BY DATE_FORMAT(date_send,'%Y-%m-%d')" +
            " ORDER BY date_send ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.getSumBroadcast = async (req, res) => {
    try {
        //Code
        const sql = "SELECT " +
            "SUM(send_broadcast) AS send_broadcast," +
            "SUM(open_broadcast) AS open_broadcast," +
            "SUM(user_click) AS user_click," +
            "SUM(user_watch) AS user_watch," +
            "SUM(user_watch_end) AS user_watch_end" +
            " FROM broadcast";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}