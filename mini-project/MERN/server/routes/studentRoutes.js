const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Create a new student
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, rollId, password, contactNumber } = req.body;

    // Validation for unique rollId is handled by Mongoose Schema unique: true,
    // but catching it specifically helps send a better response.
    const existingStudent = await Student.findOne({ rollId });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this Roll ID already exists" });
    }

    const newStudent = new Student({
      firstName,
      lastName,
      rollId,
      password, // Note: In a real app, hash this with bcrypt
      contactNumber,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error: error.message });
  }
});

// Read all students
router.get("/", async (req, res) => {
  try {
    // Excluding passwords from the response
    const students = await Student.find().select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// Read one student by rollId
router.get("/:rollId", async (req, res) => {
  try {
    const student = await Student.findOne({ rollId: req.params.rollId }).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
});

// Update student by rollId (only contactNumber as per requirements, but allowing others just in case)
router.put("/:rollId", async (req, res) => {
  try {
    const { contactNumber } = req.body;
    
    // The requirement specified "modify contactNumber", so we focus on that
    const updatedStudent = await Student.findOneAndUpdate(
      { rollId: req.params.rollId },
      { $set: { contactNumber } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
});

// Delete student by rollId
router.delete("/:rollId", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ rollId: req.params.rollId });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

module.exports = router;
