const express = require('express')
const {json,urlencoded} = require('body-parser')
const morgan = require("morgan")

const PORT = 4002
const app = express()

app.use(json())
app.use(urlencoded({extended:true}))

app.listen(PORT,()=>{
  console.log(`Query server listening on port ${PORT}`)
})