'use strict';

exports.getSimpleData = function (req, res) {
    if (typeof(req.query.value) === 'undefined') {
        res.send('GET parameter was not passed.')
        return;
    }
    res.send('GET request with parameter: ' + req.query.value);
};


