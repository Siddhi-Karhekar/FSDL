const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/assignment7';

app.use(cors());
app.use(express.json());

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    confirmPassword: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true, trim: true },
    isbnNo: { type: String, required: true, unique: true, trim: true },
    bookTitle: { type: String, required: true, trim: true },
    authorName: { type: String, required: true, trim: true },
    publisherName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const employeeSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true, trim: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    departmentName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    joiningDate: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

studentSchema.pre('validate', function syncStudentPasswords() {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match');
  }
});

const Student = mongoose.model('Student', studentSchema);
const Book = mongoose.model('Book', bookSchema);
const Employee = mongoose.model('Employee', employeeSchema);

function normalizeDuplicateKey(error, uniqueFieldLabel) {
  if (error?.code === 11000) {
    return { status: 409, message: `${uniqueFieldLabel} already exists.` };
  }

  if (error?.name === 'ValidationError') {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ');
    return { status: 400, message };
  }

  console.error('Unhandled server error:', error);
  return { status: 500, message: error?.message || 'Something went wrong on the server.' };
}

function createCrudRouter(Model, config) {
  const router = express.Router();
  const { uniqueKey, uniqueFieldLabel, updateValidator } = config;

  router.get('/', async (_req, res) => {
    const records = await Model.find().sort({ createdAt: -1 });
    res.json(records);
  });

  router.get(`/:${uniqueKey}`, async (req, res) => {
    const record = await Model.findOne({ [uniqueKey]: req.params[uniqueKey] });

    if (!record) {
      return res.status(404).json({ message: `${config.entityName} not found.` });
    }

    return res.json(record);
  });

  router.post('/', async (req, res) => {
    console.log(`POST ${config.entityName} body:`, req.body);
    try {
      const record = new Model(req.body);
      await record.save();
      res.status(201).json(record);
    } catch (error) {
      const handled = normalizeDuplicateKey(error, uniqueFieldLabel);
      res.status(handled.status).json({ message: handled.message });
    }
  });

  router.put(`/:${uniqueKey}`, async (req, res) => {
    try {
      if (updateValidator) {
        updateValidator(req.body);
      }

      const record = await Model.findOne({ [uniqueKey]: req.params[uniqueKey] });

      if (!record) {
        return res.status(404).json({ message: `${config.entityName} not found.` });
      }

      Object.assign(record, req.body);
      await record.save();

      return res.json(record);
    } catch (error) {
      const handled = normalizeDuplicateKey(error, uniqueFieldLabel);
      return res.status(handled.status).json({ message: handled.message });
    }
  });

  router.delete(`/:${uniqueKey}`, async (req, res) => {
    const deleted = await Model.findOneAndDelete({
      [uniqueKey]: req.params[uniqueKey],
    });

    if (!deleted) {
      return res.status(404).json({ message: `${config.entityName} not found.` });
    }

    return res.json({ message: `${config.entityName} deleted successfully.` });
  });

  return router;
}

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use(
  '/api/students',
  createCrudRouter(Student, {
    entityName: 'Student',
    uniqueKey: 'rollNo',
    uniqueFieldLabel: 'Roll No / ID',
  })
);

app.use(
  '/api/books',
  createCrudRouter(Book, {
    entityName: 'Book',
    uniqueKey: 'isbnNo',
    uniqueFieldLabel: 'ISBN No',
  })
);

app.use(
  '/api/employees',
  createCrudRouter(Employee, {
    entityName: 'Employee',
    uniqueKey: 'employeeId',
    uniqueFieldLabel: 'Employee ID',
  })
);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB.');
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
