var express = require('express');
//var mongoose = require('mongoose');
var router = express.Router();
/*
mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;

var UserDataSchema = new mongoose.Schema({
    Khuvuc : {type: String, required: true},
    Noidi : {type: String, required: true},
    Manoidi : {type: String, required: true},
    Danhsachnoiden : [{
        Khuvuc: {type: String, required: true},
        Manoiden : {type: String, required: true},
        Noiden : {type: String, required: true},
        Chuyenbay : [{
            Gio : {type: String, required: true},
            Ngay : {type: Date, required: true},
            Machuyenbay : {type: String, required: true},
            HangC : {
            Giaban: {type: Number, required: true},
            Soluongghe : {type: Number, required: true},
            Mucgia : {type: String, required: true},
            Tenhang : {type: String, required: true}
        },
            HangY : {
            Giaban: {type: Number, required: true},
            Soluongghe : {type: Number, required: true},
            Mucgia : {type: String, required: true},
            Tenhang : {type: String, required: true}
        }    
        }]
    }]
}, {collection: 'CHUYENBAY'});

var UserData = mongoose.model('UserData', UserDataSchema);

router.get('/noiden', function(req,res){
  UserData.find({}, {Noidi:1, Manoidi:1}).then(function(docs){
     res.json(docs); 
  });
});*/
// Get Homepage
router.get('/', function(req, res){
	res.render('find');
});

router.get('/person', function(req, res){
	res.render('person');
});

router.get('/chair', function(req, res){
	res.render('chair');
});

router.get('/chonchuyenbay', function(req, res){
	res.render('chonchuyenbay');
});

module.exports = router;