var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({passRequestToCallback: true}, (req, email, password, done) => {
    loginAttempt();
    const loginAttempt = async () => {

    }
}))