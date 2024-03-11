import mysql2 from 'mysql2'
import { DB_DATABASE } from './config.js'
export const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuarios.csv'
})
