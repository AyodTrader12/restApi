import express from "express";
import { Router } from "express";
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

const products = [
    {
        id:1,
        productName:"Laptop",
        price:1000,
        category:"Electronics"
    },
    {
        id:2,
        productName:"iphone16",
        price:200000,
        category:"Electronics"
    },
    {
        id:3,
        productName:"Samsung Galaxy S23",
        price:150000,
        category:"Electronics"
    },
    {
        id:4,
        productName:"Nike Air Max 270",
        price:20000,
        category:"Footwear"
    },
    {
        id:5,
        productName:"Adidas Ultraboost 21",
        price:25000,
        category:"Footwear"
    },
    {
        id:6,
        productName:"stone Washed jean",
        price:40000,
        category:"fashion"
    },
   
]
const PORT = 3001;
const app = express();
const router = Router()
app.use(express.json())
app.use(router)
router.get("/",(req,res) => {
    res.send("welcome to my first express backend")
})

router.get("/users", (req, res) => {
  res.json(users);
});


router.get("/users/:id",(req,res) => {
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

router.post("/createUser",(req,res) =>{
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


router.get("/users",(req,res) => {
    res.json({message: "Here are the users", data:users})
})

router.get("/products",(req,res) => {
    res.json({message: "Here are all the products", data:products})
})

router.get("/products/:id",(req,res) => {
    const product = products.find(product => product.id === Number(req.params.id))
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            status: 404
        });
    }
    res.json({message: "Here is the product", data: product})
})

router.post("/createProduct",(req,res) => {
    try{
        const newProduct = {
        id: products.length + 1,
        productName: req.body.productName,
        price: Number(req.body.price),
        category: req.body.category
    }
    products.push(newProduct)
    console.log(products);
    
    res.status(201).json({
        message:"product created successfully",
        data:newProduct,
        status:201
    })
    }catch(err){
        return res.status(400).json({
            message:"erorr creating product",
            status:400
        })
    }

})

router.put("/updateProduct/:id",(req,res) => {
    const product = products.find(product => product.id === Number(req.params.id))
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            status: 404
        });
    }
    // Update the product with the new values
    Object.assign(product, req.body);
    res.json({message: "Product updated successfully", data: product});
})

router.delete("/deleteProduct/:id",(req,res) => {
    const product = products.find(product => product.id === Number(req.params.id))
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            status: 404
        });
    }
    // Remove the product from the array
    products.splice(products.indexOf(product), 1);
    res.json({message: "Product deleted successfully", data: product});
})

app.listen(PORT, () => {
    console.clear()
    console.log(`Server is running on http://localhost:${PORT}`);
});

