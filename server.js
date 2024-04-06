var express = require('express');
var bodyParser = require('body-parser');
const helmet = require('helmet');

var pub = __dirname + '/public';
var app = express();
var Recaptcha = require('express-recaptcha').RecaptchaV2;
var recaptcha = new Recaptcha(
  '6Lf7H6wpAAAAABEuX8eEvP0tAdkePiPc3kym3JZ9',
  '6Lf7H6wpAAAAAEFrYQsVsa_IhmdbSDcVQZ6g1l4b',
  { hl: 'fa' }
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'",
          "'http://www.google.com/'",
        ],
      },
      reportOnly: true,
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', recaptcha.middleware.render, function (req, res) {
  res.render('login', { captcha: res.recaptcha });
});

app.get(
  '/fa',
  recaptcha.middleware.renderWith({ hl: 'fa' }),
  function (req, res) {
    res.render('login', { captcha: res.recaptcha });
  }
);

app.listen(3000, () => {
  console.log('server is up and running on port 3000');
});
