const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash")

const App = express();
App.use(bodyParser.urlencoded({extended:true}));
App.use(express.static("public"));
App.set("view engine","ejs");

const posts = [
    {
        title: "post 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat id minus quos, ullam veniam praesentium consectetur dolore quae illum quas architecto voluptatum rerum omnis quisquam obcaecati iure quam animi eos ducimus eveniet voluptate libero error! Quos odio impedit sint molestias? Consequuntur ab et consequatur, cumque maiores eveniet quam mollitia repellendus dolor,"
    }
];
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

App.get("/home/:post",(req,res) =>{
    posts.forEach(post =>{
        var url = lodash.lowerCase(req.params.post)
        var post_title = lodash.lowerCase(post.title)
        if(post_title === url){
            res.render("full_view_post",{
                title:post.title,
                desc:post.description
            })
        }else{
            res.render("home");
        }
    })
})


const port = 2100;
App.listen(2100,()=> console.log(`server has been started on port: ${port}`))