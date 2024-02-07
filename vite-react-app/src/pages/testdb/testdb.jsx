import Db from '../../db'

const dbPages = () =>{
    const sql = 'SELECT * FROM makanan'
    var data = []
    Db.all(sql, (err, rows) => {
        if(err){
            throw err
        }
        data = rows
    })
    return(
        <div>
            <p>ini datanya</p>
            <p>{data}</p>
        </div>
    )
}

export default dbPages