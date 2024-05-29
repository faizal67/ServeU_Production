const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { fullname, email, password } = request.body;
  console.log(request.body);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Check if user with provided email already exists
  const findUser = await User.findOne({ email });
  if (findUser) {
    return response.status(409).json({
      error: 'User email already exists'
    });
  }

  // Create a new user if not already exists
  const user = new User({
    email,
    passwordHash,
    displayName: fullname,
    type: 'user'
  });

  try {
    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (error) {
    return response.status(500).json({
      error: 'Failed to save user'
    });
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.put('/:id', async (request, response) => {
  try {
    const userId = request.params.id;
    const userData = request.body;
    // Update the user with the provided ID
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

    // Check if the user exists
    if (!updatedUser) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Respond with the updated user
    response.json(updatedUser);
  } catch (error) {
    // Handle server errors
    response.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = usersRouter

