var express=require("express")
var app=express()
var http=require("http").createServer(app)
var PORT=process.env.PORT || 8000
var user={};


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.use(express.static(__dirname+"/public"))


http.listen(PORT,()=>{
    console.log("done")
});

var io=require("socket.io")(http)

io.on ("connection",(socket)=>{
    socket.on("join the chat",(name1)=>{
        user[socket.id]=name1;
        socket.broadcast.emit("user-connect",name1)
    })
    console.log("connection");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })
})


