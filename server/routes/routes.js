module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home');
   });

   app.get('/', (req, res, next) => {
      res.render('singlepost-blog');
   });

   app.get('/', (req, res, next) => {
      res.render('about');
   });

   app.get('/', (req, res, next) => {
      res.render('categories-post');
   });

   app.get('/', (req, res, next) => {
      res.render('contact');
   });
};