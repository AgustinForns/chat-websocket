//cramos el servdiro de express
const express = require("express")
const {Server} = require("socket.io")
const app = express()

const PORT = process.env.PORT || 8080 //son variables que cambian dependiendo el lugar donde este ejecutando el proyecto. Las dos barras me dicen que si no encuentra el primer termino por defecto tome 8080

const server = app.listen(PORT, ()=>{
    console.log(`server listening ${PORT}`)
})

app.use(express.static(__dirname+"/public"))

//configurar el web socket
const io = new Server(server)

const messages = [
    {author:"pedro", text:"vare"},
    {author:"ana", text:"asdgaerwg"}
]

//detectar cada socket de un cliente que se conecte
io.on("connection", (socket)=>{
    console.log("nuevo cliente conectado")
    //enviar los mensajes al cliente
    socket.emit("messagesChat", messages)

    //recibir el mensaje
    socket.on("newMsg", (data)=>{
        messages.push(data)
        //enviamos los msg a todos los sockets conectados
        io.sockets.emit("messagesChat", messages)
    })
})