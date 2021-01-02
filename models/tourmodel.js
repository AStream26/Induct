const { findSourceMap } = require('module');
const mongoose  = require('mongoose');
const slugify = require('slugify');
const Data = mongoose.Schema({
    SN0:Number,
    Name:String,
    RollNumber:Number,
    Course:String,
    EmailID:String,
    Branch:String,
    CGPA:Number,
    perc10:String,
    perc12:String,
    Contact:Number,
    Active_Backlogs:String

});

// tourSchema.virtual('durationweek').get(function(){
//     return this.duration/7;
// });
// //DOCUMENT MIDDLEWARE
// // tourSchema.pre('save',function(){
// //       this.slug = slugify(this.name,{lower:true});
// // });

// // tourSchema.post('save',function(doc,next){
// //      console.log(doc);
// //      next();
// // });
// //QUERY MIIDLEWARE
// tourSchema.pre(/^find/,function(next){
//      this.find({secretTour:{$ne:true}});
//      this.start = Date.now();
//      next();
// });
// tourSchema.post(/^find/,function(docs,next){
//     console.log(Date.now()-this.start);
//     next();
// });

// //AGGREGATE MIDDDLEWARE
// tourSchema.pre('aggregate',function(next){
//     this.pipeline().unshift({$match:{secretTour:{$ne:true}}});
// next();
// });
const data = mongoose.model('Data',Data);
module.exports = data;












