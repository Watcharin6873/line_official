const conn = require('../Config/ConnectDB')

//Activity ALL
exports.getActivityAll = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_ALL,imp_ALL," +
            "impUU_ALL,click_ALL,clickUU_ALL,clickUURate_ALL" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityALL = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_ALL) AS imp_ALL," +
            "SUM(impUU_ALL) AS impUU_ALL," +
            "SUM(click_ALL) AS click_ALL," +
            "SUM(clickUU_ALL) AS clickUU_ALL," +
            "ROUND((SUM(clickUU_ALL)/SUM(impUU_ALL)),3) AS clickUURate_ALL" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

//Activity A
exports.getActivityA = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_A,imp_A," +
            "impUU_A,click_A,clickUU_A,clickUURate_A" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityA = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_A) AS imp_A," +
            "SUM(impUU_A) AS impUU_A," +
            "SUM(click_A) AS click_A," +
            "SUM(clickUU_A) AS clickUU_A," +
            "ROUND((SUM(clickUU_A)/SUM(impUU_A)),3) AS clickUURate_A" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

//Activity B
exports.getActivityB = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_B,imp_B," +
            "impUU_B,click_B,clickUU_B,clickUURate_B" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityB = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_B) AS imp_B," +
            "SUM(impUU_B) AS impUU_B," +
            "SUM(click_B) AS click_B," +
            "SUM(clickUU_B) AS clickUU_B," +
            "ROUND((SUM(clickUU_B)/SUM(impUU_B)),3) AS clickUURate_B" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

//Activity C
exports.getActivityC = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_C,imp_C," +
            "impUU_C,click_C,clickUU_C,clickUURate_C" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityC = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_C) AS imp_C," +
            "SUM(impUU_C) AS impUU_C," +
            "SUM(click_C) AS click_C," +
            "SUM(clickUU_C) AS clickUU_C," +
            "ROUND((SUM(clickUU_C)/SUM(impUU_C)),3) AS clickUURate_C" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

//Activity D
exports.getActivityD = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_D,imp_D," +
            "impUU_D,click_D,clickUU_D,clickUURate_D" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityD = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_D) AS imp_D," +
            "SUM(impUU_D) AS impUU_D," +
            "SUM(click_D) AS click_D," +
            "SUM(clickUU_D) AS clickUU_D," +
            "ROUND((SUM(clickUU_D)/SUM(impUU_D)),3) AS clickUURate_D" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

//Activity E
exports.getActivityE = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_E,imp_E," +
            "impUU_E,click_E,clickUU_E,clickUURate_E" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityE = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_E) AS imp_E," +
            "SUM(impUU_E) AS impUU_E," +
            "SUM(click_E) AS click_E," +
            "SUM(clickUU_E) AS clickUU_E," +
            "ROUND((SUM(clickUU_E)/SUM(impUU_E)),3) AS clickUURate_E" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

//Activity F
exports.getActivityF = async (req, res) => {
    try {
        //Code
        const sql = "SELECT rich_date,activity_F,imp_F," +
            "impUU_F,click_F,clickUU_F,clickUURate_F" +
            " FROM rich_menu ORDER BY rich_date ASC";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumActivityF = async (req, res) => {
    try {
        //Code
        const sql = "SELECT SUM(imp_F) AS imp_F," +
            "SUM(impUU_F) AS impUU_F," +
            "SUM(click_F) AS click_F," +
            "SUM(clickUU_F) AS clickUU_F," +
            "ROUND((SUM(clickUU_F)/SUM(impUU_F)),3) AS clickUURate_F" +
            " FROM rich_menu";

        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}