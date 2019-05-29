module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home');
   });

   app.get('/singlepost-blog', (req, res, next) => {
      res.render('singlepost-blog');
   });

   app.get('/about', (req, res, next) => {
      res.render('about');
   });

   app.get('/categories-post', (req, res, next) => {
      res.render('categories-post');
   });

   app.get('/contact', (req, res, next) => {
      res.render('contact');
   });
};