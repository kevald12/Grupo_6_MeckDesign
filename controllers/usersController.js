

const controller ={
 register:  (req, res) => {
    return res.render('./users/register.ejs')
},
login: (req, res) => {
   return res.render('./users/login.ejs')
}
}

module.exports = controller;
