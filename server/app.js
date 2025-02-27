import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import unitsRouters from "./routes/unitsRoutes.js";
import bodyParser from "body-parser";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

dotenv.config();
const app = express();
const port = process.env.port || 3000;

//middlewares
app.use(
  cors({
    origin: "https://book-nest-71u9.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/units", unitsRouters);
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log("prd", products);

  try {
    const lineItems = products.map((product) => {
      if (!product.pricing || typeof product.pricing.basePrice !== "number") {
        throw new Error("Invalid basePrice value");
      }

      return {
        price_data: {
          currency: product.pricing.currency || "USD", // Default currency
          product_data: { name: product.name || "Unknown Product" },
          unit_amount: Math.round(product.pricing.basePrice * 100), // Ensure a valid integer
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems, // Correct key
      mode: "payment",
      success_url:
        "https://book-nest-71u9.vercel.app/customer/dashboard/product-details/success",
      cancel_url:
        "https://book-nest-71u9.vercel.app/customer/dashboard/product-details/cancel",
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

connectDB().then(() => {
  app.listen(port, (err) => {
    if (err) {
      console.error("Error starting the server:", err);
    } else console.log(`App is running on http://localhost:${port}`);
  });
});
