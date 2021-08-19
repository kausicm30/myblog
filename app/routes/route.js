let express = require('express');
let router = express.Router();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
let blog = require('../models/blogDetails'); 

router.get('/', function(req, res){
    res.send("Hii welcome to our Blog");
});

router.post('/postItems', async (req, res) => {
    const {name,mail,blogimg,photo,type,like,dlike,title,des}=req.body;
    const obj = {
       name:name,
       email:mail,
       blogImg:blogimg,
       photo:photo,
       type:type,
       like:like,
       dislike:dlike,
       title:title,
       description:des,
       privateUsers:[]
    }
    console.log(obj);
    try {
        const newBlog = await blog.create(obj);
        res.status(200).json(newBlog);
    }catch (err) {
        res.status(500).json({"status":"False","Message":err});
    }
});
router.get('/getItems', async (req, res) => {
    try {
        const blogdetails = await blog.find({});
        res.send(blogdetails);
      }catch (err) {
        res.status(500).json({"status":"False","Message":err});
    }
});
router.get('/getMyitems', async (req, res) => {
    console.log(req.query.mail)
    //reply.send(request.body);
     try {
         const blogdetails = await blog.find({email:req.query.mail});
         res.send(blogdetails);
       }catch (err) {
        res.status(500).json({"status":"False","Message":err});
    }
});
router.get('/getSingleItems', async (req, res) => {
  const id = req.query.id;
   try {
       const blogdetails = await blog.findOne({_id:id});
       // console.log(blogdetails)
       res.send(blogdetails);
     }catch (err) {
      res.status(500).json({"status":"False","Message":err});
  }
});
router.post('/updateItems', async (req, res) => {
  console.log(req.body);
    const {name,email,blogImg,photo,type,like,dislike,title,description}=req.body
    try {
        const obj = {
            name:name,email:email,blogImg:blogImg,photo:photo,type:type,like:like,dislike:dislike,title:title,description:description
         }
        const blogdetails = await blog.findByIdAndUpdate(req.body._id, { $set: obj}, {new:true})
        res.status(200).json(blogdetails);
      }catch (err) {
        res.status(500).json({"status":"False","Message":err});
    }
});
router.delete('/deleteItems', async (req, res) => {
    try {
        const blogdetails = await blog.findByIdAndRemove(req.query.id, {new:true,useFindAndModify:false})
        res.send(blogdetails);
      }catch (err) {
        res.status(500).json({"status":"False","Message":err});
    }
});

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testingusers0830@gmail.com',
      pass: 'test@0830'
    }
});
var otp = "";

function generateOTP(){
    otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    return otp;
}
router.get("/sendmail",function(req,res){
    console.log("emailpart" , req.query.mail);
    let currOTP = generateOTP();
    let mailOptions = {
      to: req.query.mail,
      subject: "OTP for Your requested Blog",
      html: `<h1>Your OTP for BLOGGING is</h1><p>`+currOTP+`</p>`
    };
    transporter.sendMail(mailOptions, function(err,data){
      if(err){
        res.send({success:false});
      }
      else{
        console.log("success");
        res.send({success:true});
      }
    });
});
router.post('/verify',async function(req,res){
    console.log(otp,req.body.otp);
    console.log(req.body);
    if(otp===req.body.otp){
        try {
            const blogdetails = await blog.findById(req.body.blogid);
            let userarray = blogdetails.privateUsers;
            userarray.push(req.body.user);
            try{
                await blog.findByIdAndUpdate(req.body.blogid, { $set: {"privateUsers":userarray}}, {new:true})
            }catch(e){
                res.send({success:false});
            }
          }catch (e) {
            res.send({success:false});
        }
        res.send({success:true});
    }
    else{
      res.send({success:false});
    }
});

module.exports= router;