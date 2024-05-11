const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");

router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.findAll();
    if (!gigs || gigs.length === 0) {
      throw new Error("gigs not found");
    }
    return res.render("gigs", {
      gigs,
    });
  } catch (error) {
    console.log(error);
  }
});

// display view
router.get("/add", (req, res) => res.render("add"));
router.post("/add", async (req, res) => {
  const data = {
    title: "Looking for a react dev",
    technologies: "react js, javascript, html, css",
    budget: "$3000",
    description: "Hey get hired",
    contact_email: "faraz.mobin17@gmail.com",
  };
  const { title, budget, contact_email, description, technologies } = data;
  const errors = [];
  if (!title || !budget || !contact_email || !description || !technologies) {
    errors.push({ message: "All info is required" });
  }
  if (errors.length > 0) {
    res.render("add", {
      errors,
    });
  } else {
    try {
      const rows = await Gig.create({
        title,
        budget,
        contact_email,
        description,
        technologies,
      });
      if (!rows || rows.length === 0) {
        throw new Error("data not added");
      }
      return res.status(200).json({ data: rows });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
