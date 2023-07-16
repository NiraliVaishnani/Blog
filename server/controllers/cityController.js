const City = require("../models/City");

// Get all cities
const getAllCities = async (req, res) => {
  const cities = await City.findAll();
  res.json(cities);
};

// Get a specific city by ID
const getCityById = async (req, res) => {
  const city = await City.findByPk(req.params.id);
  if (!city) {
    res.status(404).json({ error: "City not found" });
  } else {
    res.json(city);
  }
};

// Create a new city
const createCity = async (req, res) => {
  const { name, stateId } = req.body;
  try {
    const newCity = await City.create({ name, stateId });
    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).send("Error creating city.");
  }
};

// Update a city
const updateCity = async (req, res) => {
  const { name, stateId } = req.body;
  const id = req.params.id;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ error: "City not found" });
    } else {
      await city.update({ name, stateId });
      res.json(city);
    }
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).send("Error updating city.");
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  const id = req.params.id;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ error: "City not found" });
    } else {
      await city.destroy();
      res.json("City deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).send("Error deleting city.");
  }
};

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
};
