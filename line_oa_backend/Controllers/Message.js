const conn = require('../Config/ConnectDB')


exports.getMessageAlldata = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM message1 ORDER BY sm_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumMessageData = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(messages) AS messages," +
            "SUM(friend_broadcast) AS friend_broadcast," +
            "SUM(target_broadcast) AS target_broadcast," +
            "SUM(first_message_for_first_using) AS first_message_for_first_using," +
            "SUM(push) AS push," +
            "SUM(multicast) AS multicast," +
            "SUM(reply) AS reply" +
            " FROM message1";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getGreetingMessage = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM greeting_message";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getResultSumGreetingMessage = async (req, res) => {
    try {
        //Code
        const sql = "SELECT tb1.sum_usr_ms,tb1.sum_usr_read_ms," +
            "ROUND((tb1.sum_usr_read_ms/tb1.sum_usr_ms), 3) AS rate_op_ms," +
            "tb1.sum_usr_click_ms," +
            "ROUND((tb1.sum_usr_click_ms/tb1.sum_usr_read_ms),3) AS rate_usr_click" +
            " FROM (SELECT " +
            "SUM(user_recieve_message) AS sum_usr_ms," +
            "SUM(user_open_read) AS sum_usr_read_ms," +
            "SUM(user_click_message) AS sum_usr_click_ms" +
            " FROM greeting_message) AS tb1";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getGreetingImpression = async (req, res) => {
    try {
        //Code
        const sql = "SELECT m_impression, send_number," +
            "impression,impression_click," +
            "rate_impression_click," +
            "impression_user_click" +
            " FROM greeting_message_impression";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.json(500).send('Server Error!')
    }
}

exports.getSumGreetingImpression = async (req, res) => {
    try {
        //Code
        const sql = "SELECT tb1.impression,tb1.impression_click," +
            "ROUND((tb1.impression_click/tb1.impression),3) AS rate_impression_click," +
            "tb1.impression_user_click" +
            " FROM (SELECT SUM(impression) AS impression," +
            "SUM(impression_click) AS impression_click," +
            " SUM(impression_user_click) AS impression_user_click" +
            " FROM greeting_message_impression) AS tb1";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}