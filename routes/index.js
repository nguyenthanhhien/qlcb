var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var FindFlight;
// Get Homepage


//mongoose.connect('mongodb://localhost/QLCB');
mongoose.connect('mongodb://qlcb:qlcb@ds111188.mlab.com:11188/quanlychuyenbay');
var db = mongoose.connection;

var UserDataSchema = new mongoose.Schema({
    Khuvucdi : {type: String, required: true},
    Noidi : {type: String, required: true},
    Manoidi : {type: String, required: true},
    Noiden: {type: String, required: true},
    Manoiden : {type: String, required: true},
    Khuvucden : {type: String, required: true},
    MaCB : {type: String, required: true},
    Ngay : {type: Number, default : Date.now},
    Tenhang : {type: String, required: true},
    Mucgia : {type: String, required: true},
    Soluongghe : {type: String, required: true},
    Giaban: {type: String, required: true},
}, {collection: 'CHUYENBAY'});

var UserData = mongoose.model('UserData', UserDataSchema);

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = new Date(Date.UTC(year,month,date));

  return time.getTime() / 1000;
}


router.get('/', function(req, res){
	res.render('find');
});

router.get('/person', function(req, res){
	res.render('person');
});

router.get('/payment', function(req, res){
	res.render('payment');
});

router.get('/flightlist', function(req, res){
	res.render('flightlist');
});
router.get('/findflight', function(req, res){
    console.log(FindFlight.Ngaydi);
    console.log(FindFlight.Loaive);
    UserData.find({Noidi:FindFlight.Noidi.Noidi ,Noiden : FindFlight.Noiden.Noiden, Tenhang : FindFlight.Loaive}).then(function(docs){
        var response = [], j = 0;
        console.log(docs);
        
        for (var i = 0; i < docs.length; i++)
            {
                var time = timeConverter(docs[i].Ngay);
                if (FindFlight.Ngaydi == time)
                    {
                        response[j] = docs[i];
                        j++;
                    }
            }
        console.log(response);
       res.json(response); 
    });
});

router.post('/flightlist', function(req,res){
    console.log(req.body);
    FindFlight = req.body;
    
});

router.get('/noiden/:Manoidi', function(req,res){
    var manoidi = req.params.Manoidi;
    console.log(manoidi);
    UserData.aggregate([
        {$match: 
            {Manoidi : manoidi}
        },
        {
            $group : {
                _id : {
                    Noiden : '$Noiden',
                    Manoiden : '$Manoiden',
                    Khuvucden : '$Khuvucden'
                }
            }
        }
    ],function (err, result){
      res.json(result); });
});

router.get('/noidi', function(req,res){
  UserData.aggregate([
      {
          $group: {
              _id : {
                  Noidi : '$Noidi',
                  Manoidi: '$Manoidi',
                  Khuvucdi : '$Khuvucdi'
                  }
          }
      }
  ], function (err, result){
      res.json(result); 
  });
});

module.exports = router;