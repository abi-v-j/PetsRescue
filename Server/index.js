
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const port = 5000

// -------------------- File Upload Setup --------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./public/uploads";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });


// -------------------- Start Server --------------------
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
// -------------------- Database Connection --------------------
mongoose
  .connect("mongodb+srv://nesla:nesla@cluster0.lo81lsx.mongodb.net/db_mainproject")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });




// ----------------------------------------------------------------------
// Admin
const adminSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true, trim: true },
    adminEmail: { type: String, required: true, trim: true, lowercase: true },
    adminPassword: { type: String, required: true, trim: true },
  },
  { collection: "admins", timestamps: true }
);
const Admin = mongoose.model("Admin", adminSchema);

// ----------------------------------------------------------------------
// District
const districtSchema = new mongoose.Schema(
  {
    districtName: { type: String, required: true, trim: true },
  },
  { collection: "districts", timestamps: true }
);
const District = mongoose.model("District", districtSchema);

// ----------------------------------------------------------------------
// Category
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, trim: true },
  },
  { collection: "categories", timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);

// ----------------------------------------------------------------------
// Place  (FK: District)
const placeSchema = new mongoose.Schema(
  {
    placeName: { type: String, required: true, trim: true },
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
  },
  { collection: "places", timestamps: true }
);
const Place = mongoose.model("Place", placeSchema);

// ----------------------------------------------------------------------
// User (FK: Place)
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    userPassword: { type: String, required: true, trim: true },
    userAddress: { type: String, required: true, trim: true },
    userProof: { type: String, required: true, trim: true },
    userPhoto: { type: String, required: true, trim: true },
    userPhone: { type: String, required: true, trim: true },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);
const User = mongoose.model("User", userSchema);

// ----------------------------------------------------------------------
// Rescue Team (FK: District)
const rescueTeamSchema = new mongoose.Schema(
  {
    rescueTeamName: { type: String, required: true, trim: true },
    rescueTeamEmail: { type: String, required: true, trim: true, lowercase: true },
    rescueTeamPassword: { type: String, required: true, trim: true },
    rescueTeamAddress: { type: String, required: true, trim: true },
    rescueTeamPhoto: { type: String, required: true, trim: true },
    rescueTeamProof: { type: String, required: true, trim: true },
    districtId: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },

    // ✅ ADD THIS
    rescueTeamStatus: { type: Number, enum: [0, 1, 2], default: 0 }, // 0 pending, 1 accept, 2 reject
  },
  { collection: "rescueteams", timestamps: true }
);
const RescueTeam = mongoose.model("RescueTeam", rescueTeamSchema);

// ----------------------------------------------------------------------
// Gallery (FK: RescueTeam)
const gallerySchema = new mongoose.Schema(
  {
    galleryFile: { type: String, required: true, trim: true },
    rescueTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RescueTeam",
      required: true,
    },
  },
  { collection: "galleries", timestamps: true }
);
const Gallery = mongoose.model("Gallery", gallerySchema);

// ----------------------------------------------------------------------
// Shop (FK: Place)
const shopSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true, trim: true },
    shopEmail: { type: String, required: true, trim: true, lowercase: true },
    shopPassword: { type: String, required: true, trim: true },
    shopProof: { type: String, required: true, trim: true },
    shopPhoto: { type: String, required: true, trim: true },
    shopAddress: { type: String, required: true, trim: true },
    shopStatus: { 
      type: Number, 
      enum: [0, 1, 2], 
      default: 0   // 0 = pending
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  },
  { collection: "shops", timestamps: true }
);
const Shop = mongoose.model("Shop", shopSchema);

// ----------------------------------------------------------------------
// Product (FK: Shop)
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    productDetails: { type: String, required: true, trim: true },
    productPhoto: { type: String, required: true, trim: true },
    productPrice: { type: Number, required: true },
    productStatus: { type: String, required: true, trim: true },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { collection: "products", timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

// ----------------------------------------------------------------------
// Booking (FK: Product, User)
const bookingSchema = new mongoose.Schema(
  {
    bookingFromDate: { type: Date, required: true },
    bookingToDate: { type: Date, required: true },
    bookingAmount: { type: Number, required: true },
    bookingStatus: { type: String, required: true, trim: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "bookings", timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);

// ----------------------------------------------------------------------
// Cart (FK: Product, Booking)
const cartSchema = new mongoose.Schema(
  {
    cartQuantity: { type: Number, required: true },
    cartTotal: { type: Number, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  },
  { collection: "carts", timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);

// ----------------------------------------------------------------------
// Complaint (FK: User)
const complaintSchema = new mongoose.Schema(
  {
    complaintTitle: { type: String, required: true, trim: true },
    complaintContent: { type: String, required: true, trim: true },
    complaintReply: { type: String, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "complaints", timestamps: true }
);
const Complaint = mongoose.model("Complaint", complaintSchema);

// ----------------------------------------------------------------------
// Rating (FK: RescueTeam, Shop, User)
const ratingSchema = new mongoose.Schema(
  {
    ratingValue: { type: Number, required: true },
    ratingComment: { type: String, trim: true },
    rescueTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RescueTeam",
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "ratings", timestamps: true }
);
const Rating = mongoose.model("Rating", ratingSchema);

// ----------------------------------------------------------------------
// Request (FK: User, Place, RescueTeam)
const requestSchema = new mongoose.Schema(
  {
    requestDetails: { type: String, required: true, trim: true },
    requestPhoto: { type: String, trim: true },
    requestReply: { type: String, trim: true },
    requestStatus: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    rescueTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RescueTeam",
    },
  },
  { collection: "requests", timestamps: true }
);
const Request = mongoose.model("Request", requestSchema);

// ----------------------------------------------------------------------
// Stock (FK: Product)
const stockSchema = new mongoose.Schema(
  {
    stockQuantity: { type: Number, required: true },
    stockStatus: { type: String, required: true, trim: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { collection: "stocks", timestamps: true }
);
const Stock = mongoose.model("Stock", stockSchema);

// ----------------------------------------------------------------------
// Post (FK: RescueTeam)
const postSchema = new mongoose.Schema(
  {
    postName: { type: String, required: true, trim: true },
    postDetails: { type: String, required: true, trim: true },
    postPhoto: { type: String, required: true, trim: true },
    rescueTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RescueTeam",
      required: true,
    },
  },
  { collection: "posts", timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

// ----------------------------------------------------------------------
// Adoption (FK: Post, User)
const adoptionSchema = new mongoose.Schema(
  {
    adoptionDate: { type: Date, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "adoptions", timestamps: true }
);
const Adoption = mongoose.model("Adoption", adoptionSchema);

// ----------------------------------------------------------------------
// Adoption Sub (FK: Adoption)
const adoptionSubSchema = new mongoose.Schema(
  {
    adoptionSubDate: { type: Date, required: true },
    adoptionSubPhoto: { type: String, required: true, trim: true },
    adoptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adoption",
      required: true,
    },
  },
  { collection: "adoptionsubs", timestamps: true }
);
const AdoptionSub = mongoose.model("AdoptionSub", adoptionSubSchema);




// ================== CRUD APIs =======================
// ====================================================

// ✅ CREATE
app.post("/adminreg", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    if (!adminName) return res.status(400).json({ message: "Name required" });
    if (!adminEmail) return res.status(400).json({ message: "Email required" });
    if (!adminPassword) return res.status(400).json({ message: "Password required" });

    const newAdmin = await Admin.create({
      adminName,
      adminEmail,
      adminPassword,
    });

    res.status(201).json({ message: "Admin Created", data: newAdmin });
  } catch (err) {
    res.status(500).json({ message: "Create Failed", error: err.message });
  }
});

// ✅ READ ALL
app.get("/adminreg", async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    res.json({ data: admins });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed" });
  }
});

// ✅ READ ONE
app.get("/adminreg/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Not Found" });
    res.json({ data: admin });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// ✅ UPDATE
app.put("/adminreg/:id", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    const updated = await Admin.findByIdAndUpdate(
      req.params.id,
      { adminName, adminEmail, adminPassword },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: "Update Failed" });
  }
});

// ✅ DELETE
app.delete("/adminreg/:id", async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed" });
  }
});





// ================== DISTRICT CRUD APIs =======================

// ✅ CREATE
app.post("/district", async (req, res) => {
  try {
    const { districtName } = req.body;

    if (!districtName)
      return res.status(400).json({ message: "districtName required" });

    const newDistrict = await District.create({ districtName });

    res.status(201).json({ message: "District Created", data: newDistrict });
  } catch (err) {
    res.status(500).json({ message: "Create Failed", error: err.message });
  }
});


// ✅ READ ALL
app.get("/district", async (req, res) => {
  try {
    const districts = await District.find().sort({ createdAt: -1 });
    res.json({ data: districts });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed" });
  }
});


// ✅ READ ONE
app.get("/district/:id", async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    if (!district)
      return res.status(404).json({ message: "Not Found" });

    res.json({ data: district });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});


// ✅ UPDATE
app.put("/district/:id", async (req, res) => {
  try {
    const { districtName } = req.body;

    const updated = await District.findByIdAndUpdate(
      req.params.id,
      { districtName },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: "Update Failed" });
  }
});


// ✅ DELETE
app.delete("/district/:id", async (req, res) => {
  try {
    const deleted = await District.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed" });
  }
});



// ================== CATEGORY CRUD APIs =======================

// ✅ CREATE
app.post("/category", async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName)
      return res.status(400).json({ message: "categoryName required" });

    const newCategory = await Category.create({ categoryName });

    res.status(201).json({ message: "Category Created", data: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Create Failed", error: err.message });
  }
});

// ✅ READ ALL
app.get("/category", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed" });
  }
});

// ✅ READ ONE
app.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not Found" });
    res.json({ data: category });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// ✅ UPDATE
app.put("/category/:id", async (req, res) => {
  try {
    const { categoryName } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { categoryName },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: "Update Failed" });
  }
});

// ✅ DELETE
app.delete("/category/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed" });
  }
});




// ================== PLACE CRUD APIs =======================

// ✅ CREATE
app.post("/place", async (req, res) => {
  try {
    const { placeName, districtId } = req.body;

    if (!placeName) return res.status(400).json({ message: "placeName required" });
    if (!districtId) return res.status(400).json({ message: "districtId required" });

    const newPlace = await Place.create({ placeName, districtId });
    res.status(201).json({ message: "Place Created", data: newPlace });
  } catch (err) {
    res.status(500).json({ message: "Create Failed", error: err.message });
  }
});

// ✅ READ ALL (populate District)
app.get("/place", async (req, res) => {
  try {
    const places = await Place.find()
      .populate("districtId") // get district details
      .sort({ createdAt: -1 });

    res.json({ data: places });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed" });
  }
});

// ✅ READ ONE
app.get("/place/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate("districtId");
    if (!place) return res.status(404).json({ message: "Not Found" });

    res.json({ data: place });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// ✅ UPDATE
app.put("/place/:id", async (req, res) => {
  try {
    const { placeName, districtId } = req.body;

    const updated = await Place.findByIdAndUpdate(
      req.params.id,
      { placeName, districtId },
      { new: true }
    ).populate("districtId");

    if (!updated) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: "Update Failed" });
  }
});

// ✅ DELETE
app.delete("/place/:id", async (req, res) => {
  try {
    const deleted = await Place.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed" });
  }
});


// ✅ READ Place By District Id
app.get("/place/bydistrict/:districtId", async (req, res) => {
  try {
    const { districtId } = req.params;

    const places = await Place.find({ districtId }).sort({ createdAt: -1 });

    res.json({ data: places });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});






// ================== USER INSERT API =======================

// upload fields
app.post(
  "/user",
  upload.fields([
    { name: "userPhoto", maxCount: 1 },
    { name: "userProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        userName,
        userEmail,
        userPassword,
        userAddress,
        userPhone,
        placeId,
      } = req.body;

      // validation
      if (!userName) return res.status(400).json({ message: "userName required" });
      if (!userEmail) return res.status(400).json({ message: "userEmail required" });
      if (!userPassword) return res.status(400).json({ message: "userPassword required" });
      if (!userAddress) return res.status(400).json({ message: "userAddress required" });
      if (!userPhone) return res.status(400).json({ message: "userPhone required" });
      if (!placeId) return res.status(400).json({ message: "placeId required" });

      // file paths
      const userPhoto = req.files?.userPhoto
        ? req.files.userPhoto[0].filename
        : null;

      const userProof = req.files?.userProof
        ? req.files.userProof[0].filename
        : null;

      if (!userPhoto)
        return res.status(400).json({ message: "userPhoto required" });

      if (!userProof)
        return res.status(400).json({ message: "userProof required" });

      const newUser = await User.create({
        userName,
        userEmail,
        userPassword,
        userAddress,
        userPhone,
        userPhoto,
        userProof,
        placeId,
      });

      res.status(201).json({
        message: "User Created Successfully",
        data: newUser,
      });
    } catch (err) {
      res.status(500).json({
        message: "Insert Failed",
        error: err.message,
      });
    }
  }
);



// -------------------- GET USER BY ID --------------------
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "placeId",
        populate: { path: "districtId" } // optional if you want district also
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ data: user });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});




// -------------------- UPDATE USER PROFILE --------------------
app.put(
  "/user/:id",
  upload.fields([
    { name: "userPhoto", maxCount: 1 },
    { name: "userProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const { userName, userEmail, userAddress, userPhone } = req.body;

      const oldUser = await User.findById(id);
      if (!oldUser) return res.status(404).json({ message: "User not found" });

      // optional new files
      const newPhoto = req.files?.userPhoto ? req.files.userPhoto[0].filename : null;
      const newProof = req.files?.userProof ? req.files.userProof[0].filename : null;

      const updated = await User.findByIdAndUpdate(
        id,
        {
          userName: userName ?? oldUser.userName,
          userEmail: userEmail ?? oldUser.userEmail,
          userAddress: userAddress ?? oldUser.userAddress,
          userPhone: userPhone ?? oldUser.userPhone,
          userPhoto: newPhoto ?? oldUser.userPhoto,
          userProof: newProof ?? oldUser.userProof,
        },
        { new: true }
      );

      res.json({ message: "Profile Updated", data: updated });
    } catch (err) {
      res.status(500).json({ message: "Update Failed", error: err.message });
    }
  }
);



// -------------------- USER CHANGE PASSWORD --------------------
app.put("/user/changepassword/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword) return res.status(400).json({ message: "oldPassword required" });
    if (!newPassword) return res.status(400).json({ message: "newPassword required" });
    if (!confirmPassword) return res.status(400).json({ message: "confirmPassword required" });
    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Password not matching" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.userPassword !== oldPassword)
      return res.status(401).json({ message: "Old password incorrect" });

    user.userPassword = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Change password failed", error: err.message });
  }
});




// ================== RESCUE TEAM INSERT API =======================

app.post(
  "/rescueteam",
  upload.fields([
    { name: "rescueTeamPhoto", maxCount: 1 },
    { name: "rescueTeamProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        rescueTeamName,
        rescueTeamEmail,
        rescueTeamPassword,
        rescueTeamAddress,
        districtId,
      } = req.body;

      if (!rescueTeamName) return res.status(400).json({ message: "rescueTeamName required" });
      if (!rescueTeamEmail) return res.status(400).json({ message: "rescueTeamEmail required" });
      if (!rescueTeamPassword) return res.status(400).json({ message: "rescueTeamPassword required" });
      if (!rescueTeamAddress) return res.status(400).json({ message: "rescueTeamAddress required" });
      if (!districtId) return res.status(400).json({ message: "districtId required" });

      const rescueTeamPhoto = req.files?.rescueTeamPhoto
        ? req.files.rescueTeamPhoto[0].filename
        : null;

      const rescueTeamProof = req.files?.rescueTeamProof
        ? req.files.rescueTeamProof[0].filename
        : null;

      if (!rescueTeamPhoto) return res.status(400).json({ message: "rescueTeamPhoto required" });
      if (!rescueTeamProof) return res.status(400).json({ message: "rescueTeamProof required" });

      const newTeam = await RescueTeam.create({
        rescueTeamName,
        rescueTeamEmail,
        rescueTeamPassword,
        rescueTeamAddress,
        rescueTeamPhoto,
        rescueTeamProof,
        districtId,
      });

      res.status(201).json({ message: "Rescue Team Created", data: newTeam });
    } catch (err) {
      res.status(500).json({ message: "Insert Failed", error: err.message });
    }
  }
);


// -------------------- GET RESCUE TEAM BY ID --------------------
app.get("/rescueteam/:id", async (req, res) => {
  try {
    const rescue = await RescueTeam.findById(req.params.id)
      .populate("districtId");

    if (!rescue)
      return res.status(404).json({ message: "Rescue Team not found" });

    res.json({ data: rescue });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});


// -------------------- UPDATE RESCUE TEAM PROFILE --------------------
app.put(
  "/rescueteam/:id",
  upload.fields([
    { name: "rescueTeamPhoto", maxCount: 1 },
    { name: "rescueTeamProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { rescueTeamName, rescueTeamEmail, rescueTeamAddress } = req.body;

      const oldRescue = await RescueTeam.findById(id);
      if (!oldRescue) return res.status(404).json({ message: "Rescue Team not found" });

      const newPhoto = req.files?.rescueTeamPhoto
        ? req.files.rescueTeamPhoto[0].filename
        : null;

      const newProof = req.files?.rescueTeamProof
        ? req.files.rescueTeamProof[0].filename
        : null;

      const updated = await RescueTeam.findByIdAndUpdate(
        id,
        {
          rescueTeamName: rescueTeamName ?? oldRescue.rescueTeamName,
          rescueTeamEmail: rescueTeamEmail ?? oldRescue.rescueTeamEmail,
          rescueTeamAddress: rescueTeamAddress ?? oldRescue.rescueTeamAddress,
          rescueTeamPhoto: newPhoto ?? oldRescue.rescueTeamPhoto,
          rescueTeamProof: newProof ?? oldRescue.rescueTeamProof,
        },
        { new: true }
      );

      res.json({ message: "Profile Updated", data: updated });
    } catch (err) {
      res.status(500).json({ message: "Update Failed", error: err.message });
    }
  }
);



// -------------------- RESCUE TEAM CHANGE PASSWORD --------------------
app.put("/rescueteam/changepassword/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword) return res.status(400).json({ message: "oldPassword required" });
    if (!newPassword) return res.status(400).json({ message: "newPassword required" });
    if (!confirmPassword) return res.status(400).json({ message: "confirmPassword required" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Password not matching" });

    const rescue = await RescueTeam.findById(id);
    if (!rescue) return res.status(404).json({ message: "Rescue Team not found" });

    if (rescue.rescueTeamPassword !== oldPassword)
      return res.status(401).json({ message: "Old password incorrect" });

    rescue.rescueTeamPassword = newPassword;
    await rescue.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Change password failed", error: err.message });
  }
});



app.post(
  "/shop",
  upload.fields([
    { name: "shopPhoto", maxCount: 1 },
    { name: "shopProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { shopName, shopEmail, shopPassword, shopAddress, placeId } = req.body;

      if (!shopName) return res.status(400).json({ message: "shopName required" });
      if (!shopEmail) return res.status(400).json({ message: "shopEmail required" });
      if (!shopPassword) return res.status(400).json({ message: "shopPassword required" });
      if (!shopAddress) return res.status(400).json({ message: "shopAddress required" });
      if (!placeId) return res.status(400).json({ message: "placeId required" });

      const shopPhoto = req.files?.shopPhoto ? req.files.shopPhoto[0].filename : null;
      const shopProof = req.files?.shopProof ? req.files.shopProof[0].filename : null;

      if (!shopPhoto) return res.status(400).json({ message: "shopPhoto required" });
      if (!shopProof) return res.status(400).json({ message: "shopProof required" });

      const newShop = await Shop.create({
        shopName,
        shopEmail,
        shopPassword,
        shopAddress,
        shopPhoto,
        shopProof,
        placeId,
      });

      res.status(201).json({ message: "Shop Created", data: newShop });
    } catch (err) {
      res.status(500).json({ message: "Insert Failed", error: err.message });
    }
  }
);



// -------------------- GET SHOP BY ID --------------------
app.get("/shop/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
      .populate({
        path: "placeId",
        populate: { path: "districtId" }
      });

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.json({ data: shop });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});



// -------------------- UPDATE SHOP PROFILE --------------------
app.put(
  "/shop/:id",
  upload.fields([
    { name: "shopPhoto", maxCount: 1 },
    { name: "shopProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { shopName, shopEmail, shopAddress } = req.body;

      const oldShop = await Shop.findById(id);
      if (!oldShop) return res.status(404).json({ message: "Shop not found" });

      const newPhoto = req.files?.shopPhoto ? req.files.shopPhoto[0].filename : null;
      const newProof = req.files?.shopProof ? req.files.shopProof[0].filename : null;

      const updated = await Shop.findByIdAndUpdate(
        id,
        {
          shopName: shopName ?? oldShop.shopName,
          shopEmail: shopEmail ?? oldShop.shopEmail,
          shopAddress: shopAddress ?? oldShop.shopAddress,
          shopPhoto: newPhoto ?? oldShop.shopPhoto,
          shopProof: newProof ?? oldShop.shopProof,
        },
        { new: true }
      );

      res.json({ message: "Profile Updated", data: updated });
    } catch (err) {
      res.status(500).json({ message: "Update Failed", error: err.message });
    }
  }
);


// -------------------- SHOP CHANGE PASSWORD --------------------
app.put("/shop/changepassword/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword) return res.status(400).json({ message: "oldPassword required" });
    if (!newPassword) return res.status(400).json({ message: "newPassword required" });
    if (!confirmPassword) return res.status(400).json({ message: "confirmPassword required" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Password not matching" });

    const shop = await Shop.findById(id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    if (shop.shopPassword !== oldPassword)
      return res.status(401).json({ message: "Old password incorrect" });

    shop.shopPassword = newPassword;
    await shop.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Change password failed", error: err.message });
  }
});

// -------------------- LOGIN (admin/user/rescueteam/shop) --------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });
    if (!password) return res.status(400).json({ message: "Password required" });

    // ================= ADMIN =================
    const admin = await Admin.findOne({
      adminEmail: email,
      adminPassword: password,
    });

    if (admin) {
      return res.json({
        role: "admin",
        id: admin._id,
        name: admin.adminName,
        message: "Login successful",
      });
    }

    // ================= USER =================
    const user = await User.findOne({
      userEmail: email,
      userPassword: password,
    });

    if (user) {
      return res.json({
        role: "user",
        id: user._id,
        name: user.userName,
        message: "Login successful",
      });
    }

    // ================= RESCUE TEAM =================
    const rescue = await RescueTeam.findOne({
      rescueTeamEmail: email,
      rescueTeamPassword: password,
    });

    if (rescue) {
      // 🔴 CHECK STATUS
      if (rescue.rescueTeamStatus === 0) {
        return res.status(403).json({
          message: "Your account is still pending admin approval",
        });
      }

      if (rescue.rescueTeamStatus === 2) {
        return res.status(403).json({
          message: "Your account has been rejected by admin",
        });
      }

      // ✅ STATUS = 1
      return res.json({
        role: "rescueteam",
        id: rescue._id,
        name: rescue.rescueTeamName,
        message: "Login successful",
      });
    }

    // ================= SHOP =================
    const shop = await Shop.findOne({
      shopEmail: email,
      shopPassword: password,
    });

    if (shop) {
      // 🔴 CHECK STATUS
      if (shop.shopStatus === 0) {
        return res.status(403).json({
          message: "Your shop is pending admin approval",
        });
      }

      if (shop.shopStatus === 2) {
        return res.status(403).json({
          message: "Your shop has been rejected by admin",
        });
      }

      // ✅ STATUS = 1
      return res.json({
        role: "shop",
        id: shop._id,
        name: shop.shopName,
        message: "Login successful",
      });
    }

    // ================= INVALID =================
    return res.status(401).json({ message: "Invalid email or password" });

  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
});

// GET SHOPS BY STATUS
app.get("/admin/shops/status/:status", async (req, res) => {
  try {
    const { status } = req.params;

    if (![0, 1, 2].includes(Number(status))) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const shops = await Shop.find({ shopStatus: Number(status) })
      .populate({
        path: "placeId",
        populate: { path: "districtId" }
      })
      .sort({ createdAt: -1 });

    res.json({ data: shops });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});

app.put("/admin/shops/accept/:id", async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { shopStatus: 1 },
      { new: true }
    );

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.json({ message: "Shop Accepted", data: shop });
  } catch (err) {
    res.status(400).json({ message: "Accept Failed", error: err.message });
  }
});


// ✅ USER: VIEW ACCEPTED SHOPS ONLY
app.get("/shops/accepted", async (req, res) => {
  try {
    const shops = await Shop.find({ shopStatus: 1 })
      .populate({ path: "placeId", populate: { path: "districtId" } })
      .sort({ createdAt: -1 });

    res.json({ data: shops });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});



app.put("/admin/shops/reject/:id", async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { shopStatus: 2 },
      { new: true }
    );

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.json({ message: "Shop Rejected", data: shop });
  } catch (err) {
    res.status(400).json({ message: "Reject Failed", error: err.message });
  }
});



// GET RESCUE TEAMS BY STATUS (0/1/2)
app.get("/admin/rescueteams/status/:status", async (req, res) => {
  try {
    const status = Number(req.params.status);
    if (![0, 1, 2].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const teams = await RescueTeam.find({ rescueTeamStatus: status })
      .populate("districtId")
      .sort({ createdAt: -1 });

    res.json({ data: teams });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});

// ACCEPT RESCUE TEAM => status = 1
app.put("/admin/rescueteams/accept/:id", async (req, res) => {
  try {
    const team = await RescueTeam.findByIdAndUpdate(
      req.params.id,
      { rescueTeamStatus: 1 },
      { new: true }
    );

    if (!team) return res.status(404).json({ message: "RescueTeam not found" });
    res.json({ message: "Rescue Team Accepted", data: team });
  } catch (err) {
    res.status(400).json({ message: "Accept Failed", error: err.message });
  }
});

// REJECT RESCUE TEAM => status = 2
app.put("/admin/rescueteams/reject/:id", async (req, res) => {
  try {
    const team = await RescueTeam.findByIdAndUpdate(
      req.params.id,
      { rescueTeamStatus: 2 },
      { new: true }
    );

    if (!team) return res.status(404).json({ message: "RescueTeam not found" });
    res.json({ message: "Rescue Team Rejected", data: team });
  } catch (err) {
    res.status(400).json({ message: "Reject Failed", error: err.message });
  }
});



// ================== GALLERY CRUD APIs =======================

// ✅ CREATE (Upload Image) - rescueTeamId from body
app.post("/gallery", upload.single("galleryFile"), async (req, res) => {
  try {
    const { rescueTeamId } = req.body;

    if (!rescueTeamId) {
      return res.status(400).json({ message: "rescueTeamId required" });
    }

    const fileName = req.file ? req.file.filename : null;

    if (!fileName) {
      return res.status(400).json({ message: "galleryFile required" });
    }

    const created = await Gallery.create({
      rescueTeamId,
      galleryFile: fileName,
    });

    res.status(201).json({ message: "Gallery Added", data: created });
  } catch (err) {
    res.status(500).json({ message: "Create Failed", error: err.message });
  }
});


// ✅ READ ALL (Admin / All)
app.get("/gallery", async (req, res) => {
  try {
    const list = await Gallery.find()
      .populate("rescueTeamId")
      .sort({ createdAt: -1 });

    res.json({ data: list });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});


// ✅ READ BY RESCUE TEAM ID (RescueTeam gallery list)
app.get("/gallery/byrescue/:rescueTeamId", async (req, res) => {
  try {
    const { rescueTeamId } = req.params;

    const list = await Gallery.find({ rescueTeamId })
      .sort({ createdAt: -1 });

    res.json({ data: list });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});


// ✅ READ ONE
app.get("/gallery/:id", async (req, res) => {
  try {
    const one = await Gallery.findById(req.params.id).populate("rescueTeamId");
    if (!one) return res.status(404).json({ message: "Not Found" });
    res.json({ data: one });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});


// ✅ DELETE (also delete file from folder)
app.delete("/gallery/:id", async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });

    // delete file physically
    const filePath = path.join(__dirname, "public", "uploads", deleted.galleryFile);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed", error: err.message });
  }
});




// ================== PRODUCT CRUD APIs =======================

// ✅ CREATE PRODUCT (Shop adds product)
app.post("/product", upload.single("productPhoto"), async (req, res) => {
  try {
    const { productName, productDetails, productPrice, productStatus, shopId } = req.body;

    if (!productName) return res.status(400).json({ message: "productName required" });
    if (!productDetails) return res.status(400).json({ message: "productDetails required" });
    if (!productPrice) return res.status(400).json({ message: "productPrice required" });
    if (!productStatus) return res.status(400).json({ message: "productStatus required" });
    if (!shopId) return res.status(400).json({ message: "shopId required" });

    const fileName = req.file ? req.file.filename : null;
    if (!fileName) return res.status(400).json({ message: "productPhoto required" });

    const created = await Product.create({
      productName,
      productDetails,
      productPrice: Number(productPrice),
      productStatus,
      productPhoto: fileName,
      shopId,
    });

    res.status(201).json({ message: "Product Created", data: created });
  } catch (err) {
    res.status(500).json({ message: "Create Failed", error: err.message });
  }
});


// ✅ READ ALL PRODUCTS (Admin/all)
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "shopId",
        populate: { path: "placeId", populate: { path: "districtId" } },
      })
      .sort({ createdAt: -1 });

    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});


// ✅ READ PRODUCTS BY SHOP ID (Shop view own products)
app.get("/product/byshop/:shopId", async (req, res) => {
  try {
    const { shopId } = req.params;

    const products = await Product.find({ shopId })
      .sort({ createdAt: -1 });

    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed", error: err.message });
  }
});


// ✅ READ ONE
app.get("/product/:id", async (req, res) => {
  try {
    const one = await Product.findById(req.params.id).populate("shopId");
    if (!one) return res.status(404).json({ message: "Not Found" });
    res.json({ data: one });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});


// ✅ UPDATE PRODUCT (photo optional)
app.put("/product/:id", upload.single("productPhoto"), async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productDetails, productPrice, productStatus } = req.body;

    const old = await Product.findById(id);
    if (!old) return res.status(404).json({ message: "Not Found" });

    const newPhoto = req.file ? req.file.filename : null;

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        productName: productName ?? old.productName,
        productDetails: productDetails ?? old.productDetails,
        productPrice: productPrice ? Number(productPrice) : old.productPrice,
        productStatus: productStatus ?? old.productStatus,
        productPhoto: newPhoto ?? old.productPhoto,
      },
      { new: true }
    );

    // ✅ delete old photo if replaced
    if (newPhoto && old.productPhoto) {
      const oldPath = path.join(__dirname, "public", "uploads", old.productPhoto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
});


// ✅ DELETE PRODUCT (also delete photo)
app.delete("/product/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });

    const filePath = path.join(__dirname, "public", "uploads", deleted.productPhoto);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed", error: err.message });
  }
});


// ================== STOCK APIs =======================

// ✅ CREATE OR UPDATE STOCK for product
app.post("/stock", async (req, res) => {
  try {
    const { productId, stockQuantity, stockStatus } = req.body;

    if (!productId) return res.status(400).json({ message: "productId required" });
    if (stockQuantity === undefined) return res.status(400).json({ message: "stockQuantity required" });
    if (!stockStatus) return res.status(400).json({ message: "stockStatus required" });

    const qty = Number(stockQuantity);
    if (isNaN(qty) || qty < 0) return res.status(400).json({ message: "Invalid stockQuantity" });

    // ✅ upsert (if exists update, else create)
    const updated = await Stock.findOneAndUpdate(
      { productId },
      { stockQuantity: qty, stockStatus },
      { new: true, upsert: true }
    ).populate("productId");

    res.status(201).json({ message: "Stock saved", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Stock save failed", error: err.message });
  }
});


// ✅ GET STOCK BY PRODUCT ID
app.get("/stock/byproduct/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const stock = await Stock.findOne({ productId }).populate("productId");

    res.json({ data: stock }); // can be null if not added yet
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
});


// ✅ UPDATE STOCK (by stockId) optional
app.put("/stock/:id", async (req, res) => {
  try {
    const { stockQuantity, stockStatus } = req.body;

    const qty = Number(stockQuantity);
    if (stockQuantity !== undefined && (isNaN(qty) || qty < 0)) {
      return res.status(400).json({ message: "Invalid stockQuantity" });
    }

    const updated = await Stock.findByIdAndUpdate(
      req.params.id,
      {
        ...(stockQuantity !== undefined ? { stockQuantity: qty } : {}),
        ...(stockStatus !== undefined ? { stockStatus } : {}),
      },
      { new: true }
    ).populate("productId");

    if (!updated) return res.status(404).json({ message: "Stock not found" });

    res.json({ message: "Stock updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});




// ================== ADD TO CART (Booking + Cart) ==================
app.post("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, cartQuantity } = req.body;

    const qty = Number(cartQuantity || 1);

    if (!userId) return res.status(400).json({ success: false, message: "userId required" });
    if (!productId) return res.status(400).json({ success: false, message: "productId required" });
    if (qty <= 0) return res.status(400).json({ success: false, message: "Quantity must be > 0" });

    // 1) get product price
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const total = product.productPrice * qty;

    // 2) find existing active booking for same user + product
    let booking = await Booking.findOne({
      userId,
      productId,
      bookingStatus: "0",
    });

    // 3) if no booking, create booking (required fields)
    if (!booking) {
      const now = new Date();

      booking = await Booking.create({
        bookingFromDate: now,          // ✅ required
        bookingToDate: now,            // ✅ required
        bookingAmount: total,          // ✅ required
        bookingStatus: "0",            // ✅ pending/cart
        productId,
        userId,
      });
    }

    // 4) find cart row for this booking+product
    let cart = await Cart.findOne({
      bookingId: booking._id,
      productId,
    });

    if (cart) {
      // update qty & total
      cart.cartQuantity += qty;
      cart.cartTotal += total;
      await cart.save();

      // update booking amount to cart total
      booking.bookingAmount = cart.cartTotal;
      await booking.save();

      return res.json({
        success: true,
        message: "Cart updated",
        data: { booking, cart },
      });
    }

    // 5) create new cart row
    cart = await Cart.create({
      cartQuantity: qty,
      cartTotal: total,
      productId,
      bookingId: booking._id,
    });

    // keep bookingAmount in sync
    booking.bookingAmount = cart.cartTotal;
    await booking.save();

    return res.json({
      success: true,
      message: "Added to cart",
      data: { booking, cart },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});




// ✅ GET MY CART (active bookings status "0")
app.get("/bookingWithCart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await Booking.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          bookingStatus: "0",
        },
      },
      {
        $lookup: {
          from: "carts",            // ✅ collection name
          localField: "_id",
          foreignField: "bookingId",
          as: "cartItems",
        },
      },
      { $unwind: { path: "$cartItems", preserveNullAndEmptyArrays: false } },
      {
        $lookup: {
          from: "products",         // ✅ collection name
          localField: "cartItems.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },

      // group back to booking with cart items
      {
        $group: {
          _id: "$_id",
          bookingFromDate: { $first: "$bookingFromDate" },
          bookingToDate: { $first: "$bookingToDate" },
          bookingAmount: { $first: "$bookingAmount" },
          bookingStatus: { $first: "$bookingStatus" },
          userId: { $first: "$userId" },
          cartItems: {
            $push: {
              _id: "$cartItems._id",
              productId: "$cartItems.productId",
              cartQuantity: "$cartItems.cartQuantity",
              cartTotal: "$cartItems.cartTotal",
              product: {
                _id: "$productDetails._id",
                productName: "$productDetails.productName",
                productDetails: "$productDetails.productDetails",
                productPhoto: "$productDetails.productPhoto",
                productPrice: "$productDetails.productPrice",
                productStatus: "$productDetails.productStatus",
              },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!data.length) {
      return res.json({
        success: false,
        message: "Cart is empty",
        data: null,
      });
    }

    // ✅ If multiple bookings exist, return all (recommended)
    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});



// ✅ UPDATE CART ITEM QUANTITY
app.put("/cart/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);
    if (!qty || qty < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be >= 1" });
    }

    const cartItem = await Cart.findById(itemId);
    if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

    const product = await Product.findById(cartItem.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    cartItem.cartQuantity = qty;
    cartItem.cartTotal = product.productPrice * qty;
    await cartItem.save();

    // ✅ Update bookingAmount = sum(cartTotal) for this booking
    const totals = await Cart.aggregate([
      { $match: { bookingId: cartItem.bookingId } },
      { $group: { _id: "$bookingId", total: { $sum: "$cartTotal" } } },
    ]);

    const newTotal = totals[0]?.total || 0;

    await Booking.findByIdAndUpdate(cartItem.bookingId, {
      bookingAmount: newTotal,
    });

    return res.json({
      success: true,
      message: "Quantity updated",
      data: cartItem,
      bookingAmount: newTotal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});




// ✅ UPDATE CART ITEM QUANTITY
app.put("/cart/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);
    if (!qty || qty < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be >= 1" });
    }

    const cartItem = await Cart.findById(itemId);
    if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

    const product = await Product.findById(cartItem.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    cartItem.cartQuantity = qty;
    cartItem.cartTotal = product.productPrice * qty;
    await cartItem.save();

    // ✅ Update bookingAmount = sum(cartTotal) for this booking
    const totals = await Cart.aggregate([
      { $match: { bookingId: cartItem.bookingId } },
      { $group: { _id: "$bookingId", total: { $sum: "$cartTotal" } } },
    ]);

    const newTotal = totals[0]?.total || 0;

    await Booking.findByIdAndUpdate(cartItem.bookingId, {
      bookingAmount: newTotal,
    });

    return res.json({
      success: true,
      message: "Quantity updated",
      data: cartItem,
      bookingAmount: newTotal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});



// ✅ PLACE ORDER (bookingStatus: "0" -> "1")
app.put("/booking/placeorder/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.bookingStatus !== "0") {
      return res.status(400).json({
        success: false,
        message: "Only active cart bookings (status 0) can be placed",
      });
    }

    // ✅ recalc total from cart
    const totals = await Cart.aggregate([
      { $match: { bookingId: booking._id } },
      { $group: { _id: "$bookingId", total: { $sum: "$cartTotal" }, count: { $sum: 1 } } },
    ]);

    const totalAmount = totals[0]?.total || 0;
    const itemCount = totals[0]?.count || 0;

    if (itemCount === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    booking.bookingAmount = totalAmount;
    booking.bookingStatus = "1"; // ✅ placed order (go to payment)
    await booking.save();

    res.json({
      success: true,
      message: "Order placed. Proceed to payment.",
      data: booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});



// ✅ GET BOOKING BY ID (for payment page)
app.get("/booking/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});




// ✅ PAYMENT SUBMIT (bookingStatus: "1" -> "2")
app.put("/booking/payment/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentMethod, referenceNo } = req.body; // optional

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.bookingStatus !== "1") {
      return res.status(400).json({
        success: false,
        message: "Payment allowed only for placed orders (status 1)",
      });
    }

    // ✅ Here you can store payment info in another collection if needed,
    // but you asked only status change, so:
    booking.bookingStatus = "2"; // ✅ paid
    await booking.save();

    res.json({ success: true, message: "Payment success. Booking confirmed.", data: booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});