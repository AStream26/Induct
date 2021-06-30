const tourcontrol = require('../controllers/tourcontrol.js');
const express = require('express');
const app = express();
const tourrouter = express.Router();

tourrouter.route('/').get(tourcontrol.home);
tourrouter.route('/p1/:id').get(tourcontrol.gettour('p1'));
tourrouter.route('/p2/:id').get(tourcontrol.gettour('p2'));
tourrouter.route('/p3/:id').get(tourcontrol.gettour('p3'));
tourrouter.route('/p4/:id').get(tourcontrol.gettour('p4'));

//tourrouter.route('/:id').get(tourcontrol.gettour);

module.exports = tourrouter;
