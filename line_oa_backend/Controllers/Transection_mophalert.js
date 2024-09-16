const conn = require('../Config/ConnectDB')


exports.getTransectionMophAlert = async (req, res) => {
    try {
        //Code
        const { hospital_code, startDate, endDate } = req.query;
        const sql = "SELECT * FROM sum_transection_sendmessage "+
                    "WHERE hospital_code = ? AND (substr(created_at, 1,10) BETWEEN ? AND ?)";
        conn.query(sql, [hospital_code, startDate, endDate], (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.getListHospMophAlert = async (req, res) =>{
    try {
        //Code 
        const sql = "SELECT DISTINCT hospital_code, hospital_name FROM sum_transection_sendmessage";

        conn.query(sql, (err, result)=>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.getSumTransections = async (req, res) =>{
    try {
        //Code
        const sql = "SELECT * FROM sum_transection_sendmessage ORDER BY created_at ASC";

        conn.query(sql, (err, result)=>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.getSumMonthTrans = async (req, res) =>{
    try {
        //Code
        const sql ="SELECT created_m,m_short_eng,SUM(transection) AS t_tran"+
                    " FROM sum_transection_sendmessage"+
                    " GROUP BY created_m, m_short_eng"+
                    " ORDER BY created_m ASC";

        conn.query(sql, (err, result)=>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
    }
}