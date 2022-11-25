// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const isMatch = require('date-fns/isMatch');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
  res.json({
    'unix': new Date().getTime(),
    'utc': new Date().toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  try {
    if (req.params.date.includes('-')) {
      if (!isMatch(req.params.date, 'yyyy-MM-dd')) {
        return res.json({
          "error": "invalid Date"
        });
      } else {
        return res.json({
          'unix': new Date(req.params.date).getTime(),
          'utc': new Date(req.params.date).toUTCString()
        });
      }
    } else if (Number(req.params.date)) {
      res.json({
        'unix': Number(req.params.date),
        'utc': new Date(Number(req.params.date)).toUTCString()
      })
    } else {
      return res.json({
        'unix': new Date(req.params.date).getTime(),
        'utc': new Date(req.params.date).toUTCString()
      })
    }
  } catch (err) {
    res.status(500).json({
      'error': err.message
    });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
