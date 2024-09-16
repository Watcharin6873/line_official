const conn = require('../Config/ConnectDB')

exports.getSumLiffTotal = async (req, res) => {
    try {
        //Code
        const sql = "SELECT " +
            "SUM(total_user_page_view) AS users_pageview," +
            "SUM(total_user_first_visit) AS users_firstvisit," +
            "SUM(total_event_page_view) AS event_pageview," +
            "SUM(total_event_scroll) AS event_scroll," +
            "SUM(total_event_session_start) AS event_sesionstart," +
            "SUM(total_event_user_engagement) AS event_engagement" +
            " FROM liff_daily";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getAllLiffData = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM liff_daily";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getLiffUsers = async (req, res) => {
    try {
        //Code
        const sql = "SELECT DATE_FORMAT(d_liff,'%Y-%m') AS m_liff," +
            "w_liff,SUM(u_liff) AS u_liff FROM liff_users2" +
            " GROUP BY DATE_FORMAT(d_liff,'%Y-%m'),w_liff";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getAllLiffUsers = async (req, res) => {
    try {
        //Code
        const sql = "SELECT DATE_FORMAT(d_liff,'%Y-%m-%d') AS d_liff," +
            "w_liff,u_liff FROM liff_users2" ;

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}