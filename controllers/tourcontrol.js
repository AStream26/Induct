const fs = require('fs');
const Tour = require('./../models/tourmodel.js');

exports.invalid = (req, res) => {
  res.redirect('/panel');
};

exports.home = (req, res, next) => {
  res.render('home.ejs');
};
exports.gettour = (pa) => {
  return async (req, res, next) => {
    try {
      // console.log(pa);
      // const id = +req.params.id;
      // console.log(id, pa);

      const tour = await Tour.findOne({
        Sno: id,
        panel: pa,
      });
      //console.log(tour);

      console.log(tour);
      if (tour) {
        console.log(id);
        res.render('data.ejs', { tour: tour });
      } else {
        res.redirect(`/panel/${pa}/1`);
      }
    } catch (err) {
      //  console.log(`/panel/${pa}/${id}`);
      res.redirect(`/panel/${pa}/${+req.params.id}`);
    }
  };
};
