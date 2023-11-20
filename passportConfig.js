const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            try {
                const user = await User.findOne({ where: { username: username } });
                if (!user) {
                    return done(null, false, { message: 'That username is not registered' });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            done(null, user);
        });
    });
};
