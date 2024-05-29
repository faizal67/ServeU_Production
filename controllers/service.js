const serviceRouter = require('express').Router()
const Service = require('../models/service')
const Provider = require('../models/provider')
const ServiceUser = require('../models/serviceUser')



// serviceRouter.get('/', (request, response) => {
//   Blog.find({}).then(services => {
//     response.json(services)
//   })
// })

// serviceRouter.get('/:id', (request, response, next) => {
//   ServiceList.findById(request.params.id)
//     .then(service => {
//       if (service) {
//         response.json(service)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

serviceRouter.post('/', async (request, response) => {
  const providerId = request.body.providerId
  const serviceUserId = request.body.serviceUserId
  const body = request.body
  const provider = await Provider.findById(providerId)
  const serviceUser = await ServiceUser.findById(serviceUserId)

  console.log(provider._id)
  const service = new Service({
    providerId: provider._id,
    serviceUserId: serviceUser._id,
    status: 'pending',
    from: serviceUser.displayName,
    to: provider.displayName,
    time: body.time,
    serviceCategory: provider.category,
    serviceName: body.serviceName,
    price: body.price,
    rating: 0,
    review: '',
    location: body.location,
    timestamp: new Date()
  })

  const savedService = await service.save()
  provider.requests = provider.requests.concat(savedService.id)
  await provider.save()
  serviceUser.applied = serviceUser.applied.concat(savedService.id)
  await serviceUser.save()
  response.json(savedService)
})

// serviceRouter.delete('/:id', (request, response, next) => {

//   ServiceList.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

serviceRouter.put('/:id', async (request, response, next) => {
  const serviceId = request.params.id
  try {
    const updatedService = request.body;
    const providerId = request.body.providerId;
    const serviceUserId = request.body.serviceUserId;
    const serviceUser = await ServiceUser.findById(serviceUserId)
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return response.status(404).send({ error: 'Provider not found' });
    }
    if(!serviceUser){
      return response.status(404).send({ error: 'ServiceUser not found' });     
    }

    const updatedServiceDocument = await Service.findByIdAndUpdate(request.params.id, updatedService, { new: true, runValidators: true });

    if (updatedServiceDocument) {
      if (updatedServiceDocument.status === 'reject') {
        provider.history = provider.history.concat(updatedServiceDocument.id);
        await provider.save();
      }
      else if (updatedServiceDocument.status === 'accepted-payment-complete') {
        provider.requests = provider.requests.filter(req => req.id.toString() !== serviceId);
        provider.current = provider.current.concat(updatedServiceDocument.id)
        await provider.save();


        serviceUser.applied = serviceUser.applied.filter(app => app.id.toString() !== serviceId)
        serviceUser.current = serviceUser.current.concat(updatedServiceDocument.id)
        await serviceUser.save();
      }
      else if(updatedServiceDocument.status === 'completed'){
        provider.history = provider.history.concat(updatedServiceDocument.id)
        await provider.save();
        serviceUser.history = serviceUser.history.concat(updatedServiceDocument.id)
        await serviceUser.save();
      }
      response.status(200).json(updatedServiceDocument);
    } else {
      response.status(404).send({ error: 'Service not found' });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = serviceRouter