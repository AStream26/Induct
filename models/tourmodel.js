const { findSourceMap } = require('module');
const mongoose  = require('mongoose');
const slugify = require('slugify');
const Data = mongoose.Schema({
    Sno:Number,
    Name:String,
    Registration_Number:Number,
    E_mail:String,
    Branch:String,
    CGPA:Number,
    Contact_Number:Number,
    Active_Backlogs:String,
    Describe:String,
    Hobbies:String,
    Strength:String,
    Weakness:String,
    Special_Interest:String,
    Technical_Skills:String,
    Non_Technical_Skills:String,
    Career_Option:String,
    visiontnp:String,
    conttribution:String,
    expectationfromcell:String,
    othercell:String










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












