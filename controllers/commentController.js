//import model
const Post=require("../models/postModel");
const Comment=require("../models/commentModel");

//business login
exports.createComment =async (req,res)=>{
    try{
  //fetch data from body
  const {post,user,body}=req.body;
  //create a comment object
  const comment=new Comment({
    post,user,body
  });
  //save the new comment into the database
  const savedComment=await comment.save();

  //Find the comment by id and add the new comment into the comment ARRAY
  const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comment:savedComment._id}},{new:true})
  .populate("comment")
  .exec();
  res.json({
    post:updatedPost,
  });

    }
    catch(error){
    return res.status(500).json({
   error:"Error while creating comment",
    });
    }
}