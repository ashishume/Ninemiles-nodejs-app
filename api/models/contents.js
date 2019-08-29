const mongoose=require('mongoose');

const contentsSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    paragraphTitle:{type:String, required:true},
    paragraphHeading:{type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    author:{type:String,required:true},
    section:{type:String,required:true},
    testNumber:{type:Number,required:true},
    paragraphUserType:{type:String,required:true},
    status:{type:Number,default:1}
});

module.exports=mongoose.model('content',contentsSchema);


