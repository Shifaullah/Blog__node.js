const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const App = express();
App.use(bodyParser.urlencoded({extended:true}));
App.use(express.static("public"));
App.set("view engine","ejs");

const posts = [];
const port = 2100;
const obj_to_send = {
    posts:posts
};

const loadPage = (url,page,obj) =>{
    App.get(url,(req,res)=>{
        res.render(page,obj);
    })
}

loadPage("/","home",obj_to_send);
loadPage("/home","home",obj_to_send);
loadPage("/compose","compose",obj_to_send);
loadPage("/about","about",obj_to_send);
loadPage("/contact","contact",obj_to_send);

App.post("/compose",(req,res) =>{
    const post_title = req.body.post_title;
    const post_desc = req.body.post_desc;
    const new_post = {
        title:post_title,
        description:post_desc
    }
    posts.push(new_post);
    res.redirect("home");
})

App.listen(2100,()=> console.log(`server has been started on port: ${port}`))