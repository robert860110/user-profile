var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Get User Profile API Root');
});

// GET /todos?completed=false&q=work
app.get('/users', function(req, res) {
    var query = req.query;
    var where = {};

    // if (query.hasOwnProperty('completed') && query.completed === 'true') {
    //  where.completed = true;
    // } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
    //  where.completed = false;
    // }

    // if (query.hasOwnProperty('q') && query.q.length > 0) {
    //  where.description = {
    //      $like: '%' + query.q + '%'
    //  };
    // }

    db.user.findAll().then(function(users) {
        res.json(users);
    }, function(e) {
        res.status(500).send();
    });
});

// GET /todos/:id
app.get('/users/:id', function(req, res) {
    var userId = parseInt(req.params.id, 10);

    db.user.findById(userId).then(function(user) {
        if (!!user) {
            res.json(user.toJSON());
        } else {
            res.status(404).send();
        }
    }, function(e) {
        res.status(500).send();
    });
});

// POST /todos
app.post('/users', function(req, res) {
    var body = _.pick(req.body, 'firstName', 'lastName', 'mdn', 'birthDay', 'gender', 'email', 'street', 'houseNum', 'city', 'state', 'country', 'zip');
    console.log(body);

    db.user.create(body).then(function(user) {
        res.json(user.toJSON());
    }, function(e) {
        res.status(400).json(e);
    });
});

// DELETE /todos/:id
app.delete('/users/:id', function(req, res) {
    var userId = parseInt(req.params.id, 10);
    var matchedUser = _.findWhere(todos, {
        id: todoId
    });

    if (!matchedTodo) {
        res.status(404).json({
            "error": "no todo found with that id"
        });
    } else {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {
        id: todoId
    });
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});


// db.sequelize.authenticate().complete(function(err) {
//     if (err) {
//         console.log('There is connection in ERROR');
//     } else {
//         console.log('Connection has been established successfully');
//     }
// });

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
