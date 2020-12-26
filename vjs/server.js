const express = require ('express');
const app = express()
 port = 3000
app.listen(3000, ()=> console.log(listening))

app.get('/',(req,res) => {
    console.log("say Hello")
})


/*

const http = require('htttp');

const server = http.createServer((req,res) => {
    res.status = 200;
    res.stateHeader ('Content-Type', 'text/plain');
    res.end('Servidor web iniciando')
})

server.listen(3000,()=> {
    console.log('Server on port 3000');
}) */

fetch("https://api.randomuser.me/?nat=US&results=1")
.then(res => res.json())
.then(json => json.results)
.then(console.log)
.catch(console.error);