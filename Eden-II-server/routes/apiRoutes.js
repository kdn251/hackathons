var express = require('express');
var router = express.Router();
var path = require('path');
var jsonwebtoken = require('jsonwebtoken');
var user = require(path.join(__dirname, '..', 'models', 'userModel.js'));
var groupHomeController = require('../controllers/groupHomeController.js');
var userController = require('../controllers/userController.js');
var userModel = require('../models/userModel.js');

router.post('/login', function(req, res){
    user.findOne({username:req.body.username}, function(err, user){
        if(err){
            res.status(err.status || 500);
            return res.render('error', {
                message: err.message,
                error: err
            });
        }
        //Would not distinguish between the 2 on a real implementation
        if(!user)
            return res.json({success:false, message: 'Auth failure. User not found.'});
        if(req.body.password !== user.password)
            return res.json({success:false, message: 'Auth failure. Password incorrect.'});
        var token = jsonwebtoken.sign(user, 'superSekrit!!', {
            expiresIn: 1000000
        });
        res.json({
            success: true,
            message: 'Auth successful',
            token: token
        });
    });
});

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token !== undefined) {
        jsonwebtoken.verify(token, 'superSekrit!!', function (err, decoded) {
            if (err)
                res.json({success: false, message: 'invalid token.'});
            else {
                req.decoded = decoded;
                next();
            }
        })
    }
    else
        //res.json({success: false, message: 'no token.'});
        res.send(req.headers);
});

var userPath =  '/users';

/*
 * GET
 */
//router.get(path.join(userPath, '/'), userController.list);
router.get(path.join(userPath, '/'), function(req, res){
    if(!req.params)
        req.params = {};
    //console.log(token);
    var userId = req.decoded._doc._id;
    var user = userModel.findOne({_id:userId}, function(err, user){
        console.log(user);
    });
    if(user.category = 'admin'){
        //admin can see everyone
        return userController.list;
    }
    else if(user.category = 'parent'){
        return res.json(user.participants);
    } else { //category is caretaker
        return res.json(user.participants);
    }
});

/*
 * GET
 */
router.get(path.join(userPath, '/:id'), userController.show);

/*
 * POST
 */
router.post(path.join(userPath, '/'), userController.create);

/*
 * PUT
 */
router.put(path.join(userPath, '/:id'), userController.update);

/*
 * DELETE
 */
router.delete(path.join(userPath, '/:id'), userController.remove);



var groupHomePath = '/homes';

/*
 * GET
 */
router.get(path.join(groupHomePath, '/'), groupHomeController.list);

/*
 * GET
 */
router.get(path.join(groupHomePath, '/:id'), groupHomeController.show);

/*
 * POST
 */
router.post(path.join(groupHomePath, '/'), groupHomeController.create);

/*
 * PUT
 */
router.put(path.join(groupHomePath, '/:id'), groupHomeController.update);

/*
 * DELETE
 */
router.delete(path.join(groupHomePath, '/:id'), groupHomeController.remove);



module.exports = router;

