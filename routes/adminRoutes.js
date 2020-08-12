const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require("../config/customFunctions");
 

router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'admin';

    next(); 
});

router.route('/')
 .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);

router.route('/posts/approve')
    .get(adminController.approve)
    .post(adminController.approvePosts); 

router.route('/posts/userPosts')
    .get(adminController.getUserPosts);


router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);

router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .put(adminController.editPostSubmit);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);    


// ADMIN CATEGORY ROUTES
router.route('/category')
    .get(adminController.getCategories)
    .post(adminController.createCategories); 

router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

router.route('/shipping/ship')
    .get(adminController.shipGet);    


router.route('/payment/pay')    
    .get(adminController.payGet);


    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }


 module.exports = router;