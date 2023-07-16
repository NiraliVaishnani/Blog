const Country = require("../models/Country");

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error("Error retrieving countries:", error);
    res.status(500).send("Error retrieving countries.");
  }
};

// Get a specific country by ID
const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      res.json("Country not found");
    } else {
      res.json(country);
    }
  } catch (error) {
    console.error("Error retrieving country:", error);
    res.status(500).send("Error retrieving country.");
  }
};

// Create a new country
const createCountry = async (req, res) => {
  const { name } = req.body;
  try {
    const newCountry = await Country.create({ name });
    res.json(newCountry);
  } catch (error) {
    console.error("Error creating country:", error);
    res.status(500).send("Error creating country.");
  }
};

// Update a country
const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Country.update({ name }, { where: { id } });
    const updatedCountry = await Country.findByPk(id);
    res.json(updatedCountry);
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).send("Error updating country.");
  }
};

// Delete a country
const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    await Country.destroy({ where: { id } });
    res.json("Country deleted successfully.");
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).send("Error deleting country.");
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};
