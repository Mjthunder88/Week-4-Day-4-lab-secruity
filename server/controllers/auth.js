const users = [
  {
    username: 'Marcus',
    email: '1',
    firstName: '2',
    lastName: '3',
    password: '$2b$10$IelaOWScjCDfT3542eOy.O4AsVaocR3DsM9zIf.OFezMO/.y7Aisq'
  }
]
const bcrypt = require('bcrypt')


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      let userData
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          userData = users[i]
        }
      }
      bcrypt.compare(password, userData.password, (error, success) => {
        if (success) {
          res.status(200).send({sucess: true, username: userData.username, email: userData.email, lastName: userData.lastName, firstName: userData.firstName})
        } else if (error) {
          
          res.status(400).send("User not found.")
        }
      } )
    },
    register: (req, res) => {
        console.log('Registering User')
        // console.log(req.body)
        users.push(req.body)
        let userPass = req.body.password
        let saltRounds = 10
        // console.log(userPass)
      bcrypt.hash(userPass, saltRounds, (err, hashpass) => {
        let updateDataBase = {}
        updateDataBase = req.body
        updateDataBase.password = hashpass
        users.push(updateDataBase)
        console.log(users)
      })

        res.status(200).send(req.body)
    }
}

// console.log(users)