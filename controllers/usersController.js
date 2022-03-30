const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {User} = require('../database/models');
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');

const usersJSONpath = path.resolve(__dirname, '../data/users.json');

const users = JSON.parse(fs.readFileSync(usersJSONpath, 'utf-8'));

const controller ={
 register: async (req, res) => {
    // let userToRegister = await User.findOne({where: {email: req.body?.email}})
    return res.render('./users/register.ejs') 
    // {userToRegister: userToRegister})
},
login: (req, res) => {
   return res.render('./users/login.ejs')
},
processLogin: async (req, res) => {
  const loginError = 'The credentials provided are invalid'
    let userToLogin = await User.findOne({where: {email: req.body.email}});
    if(userToLogin == null){
      return res.render('./users/login', {loginError: loginError })
    };

    var resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        return res.render("./users/login.ejs", {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    };
   if (userToLogin) {
      const passwordIsCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);
          if (passwordIsCorrect) {
            //   const userToLog = {...userToLogin}
            //  delete userToLog.password;
         
              req.session.userLogged = userToLogin; 
            
        if (req.body.rememberUser){
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60)*60})
        }

        return res.redirect("/user/profile")
   } else {
    return res.render('./users/login', {loginError: loginError })
}}},
createUser: async (req,res)=> {
try{

var resultValidation = validationResult(req);
if (resultValidation.errors.length > 0) {
    return res.render("./users/register.ejs", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });
}
let userAlreadyRegistered = await User.findOne({where: {email: req.body?.email}})
    if (userAlreadyRegistered) {
      return res.render("./users/register.ejs", {
          userAlreadyRegistered,
          oldData: req.body
      });
    }
  let passEncriptada = bcryptjs.hashSync(req.body.password, 10);
      User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatar: req.file.filename,
          email: req.body.email,
          password: passEncriptada
        //   admin: req.body.admin
      });      
    //   fs.writeFileSync(usersJSONpath, JSON.stringify(users, null, ' '));

  return res.redirect('/user/profile')
    } catch (error){
        console.log(error)
    }
},

editUser: async (req, res) => {
  // let userLogged = req.session.userLogged;
  try {
  // let user = await User.findOne({where: {email: {[Op.like]: userLogged.email}}})
  let user = await User.findByPk(req.params.id)

    res.render('./users/editUser.ejs', {
        user: user,
        // oldData: {...userLogged}
   })
  } catch (error){
    console.log(error)
  }
  },
updateUser: async (req, res) => {

  try{
    let userToUpdate = await User.findByPk(req.params.id);
    if (req.file){
      userToUpdate.avatar = req.file.filename
      }
  userToUpdate.firstName = req.body.firstName ? req.body.firstName : userToUpdate.firstName;
  userToUpdate.lastName = req.body.lastName ? req.body.lastName : userToUpdate.lastName;
  // userToUpdate.password = req.body.oldPassword ? req.body.lastName : userToUpdate.lastName;


  userToUpdate.save();
  return res.redirect('/user/profile')
  } catch(error){
    console.log(error)
  }
},
        
profile: (req, res) => {
  console.log(req.session.userLogged)
    res.render('./users/profile.ejs', {
        userLogged: req.session.userLogged
    })
},
logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
}
}

module.exports = controller;
