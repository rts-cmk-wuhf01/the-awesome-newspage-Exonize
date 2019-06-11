const mysql = require('../config/mysql')

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

   app.get('/contact', (req, res, next) => {
      res.render('contact');
   });


   app.get('/category/:category_id', async (req, res, next) => {

   let db = await mysql.connect();
   let [categories] = await db.execute('SELECT * FROM categories WHERE category_id = ?', [1]);

   let [articles] = await db.execute(`
      SELECT category_title, article_title, article_image, article_postdate 
      FROM articles 
      WHERE fk_category_id = ?`, [req.params.category_id]);

      console.log(categories)
      res.render('categories-post' , {
         // 'latestPost' : posts,
         // 'latestComments' : comments,
         // 'popularNews' : news,
         articles,
         "category": categories[0]
      });
      db.end();
   });

   app.get('/categories-post', (req, res, next) => {
      res.render('categories-post');
   });

   app.get('/categories-post/:category_id', async (req, res, next) => {
      res.send(req.params.category_id);
   });
   
};