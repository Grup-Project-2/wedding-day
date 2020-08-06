const express = require('express')
const app = express()
const port = 3000
const routes = require('../server/routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get(routes)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})