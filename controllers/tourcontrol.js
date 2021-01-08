const { AsyncLocalStorage } = require('async_hooks');
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
    res.redirect('/panel');
}

exports.home = (req,res,next)=>{
  res.render("home.ejs");
}
  exports.gettour = (pa)=>{
    return async (req,res,next)=>{

      try{

      //  console.log(pa);
        const id = + req.params.id;
       // console.log(id);
        const tour = await Tour.findOne({Sno:id,panel:pa});
      //  console.log(tour);
        if(tour){
          res.render("data.ejs",{tour:tour});
         
        }
        else{
          res.redirect(`/panel/${pa}/1`);
        }
         
      }catch(err){
      //  console.log(`/panel/${pa}/${id}`);
        res.redirect(`/panel/${pa}/${ + req.params.id}`);

      }




    }
  }