const maidsRouter = require('express').Router()
const Maid = require('../models/maid')



maidsRouter.post('/', async (request, response) => {
  const {name, gender, verified, rating, mobile, whatsApp, city, address, experience, language, expectedSalary, available, availableAs, expertiseIn, salary, age, about, education, withUsSince, previousExperience,reviews,} = request.body
  if (name === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const maid = new Maid({
    name,
    gender,
    verified,
    rating,
    mobile,
    whatsApp,
    city,
    address,
    experience,
    language,
    expectedSalary,
    available,
    availableAs,
    expertiseIn,
    salary,
    age,
    about,
    education,
    withUsSince,
    previousExperience,
    reviews
  })
  const savedMaid = await maid.save()
  response.json(savedMaid)
})

maidsRouter.get('/', async (request, response) => {
  const maids = await Maid.find({})
  response.json(maids)
})

maidsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const maid = await Maid.findById(id)
  if (maid) {
    response.json(maid)
  }
  else {
    response.status(404).end()
  }
})

maidsRouter.delete('/:id', (request, response) => {
  Maid.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
})


maidsRouter.put('/:id', (request, response) => {
  const body = request.body
  const maid = body
  Maid.findByIdAndUpdate(request.params.id, maid, { new: true })
    .then(updatedMaid => {
      response.json(updatedMaid)
    })
    .catch(error => next(error))
})


module.exports = maidsRouter