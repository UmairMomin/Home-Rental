const Posts = require("../model/postModel");

const get_products = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Posts.findById(productId);
    if (!product) {
      return res.status(404).send("Post not found");
    }
    res.render("product-details", { user: req.user, product });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = { get_products };
