const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const Cooker = require('./models/cooker');

const MONGODB_URI =
  'mongodb+srv://localhost1:zwp65NOpQCVpt1rL@cluster0.pwwpg.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const cookerRoutes = require('./routes/cooker');
const authRoutes = require('./routes/auth');

// multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// end multer


app.use(bodyParser.urlencoded({ extended: false }));
// multer
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
// end multer

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.cooker) {
    return next();
  }
  Cooker.findById(req.session.cooker._id)
    .then(cooker => {
      req.cooker = cooker;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(cookerRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true })
  .then(result => {
    app.listen(process.env.PORT || 3002);
  })
  .catch(err => {
    console.log(err);
  });
