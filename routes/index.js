var fs = require('fs');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
    })

    app.get('/listUsers', function (req, res) {
        fs.readFile('data/listUsers.json', {
            encoding: 'utf8'
        }, function (err, data) {
            var dataStr = JSON.stringify(data);
            var dataParse = JSON.parse(dataStr);
            res.setHeader('Content-Type', 'application/json');
            res.send(dataParse);
        });
    })

    app.get('*', function (req, res) {
        res.send('Page not found');
    })
}
