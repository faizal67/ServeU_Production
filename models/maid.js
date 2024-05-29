const mongoose = require('mongoose')


const salarySchema = new mongoose.Schema({
  liveIn: [Number],
  fullDay: [Number],
  partTime: [Number]
})

const previousExperienceSchema = new mongoose.Schema({
  city: String,
  salary: Number,
  duration : [Number]
})

const reviewSchema = new mongoose.Schema({
  userName: String,
  text: String,
  rating: Number
})

const maidSchema = new mongoose.Schema({
    name: String,
    gender: String,
    verified: Boolean,
    rating: Number,
    mobile: String,
    whatsApp: String,
    city: String,
    address: String,
    experience: Number,
    language: [String],
    expectedSalary: [Number],
    available: String,
    availableAs: [String],
    expertiseIn: [String],
    salary: salarySchema,
    age: Number,
    about: String,
    education: Number,
    withUsSince: String,
    previousExperience: [previousExperienceSchema],
    reviews: [reviewSchema]
})

maidSchema.set('toJSON',{
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Maid', maidSchema)




 
