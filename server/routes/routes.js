const mysql = require('../config/mysql.js');

async function getCategories() {
   let db = await mysql.connect();
   let [categories] = await db.execute(`
      SELECT category_id, category_title 
      FROM categories
      ORDER BY category_title ASC`);
   db.end();
   return categories;
}

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

   app.post('/contact', async (req, res, next) => {

      // indsamling af værdierne og oprettelse af de nødvendige variabler.
      let name = req.body.name;
      let email = req.body.email;
      let subject = req.body.subject;
      let message = req.body.message;
      let contactDate = new Date();

      // håndter valideringen, alle fejl pushes til et array så de er samlet ET sted
      let return_message = [];
      if (name == undefined || name == '') {
         return_message.push('Navn mangler');
      }
      if (email == undefined || email == '') {
         return_message.push('Email mangler');
      }
      if (subject == undefined || subject == '') {
         return_message.push('Emne mangler');
      }
      if (message == undefined || message == '') {
         return_message.push('Beskedteksten mangler');
      }

      if (return_message.length > 0) {
         // der er mindst 1 information der mangler, returner beskeden som en string.
         let categories = await getCategories(); // denne forklares lige om lidt!
         res.render('contact', {
            'categories': categories,
            'return_message': return_message.join(', '),
            'values': req.body // læg mærke til vi "bare" sender req.body tilbage
         });
         
      } else {
         let db = await mysql.connect();
         try {
         let result = await db.execute(`
            INSERT INTO messages SET
               message_name = ?
               ,message_email = ?
               ,message_subject = ?
               ,message_text = ?
               ,message_date = ?
            `, [name, email, subject, message, contactDate]);

         console.log(result[0])

         // affected rows er større end nul, hvis en (eller flere) række(r) blev indsat
         if (result[0].affectedRows > 0) {
            return_message.push('Tak for din besked, vi vender tilbage hurtigst muligt');
         } else {
            return_message.push('Din besked blev ikke modtaget.... ');
         }

         let categories = await getCategories(); // denne har jeg ikke forklaret endnu! 
         res.render('contact', {
            'categories': categories,
            'return_message': return_message.join(', '),
            'values': {}
         });
       } catch (error) {
          console.log(error.message)
       } db.end();
      }
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