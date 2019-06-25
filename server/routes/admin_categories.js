const mysql = require("../config/mysql");

async function getCategories() {
	let db = await mysql.connect();
	let [categories] = await db.execute(`
		SELECT category_id, category_title
		FROM categories
		ORDER BY category_title ASC`);
	db.end();
	return categories;
}





module.exports = app => {

	// List of Existing Categories
	app.get("/admin/categories", async (req, res, next) => {
		let categories = await getCategories();
		res.render('admin/categories', {
			'categories': categories
		})

		app.post("/admin/categories", async (req, res, next) => {
			

		})


	  });
};