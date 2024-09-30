const Posts = require("../model/postModel");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "..", "public", "uploads", "posts");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Use the uploadsDir defined above
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const get_posts = async (req, res) => {
  try {
    const postData = await Posts.find();
    res.render("dashboard", { data: postData, user: req.user });
  } catch (error) {
    res.send(error);
  }
};

const add_posts = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render("form", { msg: err, user: req.user });
    } else {
      if (req.file == undefined) {
        res.render("form", {
          msg: "No file selected!",
          user: req.user,
          data: false,
        });
      } else {
        try {
          const posts = new Posts({
            Name: req.body.name,
            Category: req.body.category,
            Address: req.body.address,
            Description: req.body.description,
            ImageURL: "/uploads/posts/" + req.file.filename,
            Price: req.body.price,
          });

          await posts.save();
          res.render("form", {
            msg: "Post Added Successfully",
            user: req.user,
            data: false,
          });
        } catch (error) {
          res.send(error);
        }
      }
    }
  });
};

const update_posts = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render("form", { msg: err, user: req.user });
    } else {
      try {
        const { id } = req.body;
        const updatedData = {
          Name: req.body.name,
          Category: req.body.category,
          Address: req.body.address,
          Description: req.body.description,
          Price: req.body.price,
        };

        if (req.file) {
          updatedData.ImageURL = "/uploads/posts/" + req.file.filename;
        }

        await Posts.findByIdAndUpdate(id, updatedData);
        res.render("form", {
          msg: "Post Updated Successfully",
          user: req.user,
          data: false,
        });
      } catch (error) {
        res.render("form", {
          msg: "Error updating post",
          user: req.user,
          data: req.body,
        });
      }
    }
  });
};

module.exports = {
  add_posts,
  get_posts,
  update_posts,
};
