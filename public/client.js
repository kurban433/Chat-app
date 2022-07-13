
var socket=io("http://localhost/8000")
var name1;
var textarea=document.querySelector("#textaera1")
var messageArea=document.querySelector(".message-area")

 do{
     name1 =prompt("please enter your name")

 }
 while(!name1)
 socket.emit("join the chat ",name1);
 socket.on("user-connect",(socket_name)=>{
  userjoin(socket_name,"joined")
})
 function userjoin(name1,status) {
     let div=document.createElement("div")
     div.classList.add("user-join")
     let content=`<p><b>${name1}</b>${status}the chat</p>`
     div.innerHTML=content;
     messageArea.appendChild(div)
 }

 textarea1.addEventListener("keyup",(e)=>{
    if(e.key === "Enter")
     {
         sendMessage(e.target.value)
     }
 })
 function sendMessage(message) {
     var msg={
         user:name1,
         message:message.trim()
     }
    appendMessage(msg,"out");
 textarea1.value=""
 scroll()

    socket.emit("message",msg)
 }



 function appendMessage(msg,type) {
     var maindiv=document.createElement("div")
     var classname=type
     maindiv.classList.add(classname,"message")
     
     let markup=`
     <h2>${msg.user}</h2>

     <p>${msg.message}</p>`;

    maindiv.innerHTML=markup
    messageArea.appendChild(maindiv)
 
    }

    socket.on("message",(msg)=>{
        appendMessage(msg,"in")
        scroll()
    })

    function scroll() {
        messageArea.scrollTop=messageArea.scrollHeight;
    }
    
