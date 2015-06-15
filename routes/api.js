/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "shops": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ],
  "users":[]
};

// GET

exports.shops = function (req, res) {
  var posts = [];
  data.shops.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.shop = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.shops.length) {
    res.json({
      post: data.shops[id]
    });
  } else {
    res.json(false);
  }
};

// POST

exports.addShop = function (req, res) {
  data.shops.push(req.body);
  res.json(req.body);
};

// POST

exports.addUser = function (req, res) {
  data.users.push(req.body);
  res.json(req.body);
};

// PUT

exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.shops.length) {
    data.shops[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE

exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.shops.length) {
    data.shops.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};