import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

const emptyStudent = {
  firstName: '',
  lastName: '',
  rollNo: '',
  password: '',
  confirmPassword: '',
  contactNumber: '',
};

const emptyBook = {
  bookName: '',
  isbnNo: '',
  bookTitle: '',
  authorName: '',
  publisherName: '',
};

const emptyEmployee = {
  employeeName: '',
  employeeId: '',
  departmentName: '',
  phoneNumber: '',
  joiningDate: '',
};

const modules = [
  {
    key: 'students',
    title: 'Student Registration System',
    subtitle:
      'Register students, search them by roll number, update records, and display the latest details in a table.',
    endpoint: '/api/students',
    identifierKey: 'rollNo',
    identifierLabel: 'Roll No / ID',
    entityLabel: 'Student',
    emptyForm: emptyStudent,
    fields: [
      { key: 'firstName', label: 'First Name', type: 'text' },
      { key: 'lastName', label: 'Last Name', type: 'text' },
      { key: 'rollNo', label: 'Roll No / ID', type: 'text' },
      { key: 'password', label: 'Password', type: 'password' },
      { key: 'confirmPassword', label: 'Confirm Password', type: 'password' },
      { key: 'contactNumber', label: 'Contact Number', type: 'tel' },
    ],
    tableColumns: ['firstName', 'lastName', 'rollNo', 'contactNumber'],
  },
  {
    key: 'books',
    title: 'Library Management System',
    subtitle:
      'Maintain book records using ISBN-based CRUD operations for insertion, correction, deletion, and tabular display.',
    endpoint: '/api/books',
    identifierKey: 'isbnNo',
    identifierLabel: 'ISBN No',
    entityLabel: 'Book',
    emptyForm: emptyBook,
    fields: [
      { key: 'bookName', label: 'Book Name', type: 'text' },
      { key: 'isbnNo', label: 'ISBN No', type: 'text' },
      { key: 'bookTitle', label: 'Book Title', type: 'text' },
      { key: 'authorName', label: 'Author Name', type: 'text' },
      { key: 'publisherName', label: 'Publisher Name', type: 'text' },
    ],
    tableColumns: ['bookName', 'isbnNo', 'bookTitle', 'authorName', 'publisherName'],
  },
  {
    key: 'employees',
    title: 'Employee Management System',
    subtitle:
      'Add, search, update, delete, and review employee records with department and joining-date details.',
    endpoint: '/api/employees',
    identifierKey: 'employeeId',
    identifierLabel: 'Employee ID',
    entityLabel: 'Employee',
    emptyForm: emptyEmployee,
    fields: [
      { key: 'employeeName', label: 'Employee Name', type: 'text' },
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'departmentName', label: 'Department Name', type: 'text' },
      { key: 'phoneNumber', label: 'Phone Number', type: 'tel' },
      { key: 'joiningDate', label: 'Joining Date', type: 'date' },
    ],
    tableColumns: [
      'employeeName',
      'employeeId',
      'departmentName',
      'phoneNumber',
      'joiningDate',
    ],
  },
];

function App() {
  const [activeKey, setActiveKey] = useState(modules[0].key);
  const [records, setRecords] = useState({
    students: [],
    books: [],
    employees: [],
  });
  const [forms, setForms] = useState({
    students: emptyStudent,
    books: emptyBook,
    employees: emptyEmployee,
  });
  const [searchValues, setSearchValues] = useState({
    students: '',
    books: '',
    employees: '',
  });
  const [status, setStatus] = useState({
    students: { type: 'idle', message: '' },
    books: { type: 'idle', message: '' },
    employees: { type: 'idle', message: '' },
  });
  const [loading, setLoading] = useState({
    students: false,
    books: false,
    employees: false,
  });

  const activeModule = useMemo(
    () => modules.find((item) => item.key === activeKey),
    [activeKey]
  );

  const requestJson = useCallback(async (url, options = {}) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
      throw new Error(payload?.message || 'Request failed.');
    }

    return payload;
  }, []);

  const fetchRecords = useCallback(async (moduleConfig) => {
    setLoading((current) => ({ ...current, [moduleConfig.key]: true }));

    try {
      const data = await requestJson(moduleConfig.endpoint);
      setRecords((current) => ({ ...current, [moduleConfig.key]: data }));
    } catch (error) {
      setModuleStatus(moduleConfig.key, 'error', error.message);
    } finally {
      setLoading((current) => ({ ...current, [moduleConfig.key]: false }));
    }
  }, [requestJson]);

  useEffect(() => {
    modules.forEach((moduleConfig) => {
      fetchRecords(moduleConfig);
    });
  }, [fetchRecords]);

  function setModuleStatus(moduleKey, type, message) {
    setStatus((current) => ({
      ...current,
      [moduleKey]: { type, message },
    }));
  }

  function updateForm(moduleKey, field, value) {
    setForms((current) => ({
      ...current,
      [moduleKey]: { ...current[moduleKey], [field]: value },
    }));
  }

  function resetForm(moduleConfig) {
    setForms((current) => ({
      ...current,
      [moduleConfig.key]: moduleConfig.emptyForm,
    }));
  }

  async function handleCreate(moduleConfig, event) {
    event.preventDefault();
    const form = forms[moduleConfig.key];

    try {
      if (
        moduleConfig.key === 'students' &&
        form.password !== form.confirmPassword
      ) {
        throw new Error('Password and confirm password must match.');
      }

      await requestJson(moduleConfig.endpoint, {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setModuleStatus(
        moduleConfig.key,
        'success',
        `${moduleConfig.entityLabel} inserted successfully.`
      );
      resetForm(moduleConfig);
      await fetchRecords(moduleConfig);
    } catch (error) {
      setModuleStatus(moduleConfig.key, 'error', error.message);
    }
  }

  async function handleSearch(moduleConfig) {
    const searchValue = searchValues[moduleConfig.key].trim();

    if (!searchValue) {
      setModuleStatus(
        moduleConfig.key,
        'error',
        `Enter ${moduleConfig.identifierLabel} to search.`
      );
      return;
    }

    try {
      const data = await requestJson(`${moduleConfig.endpoint}/${searchValue}`);
      setForms((current) => ({
        ...current,
        [moduleConfig.key]: { ...moduleConfig.emptyForm, ...data },
      }));
      setModuleStatus(
        moduleConfig.key,
        'success',
        `${moduleConfig.entityLabel} loaded for editing.`
      );
    } catch (error) {
      setModuleStatus(moduleConfig.key, 'error', error.message);
    }
  }

  async function handleUpdate(moduleConfig) {
    const form = forms[moduleConfig.key];
    const identifierValue = form[moduleConfig.identifierKey]?.trim();

    if (!identifierValue) {
      setModuleStatus(
        moduleConfig.key,
        'error',
        `${moduleConfig.identifierLabel} is required for update.`
      );
      return;
    }

    try {
      if (
        moduleConfig.key === 'students' &&
        form.password !== form.confirmPassword
      ) {
        throw new Error('Password and confirm password must match.');
      }

      await requestJson(`${moduleConfig.endpoint}/${identifierValue}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setModuleStatus(
        moduleConfig.key,
        'success',
        `${moduleConfig.entityLabel} updated successfully.`
      );
      await fetchRecords(moduleConfig);
    } catch (error) {
      setModuleStatus(moduleConfig.key, 'error', error.message);
    }
  }

  async function handleDelete(moduleConfig, identifierValue) {
    try {
      await requestJson(`${moduleConfig.endpoint}/${identifierValue}`, {
        method: 'DELETE',
      });
      setModuleStatus(
        moduleConfig.key,
        'success',
        `${moduleConfig.entityLabel} deleted successfully.`
      );

      if (forms[moduleConfig.key][moduleConfig.identifierKey] === identifierValue) {
        resetForm(moduleConfig);
      }

      await fetchRecords(moduleConfig);
    } catch (error) {
      setModuleStatus(moduleConfig.key, 'error', error.message);
    }
  }

  function handleRowSelect(moduleConfig, record) {
    setForms((current) => ({
      ...current,
      [moduleConfig.key]: { ...moduleConfig.emptyForm, ...record },
    }));
    setSearchValues((current) => ({
      ...current,
      [moduleConfig.key]: record[moduleConfig.identifierKey],
    }));
    setActiveKey(moduleConfig.key);
    setModuleStatus(
      moduleConfig.key,
      'success',
      `${moduleConfig.entityLabel} record loaded from the table.`
    );
  }

  return (
    <div className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Assignment 7 | MERN CRUD Suite</p>
        <h1>Student, library, and employee records in one full stack dashboard.</h1>
        <p className="hero-copy">
          Each module supports insert, search, update, delete, and tabular display
          using a shared React interface and MongoDB-backed Express APIs.
        </p>
      </section>

      <section className="tab-bar" aria-label="Management modules">
        {modules.map((moduleConfig) => (
          <button
            key={moduleConfig.key}
            type="button"
            className={`tab-chip ${
              activeKey === moduleConfig.key ? 'tab-chip-active' : ''
            }`}
            onClick={() => setActiveKey(moduleConfig.key)}
          >
            {moduleConfig.title}
          </button>
        ))}
      </section>

      <section className="workspace">
        <article className="module-card">
          <div className="module-header">
            <div>
              <p className="module-kicker">{activeModule.entityLabel} CRUD</p>
              <h2>{activeModule.title}</h2>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                resetForm(activeModule);
                setModuleStatus(activeModule.key, 'idle', '');
              }}
            >
              Clear Form
            </button>
          </div>

          <p className="module-copy">{activeModule.subtitle}</p>

          <div className="search-strip">
            <input
              value={searchValues[activeModule.key]}
              onChange={(event) =>
                setSearchValues((current) => ({
                  ...current,
                  [activeModule.key]: event.target.value,
                }))
              }
              placeholder={`Search by ${activeModule.identifierLabel}`}
            />
            <button type="button" onClick={() => handleSearch(activeModule)}>
              Search Record
            </button>
          </div>

          {status[activeModule.key].message ? (
            <div className={`status-banner ${status[activeModule.key].type}`}>
              {status[activeModule.key].message}
            </div>
          ) : null}

          <form
            className="form-grid"
            onSubmit={(event) => handleCreate(activeModule, event)}
          >
            {activeModule.fields.map((field) => (
              <label className="field" key={field.key}>
                <span>{field.label}</span>
                <input
                  type={field.type}
                  value={forms[activeModule.key][field.key]}
                  onChange={(event) =>
                    updateForm(activeModule.key, field.key, event.target.value)
                  }
                  required
                />
              </label>
            ))}

            <div className="action-row">
              <button type="submit">Insert Record</button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => handleUpdate(activeModule)}
              >
                Update Record
              </button>
            </div>
          </form>
        </article>

        <article className="table-card">
          <div className="table-header">
            <div>
              <p className="module-kicker">Live Records</p>
              <h2>{activeModule.title} Table</h2>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => fetchRecords(activeModule)}
            >
              {loading[activeModule.key] ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {activeModule.fields.map((field) => (
                    <th key={field.key}>{field.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records[activeModule.key].length === 0 ? (
                  <tr>
                    <td colSpan={activeModule.fields.length + 1} className="empty-cell">
                      No records available yet.
                    </td>
                  </tr>
                ) : (
                  records[activeModule.key].map((record) => (
                    <tr key={record._id}>
                      {activeModule.fields.map((field) => (
                        <td key={field.key}>{record[field.key]}</td>
                      ))}
                      <td className="table-actions">
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() => handleRowSelect(activeModule, record)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger-button"
                          onClick={() =>
                            handleDelete(
                              activeModule,
                              record[activeModule.identifierKey]
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}

export default App;
