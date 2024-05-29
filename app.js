const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const maidsRouter = require('./controllers/maids')
const providerRouter = require('./controllers/providers')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const userdb = require('./models/user')
require("./db/conn")

const session = require("express-session");
const passport = require("passport");
const serviceUserRouter = require('./controllers/serviceUser')
const serviceListRouter = require('./controllers/serviceList')
const serviceRouter = require('./controllers/service')
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const config = require('./utils/config')

const clientid = config.CLIENTID
const clientsecret = config.CLIENTSECRET


const app = express()                 //created server object 
app.use(express.static('build'))
app.use(cors())       //cros Origin enable
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// setup session
app.use(session({
  secret: clientsecret,
  resave:false,
  saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
      clientID:clientid,
      clientSecret:clientsecret,
      callbackURL:"/auth/google/callback",
      scope:["profile","email"]
  },
  async(accessToken,refreshToken,profile,done)=>{
      try {
          let user = await userdb.findOne({googleId:profile.id});

          if(!user){
              user = new userdb({
                  googleId:profile.id,
                  displayName:profile.displayName,
                  email:profile.emails[0].value,
                  image:profile.photos[0].value,
                  type : 'user'
              });

              await user.save();
          }

          return done(null,user)
      } catch (error) {
          return done(error,null)
      }
  }
  )
)

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user,done)=>{
  done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
  successRedirect:"http://localhost:3000",
  failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{
  if(req.user){
      res.status(200).json({message:"user Login",user:req.user})
  }else{
      res.status(400).json({message:"Not Authorized"})
  }
})

app.get("/logout",(req,res,next)=>{
  req.logout(function(err){
      if(err){return next(err)}
      res.redirect("http://localhost:3000");
  })
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/providers', providerRouter)
app.use('/api/maids', maidsRouter)
app.use('/api/serviceUser', serviceUserRouter)
app.use('/api/serviceList', serviceListRouter)
app.use('/api/service', serviceRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
