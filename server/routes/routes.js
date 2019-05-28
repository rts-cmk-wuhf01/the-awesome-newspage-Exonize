module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home');
   });

   app.get('/', (req, res, next) => {
      res.render('singlepost');
   });

   app.get('/', (req, res, next) => {
      res.render('scripts');
   });

   app.get('/', (req, res, next) => {
      res.render('home');
   });

};