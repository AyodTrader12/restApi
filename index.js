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
  }
];


const PORT = 3001;
const app = express();

app.use(express.json())

app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id",(req,res) => {
    try{
     const id = Number(req.params.id);
    const user = users.find(user =>user.id === id)
    return res.status(201).json({
    message:"found user",
   data:user,
   status:200

   
    })
    }catch(err){
  if (!user) {
    return res.status(404).json({
      message: err.message,
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
    message:"user created",
   data:newUser,
   status:201,
   
});
}catch(err){
    return res.status(404).json({
        message: err.message,
        status:404
      });
}
})



app.get("/users", (req, res) => {
  res.json({
    message: "Here are the users"
  });
});



app.listen(PORT, () => {
    console.clear()
    console.log(`Server is running on http://localhost:${PORT}`);
});

