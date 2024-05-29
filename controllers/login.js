const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')



loginRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return response.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response.status(200).json({ token, email: user.email, type: user.type, displayName:user.displayName, id: user._id});
  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({
      error: 'Internal server error'
    });
  }
});



module.exports = loginRouter