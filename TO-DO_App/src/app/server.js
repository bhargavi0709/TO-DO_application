const mysql = require('mysql');
var sessions = require('express-session');
const cors = require('cors'); // cross origin resource sharing
// express
const express = require('express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');//middleware
const { request } = require('http');
const { createSourceMapSource } = require('typescript');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) // parse application/json
const con = mysql.createConnection({ // connection created
    host: "localhost",
    user: "root",
    password: "root",
    database: "angular01",
    port: "3306"
});

let session;
con.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Connected Successfully");
    }
});
/**
 *  to implement sessions
 */
app.use(sessions({
    key: "user_sid",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie:
    {
        maxAge: 600000
    },
    resave: false
}));


/**
 *  to register new user
 */
app.post('/register', (req, res) => { // /=> absolute path
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    let fetch = `select * from details where email="${email}"`;
    con.query(fetch, function (err, ans) {
        if (err)
            console.log(err);
        else {
            if (ans.length === 0) {
                console.log(email, password);
                con.query(`insert into details values("${email}", "${password}")`, (err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {

                        console.log("credentials inserted");
                        res.send({ route: "register", message: "Done" });
                    }
                })

            }
            else {
                console.log("User Already present");
                res.send({ route: 'register', message: "User Already present" });
            }
        }
    })


});

/**
 *  to login user on entering credentials
 */
app.post('/login', (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    let returnuser = `select * from details where email="${email}" && password="${password}"`;
    con.query(returnuser, (err, result) => {

        if (err) {
            console.log(err);
        }

        else {
            if (result.length > 0) {

                session = req.session;
                console.log(session);
                session.email = req.body.email;
                console.log(req.session);
                res.send({ message: "Success!", "sessionId": session.id, "email": email });

            }
            else {
                res.send({ message: "Invalid User" });
            }
        }

    })
})
/**
 *  to save task name and display corresponding fields
 */
app.post('/task', (req, res) => {
    console.log(req.body);
    taskname = req.body.taskname;
    id = req.body.id;
    email = req.body.email;

    let addquery = `insert into testentry(taskname,email,id) values("${taskname}","${email}","${id}")`;
    con.query(addquery, (err, result) => {
        if (err) {
            console.log("data upload failed!", err);
        }
        else {
            console.log("data sent to database!");
            res.send("data sent to database");
        }
    })

})
/**
 *  home route
 */
app.post('/', (req, res) => {

    let email = req.body.email;
    console.log(req.body);
    let fetchUserdataQuery = `select * from testentry where email="${email}"`;

    con.query(fetchUserdataQuery, (err, result) => {
        if (err)
            console.log(err);
        else {
            console.log("data sent to frontend");
            res.send(result);
        }
    })

})
/**
 *  to edit taskname on user's wish
 */

app.post('/edit', (req, res) => {

    let editeddata = req.body.editedtaskname;
    console.log(editeddata);
    let id2 = req.body.id
    console.log(id2);

    let saveUserdataQuery = `update testentry set taskname="${editeddata}" where id="${id2}" `
    con.query(saveUserdataQuery, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.send(result);
            console.log("data edited");
        }
    })

/**
 *  to delete a task record
 */

})
app.post('/delete', (req, res) => {
    id = req.body.newid;
    console.log(req.body);
    // console.log(id);
    let deleteuserdataquery = `delete  from testentry where id="${id}"`;
    con.query(deleteuserdataquery, (err, result) => {
        if (err)
            console.log(err);
        else {
            // res.send("data deleted");
            console.log(result);
            console.log("data del")
        }

    })
})
/**
 *  to set current status of task
 */
app.post('/success', (req, res) => {
    newid = req.body.completedTask;
    console.log(req.body);
    console.log(newid);
    let changestatusdataquery = `update testentry set is_active="completed" where id="${newid}"`;
    con.query(changestatusdataquery, (err, result) => {
        if (err)
            console.log(err);
        else {
            console.log('task completed', result);
        }
    })
})




app.listen(3000);





