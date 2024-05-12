const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const { Op } = require("sequelize");

console.log("inside gigs route");

router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.findAll();
    // console.log(gigs);
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
  // const data = {
  //   title: "Looking for a react dev",
  //   technologies: "react js, javascript, html, css",
  //   budget: "$3000",
  //   description: "Hey get hired",
  //   contact_email: "faraz.mobin17@gmail.com",
  // };
  let { title, budget, contact_email, description, technologies } = req.body;
  let errors = [];
  if (!title || !budget || !contact_email || !description || !technologies) {
    errors.push({ message: "All info is required" });
  }
  if (errors.length > 0) {
    res.render("add", {
      errors,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$ ${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ",");

    try {
      const gigs = await Gig.create({
        title,
        budget,
        contact_email,
        description,
        technologies,
      });
      if (!gigs || gigs.length === 0) {
        throw new Error("data not added");
      }
      return res.render("gigs", {
        gigs,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/search", async (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();
  try {
    const gigs = await Gig.findAll({
      where: {
        technologies: {
          [Op.like]: `%${term}%`,
        },
      },
    });
    if (!gigs || gigs.length === 0) {
      throw new Error("no search term found");
    }
    return res.render("gigs", { gigs });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
