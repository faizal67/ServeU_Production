const serviceListRouter = require('express').Router()
const ServiceList = require('../models/serviceList')
const Provider = require('../models/provider')


serviceListRouter.get('/', (request, response) => {
  Blog.find({}).then(services => {
    response.json(services)
  })
})

serviceListRouter.get('/:id', (request, response, next) => {
  ServiceList.findById(request.params.id)
    .then(service => {
      if (service) {
        response.json(service)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

serviceListRouter.post('/:id',async (request, response) => {
  const body = request.body
  
  const provider = await Provider.findById(request.params.id)
    console.log(provider)
  const serviceList = new ServiceList({
    serviceName: body.serviceName,
    time: body.time,
    price: body.price,
    available: body.available,
  })

  const savedService = await serviceList.save()
  provider.provides = provider.provides.concat(savedService.id)
  await provider.save()

  response.json(savedService)
})

serviceListRouter.delete('/:id', (request, response, next) => {
  
  ServiceList.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

serviceListRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const updatedService = {
    serviceName: body.serviceName,
    time: body.time,
    price: body.price,
    available: body.available,
  }

  ServiceList.findByIdAndUpdate(request.params.id, updatedService, { new: true ,runValidators: true, context: 'query'})
    .then(updatedService => {
      response.json(updatedService)
    })
    .catch(error => next(error))
})

module.exports = serviceListRouter