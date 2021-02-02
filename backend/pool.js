const pg = require('pg')

const connectDatabase = () => {
    const pool = new pg.Pool( {

        user: 'postgres',
        password: 'postgres',
        database: 'logintest',
        host: 'localhost'
        }

    )

    return pool;
}


module.exports = connectDatabase()
