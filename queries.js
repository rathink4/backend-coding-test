const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'expenses',
    password: 'password',
    port: 5432,
})

const getExpenses = (req, res) => {
    pool.query('SELECT * FROM users_expenses', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows)
    })
}

const addExpenses = (req, res) => {
    const {date, amount, reason} = req.body
    const vat = parseFloat((parseFloat(amount)/100) * 20)
    const amount_with_vat = parseFloat(amount) + vat
    pool.query('INSERT INTO users_expenses (date, amount_with_vat, reason, vat) VALUES ($1, $2, $3, $4)', [date, amount_with_vat, reason, vat], (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).json({message: 'Added new expense'})
    })
}

module.exports = {getExpenses, addExpenses}