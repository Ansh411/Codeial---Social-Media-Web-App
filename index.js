const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// const sass = require('sass');
// const fs = require('fs');

// console.log("✅ sass-middleware mounted from:", path.join(__dirname, 'assets', 'scss'));

// const scssFolder = path.join(__dirname, 'assets', 'scss');
// const cssFolder = path.join(__dirname, 'assets', 'css');

// if (!fs.existsSync(cssFolder)) fs.mkdirSync(cssFolder, { recursive: true });

// compile SCSS → CSS immediately
// fs.readdirSync(scssFolder).forEach(file => {
//   if (file.endsWith('.scss')) {
//     const scssPath = path.join(scssFolder, file);
//     const cssPath = path.join(cssFolder, file.replace('.scss', '.css'));
//     const result = sass.compile(scssPath, { style: 'expanded' });
//     fs.writeFileSync(cssPath, result.css);
//     console.log(`Compiled ${file} → ${file.replace('.scss', '.css')}`);
//   }
// });

app.use(
    sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    prefix: '/css',
    outputStyle: 'extended',
})
);

app.use(express.static('./assets'));

// app.use('/css', (req, res, next) => {
//   console.log('Requesting CSS file:', req.url);
//   next();
// });

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout

app.set('layout extractStyles' , true);
app.set('layout extractScripts', true);


// set up view engine

app.set('view engine' , 'ejs');
app.set('views' ,'./views');

// mongo store is used to store the session cookie in the db

app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router

app.use('/' , require('./routes/index'));

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server in running on port : ${port}`);
});