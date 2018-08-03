var express             =   require('express');
var router              =   express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { options: req.options });
});

router.get('/home', function(req, res, next){
  res.render('home', {title: 'Home'});
})

router.post('/weather', function(req, res, next){
  res.json({
      response: 200
  })
})

module.exports = router;
