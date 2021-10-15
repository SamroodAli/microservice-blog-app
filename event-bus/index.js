const express = require('express')
const {json,urlencoded} = require("body-parser")
const axios = require('axios')
const morgan = require("morgan")

const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
app.use(morgan('dev'))

