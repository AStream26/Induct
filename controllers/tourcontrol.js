const fs =require('fs');
const Tour = require('./../models/tourmodel.js');

const APIFeatures = require('./../utils/apifeatures.js');

//console.log(__dirname);
//Aliasing
exports.aliasing = (req,res,next)=>{

    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,duration,summary,ratingAverage';
    next();
}
exports.invalid = (req,res)=>{
    res.redirect('/users/1');
}


exports.gettour =async (req,res)=>{

   try{
     const id = + req.params.id;
    // console.log(id);
    const tour = await Tour.findOne({Sno:id});
   // console.log(tour);
    if(tour)
     {
         
         res.render("data.ejs",{tour:tour});
     }
     else{
        res.redirect('/users/1');
     }
   
   }catch(err){
   res.redirect('/users/1');
}
  }

  exports.newtour = async (req,res)=>{
    //  console.log("adding....");
      try{
          const newtour = await Tour.create(req.body);

          res.status(201).json({
            status:'success',
            data :{
                tour:newtour
            }
        });

      } catch(err){
          res.status(400).json({
             status:'fail',
             message:err
          });
      }
  
    }

 