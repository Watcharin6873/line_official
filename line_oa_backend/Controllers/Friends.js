const conn = require('../Config/ConnectDB')

exports.getAllLineFriends = async (req, res) =>{
    try {
        //Code
        const sql = "SELECT * FROM friends";

        conn.query(sql, (err, result)=>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.getLastFriends = async (req, res) =>{
    try {
        //
        const sql = "SELECT * FROM friends WHERE date_ymd = '2024-07-31'";

        conn.query(sql, (err, result)=>{
            if (err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
    }
}


exports.getMonthLineFriends = async (req, res) =>{
    try {
        //code
        const sql = "SELECT * FROM `friends` WHERE `day` IN ('20240131','20240229','20240331','20240430','20240531','20240630','20240731')";

        conn.query(sql, (err, result)=>{
            if(err) throw err;
            res.json(result)
        })
    } catch (err) {
        console.log(err)
    }
}