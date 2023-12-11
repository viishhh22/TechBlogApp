const express=require("express");
const bodyParser=require("body-parser")
const blogPostsArray=require("./data");
const mongoose =require("mongoose");
const app = express();
require("dotenv").config();

app.set('view engine', 'ejs');

//if css file does not work then create one folder and 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const mongodbURL=process.env.MONGO_URL
mongoose.connect(mongodbURL)
.then(()=>{
    console.log("DB connected successfully");
})
.catch((err)=>{
    console.log("Error occured at DB connection",err);
});

const blogSchema=new mongoose.Schema({
    title:String,
    imageURL:String,
    description:String
});

const Blog = new mongoose.model("blog", blogSchema);

app.get("/",(req,res)=>{
    // res.render("signup");
        Blog.find({})
        .then((arr)=>{
            res.render("index",{blogPostArray:arr});
        })
        .catch((err)=>{
            console.log("cannot find blogs");
            res.render("404")
        });
        //  res.render("index",{

        //    blogPostArray
    });



app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/compose",(req,res)=>{
    res.render("compose")
})
app.post("/compose",(req,res)=>{

    //const newID=blogPostsArray.length+1

    const image=req.body.imageURL
    const title=req.body.title
    const description=req.body.description

    const newBlog= new Blog({
        imageURL:image,
        title:title,
        description:description,
    })

    newBlog.save()
    .then(()=>{
        console.log("Blog Posted Successfully");
    })
    .catch((err)=>{
        console.log("Error posting to new blog",err);
    });

    // const obj={
    //     _id:newID,
    //     imageURL:image,
    //     title:title,
    //     description:description,
    // }
   // blogPostsArray.push(obj);
    res.redirect("/")
})
app.get("/post/:id",(req,res)=>{
    console.log(req.params.id)

    const id=req.params.id;
    let title ="";
    let imageURL="";
    let description="";

    blogPostsArray.forEach(post =>{
        if(post._id==id){
            title=post.title;
            imageURL=post.imageURL;
            description=post.description;
        }

    }

    );
    const post={
        title:title,
        imageURL:imageURL,
        description:description
    }
    res.render("post",{post:post})
})
app.get('/post/delete/:id', (req, res) => {

    // TODO: Task 2 to implement the delete operation with mongodb
  
    // const idToDelete = req.params.id;
  
    // Your Logic Here...
    // Search mongoDB method to find and delete document using ID
  })
  
  
  // TODO: Task 3 to implement login and sign up.
  
  // signup routes
  app.get("/signup", (req, res) => {
    // render signup page
  });
  
  app.post("/signup", (req, res) => {
    // Hint:
    // const newUser = new User({
    //   email: type here something...,
    //   password: type here something...,
    // });
  
    // newUser.save()
    //   .then(() => {
    //     console.log("New User Created");
    //   })
    //   .catch((err) => {
    //     console.log("Error Creating New User");
    //   });
  
  
    // redirect to login page
  });
  
  // login routes
  app.get("/login", (req, res) => {
    // Hint
    // render login page
  });
  
  app.post("/login", (req, res) => {
    // Hint
    // const reqEmail = something...
    // const reqPassword = something...
    //
    // User.findOne({ email: reqEmail })
    //   .then((user) => {
    //     if (user.password == reqPassword) {
    //       // Guess it!
    //     } else {
    //       // Guess it!
    //     }
    //   })
    //   .catch((err) => {
    //       console.log("User Not Found");
    //       redirect to login page
    //   });
  });
  

// app.get("/about",(req,res)=>{
//     res.sendFile(__dirname + "/about.html");
// })

// app.get("/compose",(req,res)=>{
//     res.sendFile(__dirname + "/compose.html");
// })

// app.get("/post",(req,res)=>{
//     res.sendFile(__dirname + "/post.html");
// })

const port  = 3000 || process.env.PORT;
app.listen(port,()=>{
    console.log("Server is listening on port 3000");
})
