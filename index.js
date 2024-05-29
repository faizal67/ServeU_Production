const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
  app.use(unknownEndpoint)

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`)
// })

