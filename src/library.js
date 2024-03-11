import fs from 'node:fs/promises'
import path from 'node:path'
import { pool } from './db.js'

export const index = async (req, res) => {
  try {
    const pathToFile = path.resolve('./public/index.html')
    const html = await fs.readFile(pathToFile, 'utf-8')

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  } catch (error) {
    console.log(error)
    const pathToFile500 = path.resolve('./public/500.html')
    const html500 = await fs.readFile(pathToFile500, 'utf-8')

    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end(html500)
  }
}

export const importApi = async (req, res) => {
  try {
    const pathToCsv = path.resolve('./data.csv')

    const csv = await fs.readFile(pathToCsv, 'utf-8')
    const csvData = csv.split('\n')

    csvData.shift()
    const ultimoElemento = csvData[csvData.length - 1]
    if (ultimoElemento === '') {
      csvData.pop()
    }

    csvData.forEach(row => {
      const data = row.split(',')
      const query = 'INSERT INTO usuarios(id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      pool.execute(query, data)
    })

    res.writeHead(200, { ' Content-Type': 'aplication/json ' })
    res.end(JSON.stringify({ message: 'Data imported successfully' }))
  } catch (error) {

  }
}
