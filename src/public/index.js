

console.log("js funcionando")

const socketClient = io()

const chatContainer = document.getElementById("chatContainer")


socketClient.on("messagesChat", (data)=>{
    console.log(data)
    let messages="";
    data.forEach(element => {
        messages += `<p> Autor: ${element.author} - message: ${element.text} </p>`     
    });
    chatContainer.innerHTML = messages
})

//capturar el nombre del usuario
let user = ""
Swal.fire({
    title:"Bienvenido",
    text:"Ingresa el nombre del usaurio",
    input:"text",
    allowOutsideClick: false
}).then(response=>{
    console.log(response)
    user = response.value
    document.getElementById("username").innerHTML =  ` Hola ${user}`
})

//enviar el mensaje
const chatForm = document.getElementById("chatForm")
chatForm.addEventListener("submit",(event)=>{
    //prevenir que se recargue cuando se envie el formulario
    event.preventDefault()
    console.log("formulario enviado")
    const message = {
        author: user,
        text: document.getElementById("messageChat").value
    }
    socketClient.emit("newMsg", message)
})
