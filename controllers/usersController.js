const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const usersJSONpath = path.resolve(__dirname, '../data/users.json');

const users = JSON.parse(fs.readFileSync(usersJSONpath, 'utf-8'));

const controller ={
 register:  (req, res) => {
    return res.render('./users/register.ejs')
},
login: (req, res) => {
   return res.render('./users/login.ejs')
},
processLogin: (req, res) => {

   let userToLogin = users.find(oneuser => oneuser.email == req.body.email);
   // console.log('usuario encontrado' + userToLogin)
   if (userToLogin) {
      const passwordIsCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);
          if (passwordIsCorrect) {
            //  delete userToLogin.password;
              req.session.userLogged = userToLogin; 
      if (req.body.rememberUser){
        res.cookie('userEmail', req.body.email, {maxAge: 1000 * 60})
    }

   
   }
   return res.render("./users/profile.ejs", {
       userLogged: req.session.userLogged
   })
   }
},
createUser: (req,res)=> {
   var generateID = () => {
      return 1;
  }
  if (users.length >= 1) {
      generateID = () => {
          var lastUser = users[users.length - 1];

          var lastId = lastUser.id;

          return lastId + 1;

      }
  } else {
      generateID = () => {
          return 1
      }
  };
    var resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        return res.render("./users/register.ejs", {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }
  let passEncriptada = bcryptjs.hashSync(req.body.password, 10);
      users.push({
          id: generateID (),
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          userAvatar: req.file.filename,
          email: req.body.email,
          password: passEncriptada
      });
      
      fs.writeFileSync(usersJSONpath, JSON.stringify(users, null, ' '));

  return res.send('Este es el profile de usuario')
},
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
