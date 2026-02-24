
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const port = 5000



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
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
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
