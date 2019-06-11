module.exports = (app) => {

   // app.get('/', (req, res, next) => {
   //    let products = [
   //       {
   //          "title": "",
   //          "desc": 
   //       },
   //       {
   //          "title": "",
   //          "desc": 
   //       }
   //    ];

   //    res.render('home', {
   //       "latestProducts": products
   //    });
   // });

   // <div class="nyhed">
   //    <h2><%=nyhed.title %></h2>
   //    <h2><%=nyhed.desc %></h2>
   // </div>

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

   app.get('/categories-post/:category_id', async (req, res, next) => {
      res.send(req.params.category_id); // for demonstrationens skyld! 
   
      // her kan alle kategoriens artikler hentes osv...
   });

   
};