import express from "express";

let users = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com"
  },
  {
    id: 2,
    name: "Sarah",
    email: "sarah@gmail.com"
  },
  {
    id:3,
    name:"virtue",
    email:"virtue@gmail.com"
  },
  {
    id:4,
    name:"gideon",
    email:"gideon@gmail.com"
  },
  {
    id:5,
    name:"godswill",
    email:"goddswill@gmail.com"
  }
];


const PORT = 3001;
const app = express();

app.use(express.json())
app.get("/",(req,res) => {
    res.send("welcome to my first express backend")
})
app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id",(req,res) => {
    try{
     const id = Number(req.params.id);
    const user = users.find(user =>user.id === id)
    return res.status(200).json({
    message:"found user",
   data:user,
   status:200

    })
    
    }catch(err){
  if (!user) {
    return res.status(404).json({
      message:"User not found",
      status:404
    });
  }

    }
})

app.post("/createUser",(req,res) =>{
try{
// const {name,email} = req.body;
const newUser = {
        id: users.length + 1,
    name: req.body.name,
    email: req.body.email

}
users.push(newUser)
console.log(users)
return res.status(201).json({
    message:"user created successfully",
   data:newUser,
   status:201,
   
});
}catch(err){
    return res.status(404).json({
        message: "User not created",
        status:404
      });
}
})


app.get("/users",(req,res) => {
    res.json({message: "Here are the users", data:users})
})



app.listen(PORT, () => {
    console.clear()
    console.log(`Server is running on http://localhost:${PORT}`);
});

