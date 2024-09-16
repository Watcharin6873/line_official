const conn = require('../Config/ConnectDB')


exports.getAllLineVoom = async (req, res) =>{
    try {
        //Code
        const sql = "SELECT * FROM line_voom_3";

        conn.query(sql, (err, result) =>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getTotalLineVoom = async (req, res) =>{
    try {
        //Code
        const sql = "SELECT * FROM line_voom_total";

        conn.query(sql, (err, result) =>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.getMonthLineVoom = async (req, res) =>{
    try {
        //Code
        const sql = "SELECT * FROM line_voom_month";

        conn.query(sql, (err, result) =>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}