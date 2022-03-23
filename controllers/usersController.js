const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {User} = require('../database/models');

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
    let userToLogin = await User.findOne({where: {email: req.body.email}});
   
   if (userToLogin) {
      const passwordIsCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);
          if (passwordIsCorrect) {
            //   const userToLog = {...userToLogin}
            //  delete userToLog.password;
         
              req.session.userLogged = userToLogin; 
            
        if (req.body.rememberUser){
            res.cookie('userEmail', req.body.email, {maxAge: 1000 * 60})
        }

        return res.render("./users/profile.ejs", {
            userLogged: req.session.userLogged
        }) }
   } else {
    let loginError = 'The credentials provided are invalid'
    return res.render('./users/login', {loginError: loginError })
} 
},
createUser: async (req,res)=> {
//    var generateID = () => {
//       return 1;
//   }
//   if (users.length >= 1) {
//       generateID = () => {
//           var lastUser = users[users.length - 1];

//           var lastId = lastUser.id;

//           return lastId + 1;

//       }
//   } else {
//       generateID = () => {
//           return 1
//       }
//   };
try{

var resultValidation = validationResult(req);
if (resultValidation.errors.length > 0) {
    return res.render("./users/register.ejs", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });
}
// let userAlreadyRegistered = await User.findOne({where: {email: req.body?.email}})
//     if (userAlreadyRegistered) {
//       return res.render("./users/register.ejs", {
//           userAlreadyRegistered,
//           oldData: req.body
//       });
//     }
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

editUser: (req, res) => {
  let user = User.findOne({wherereq.params.userLogged).then((user) => {
    res.render('./users/editUser.ejs', {
        user: user
   })
  })
},
//editUserResult: (req, res) => {
    
    //db.users.update({
      //  name: req.body.firstName,
       // lastName: req.body.lastName,
     
   // },
      //  {
        //    where: {
          //      id: req.params.id,
                //user: req.session.userLogged
           // }
        //})
        //.then(() => {
          //  res.redirect("/profile");
        //})
        //.catch(err =>
          //  console.log(err)

    
        //)
        //return res.redirect('./users/profile.ejs')
//},
        
profile: (req, res) => {
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
