const express = require('express')
const {json,urlencoded} = require("body-parser")
const axios = require('axios')
const morgan = require("morgan")

const PORT=  4005
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
app.use(morgan('dev'))

app.post("/events",(req,res)=>{
  const event = req.body
  axios.post("http://localhost:4000/events",event)
  axios.post("http://localhost:4001/events",event)
  axios.post("http://localhost:4002/events",event)
})

app.listen(PORT,()=>{
  console.log(`Event Bus listening on ${PORT}`)
})