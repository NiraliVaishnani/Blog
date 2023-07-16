const State = require("../models/State");

// Get all states
const getAllStates = async (req, res) => {
  const states = await State.findAll();
  res.json(states);
};

// Get a specific state by ID
const getStateById = async (req, res) => {
  const state = await State.findByPk(req.params.id);
  if (!state) {
    res.status(404).json({ error: "State not found" });
  } else {
    res.json(state);
  }
};

// Create a new state
const createState = async (req, res) => {
  const { name, countryId } = req.body;
  try {
    const newState = await State.create({ name, countryId });
    res.status(201).json(newState);
  } catch (error) {
    console.error("Error creating state:", error);
    res.status(500).send("Error creating state.");
  }
};

// Update a state
const updateState = async (req, res) => {
  const { name, countryId } = req.body;
  const id = req.params.id;
  try {
    const state = await State.findByPk(id);
    if (!state) {
      res.status(404).json({ error: "State not found" });
    } else {
      await state.update({ name, countryId });
      res.json(state);
    }
  } catch (error) {
    console.error("Error updating state:", error);
    res.status(500).send("Error updating state.");
  }
};

// Delete a state
const deleteState = async (req, res) => {
  const id = req.params.id;
  try {
    const state = await State.findByPk(id);
    if (!state) {
      res.status(404).json({ error: "State not found" });
    } else {
      await state.destroy();
      res.json("State deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting state:", error);
    res.status(500).send("Error deleting state.");
  }
};

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState,
};
