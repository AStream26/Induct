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
    othercell:String,
    panel:String,
    Q1 :String,
    Q2 :String,
    Q3 :String,
    Q4 :String









});


const data = mongoose.model('Data',Data);
module.exports = data;












