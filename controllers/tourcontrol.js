const fs =require('fs');
const Tour = require('./../models/tourmodel.js');

const APIFeatures = require('./../utils/apifeatures.js');

console.log(__dirname);
//Aliasing
exports.aliasing = (req,res,next)=>{

    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,duration,summary,ratingAverage';
    next();
}
// class ApiFeatures{

//     constructor(query,querystring){
//         this.query = query;
//         this.querystring = querystring;
//         console.log("hello from class");
//     }
//     filter(){
         
//         const myquery = {...this.querystring};
  
//         const excludequery = ['sort','page','limit','fields'];
//          excludequery.forEach(el=>delete myquery[el]);
//          let querystring = JSON.stringify(myquery);
//          querystring = querystring.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
//           this.query = Tour.find(JSON.parse(querystring));
//           return this;
//       }
//       sort(){
//         if(this.querystring.sort){
//             //console.log(req.query.sort);
//             const sortby = this.querystring.sort.split(',').join(' ');
//             this.query = this.query.sort(sortby);
//         }else{
//             this.query.sort('-createdAt');
//         }
//         return this;
//       }
//       limitFeild(){
//         if(this.querystring.fields){
//             //console.log(req.query.)
//              const fields = this.querystring.fields.split(',').join(' ');
            
//             this. query =this. query.select(fields);
//              //console.log(query);
//          }else{
//              this.query.select('-__v');
//          }
//          return this;

//       }

//       pagitaion(){
//         const page = + this.querystring.page || 1;
//         const limit = + this.querystring.limit || 100;
//         const skipvalue = (page-1)*limit;
//         this.query = this.query.skip(skipvalue).limit(limit);
        
//       return this;
//       }

// }


exports.getAlltour = async (req,res)=>{
   // console.log(new ApiFeatures());
    try{

    //Executing the query
    const filter = new APIFeatures(Tour.find(),req.query).filter().sort().limitFeild().pagitaion();
    //console.log(filter);
   const tours = await filter.query;
 
   res.status(200).json({
    status:'success',
    data:{
      tours
    }
});

    }catch(err){
        res.status(404).json({
         status:'fail',
         message:err
        });

    }
   
}
exports.gettour =async (req,res)=>{
   try{
     const id = + req.params.id;
    const tour = await Tour.find({SN0:id});
    res.render("data.ejs",{tour:tour[0]});

   // const tour = tours.find(el =>el.id ===id);
//    res.status(200).json({
//        status:'success',
//        data:{
//          tours:tour
//        }
//    });
   }catch(err){
      res.status(404).json({
      status:'Fail',
      message:err
      });
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

    exports. updatetour = async (req,res)=>{
       try{
         const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
             new:true,
             runValidators:true
         });

         res.status(200).json({
            status:'success',
            data:{
              tour
            }
        });

       }catch(err){
           res.status(404).json({
               status:'Fail',
               message:err
           });

       }
}
exports.deletetour = async (req,res)=>{
 
  try{
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status:'success',
        data:{
          tours:null
        }
    });

  }catch(err){
    res.status(404).json({
        status:'Fail',
        message:err
    });
  }
     

}

exports.getstats = async (req,res)=>{
    try{
        const stats = await Tour.aggregate([
         {$match:{ratingsAverage:{$gte:4.5}}
        },
         {
          $group:{
              _id:{$toUpper :'$difficulty'},
              numTour:{$sum:1},
              avgRating:{$avg:'$ratingsAverage'},
              avgPrice:{$avg:'$price'},
              minPrice:{$min:'$price'},
              maxPrice:{$max:'$price'}

                 }   
         },
         {
             $sort :{avgPrice:1}
         }
        //  },
        //  {$match:{_id:{$ne:'EASY'}}}
        ]);
        res.status(200).json({
            status:'success',
            data:{
              stats
            }
        });

    }catch(err){
        res.status(404).json({
            status:'Fail',
            message:err
        });
    }
}

exports.getmonthelyplan = async (req,res)=>{
    try{
        const year = + req.params.year;
       // console.log(year);
        const plan  =await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            
            {
                $match :{ startDates :
                               {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }

                }
            },
            
            
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                  }
            },
            {
                $addFields:{month : '$_id'}
            },
            {
                $project:{_id:0}
            },
            {
                $sort:{numTourStarts:-1}
            },
            {
                $limit:6
            }
        ]);

        res.status(200).json({
            status:'success',
            data:{
              plan
            }
        });


    }catch(err){
        res.status(404).json({
            status:'Fail',
            message:err
        });
    }
}





//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf-8'));

// exports.checkid = (req,res,next,id)=>{
//     if(req.params.id>tours.length){
//        return  res.status(404).json({
//             status:"fail",
//             message:"Data not Found"
//         });
//     }
//     next();
// }
// exports.checkbody  = (req,res,next)=>{
//     if(!req.params.name || !req.params.price){
//         return res.status(400).json({
//             status:"Bad Request",
//             message:"Price or name missing"
//         });
//     }
//     next();
// }