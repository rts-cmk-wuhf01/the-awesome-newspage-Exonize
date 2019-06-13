const mysql = require('mysql2');

const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'thenewspaper'
});


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
   SELECT 
        category_id
      , category_title
      , article_id
      , article_title
      , article_text
      , article_image
      , article_likes
      , author_id
      , author_name
      , (SELECT COUNT(comment_id) 
      FROM comments 
      WHERE fk_article_id = article_id) AS article_comments
      FROM articles 
      INNER JOIN categories ON category_id = fk_category_id
      INNER JOIN authors ON author_id = fk_author_id
      WHERE fk_category_id = ?`, [req.params.category_id]);

   let [latestPosts] = await db.execute(`
   SELECT 
         category_id
      , category_title
      , article_id
      , article_title
      , article_image
      , article_postdate
      FROM categories 
      LEFT OUTER JOIN articles ON fk_category_id = category_id
      WHERE article_id = (
      SELECT article_id 
      FROM articles 
      WHERE fk_category_id = category_id 
      ORDER BY article_postdate DESC 
      LIMIT 1)
      ORDER BY article_postdate DESC`);

   let [comments] = await db.execute(`
      SELECT article_title, 
      comment_postdate, 
      comment_text, 
      FROM comments 
      WHERE fk_article_id = ?`, [req.params.article_id]);

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