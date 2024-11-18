import React, { useEffect, useState } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Table.css";

const Table = () => {
  // State variables for managing contacts, loading status, errors, modals, and form data
  const [contacts, setContacts] = useState([]); // Stores the list of contacts
  const [loading, setLoading] = useState(true); // Loading spinner visibility
  const [error, setError] = useState(null); // Error handling
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [modalType, setModalType] = useState(""); // Type of modal (add/edit/delete)
  const [selectedContact, setSelectedContact] = useState(null); // Stores the contact selected for editing or deleting
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" }); // Form data for contact
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [sortField, setSortField] = useState("name"); // Field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Order of sorting
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" }); // Validation errors

  // Fetch contacts from localStorage or external API on component mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      // Load contacts from localStorage if available
      setContacts(storedContacts);
      setLoading(false);
    } else {
      // Fetch contacts from external API if not in localStorage
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch contacts");
          }
          return response.json();
        })
        .then((data) => {
          setContacts(data); // Save fetched contacts to state
          setLoading(false);
          localStorage.setItem("contacts", JSON.stringify(data)); // Store in localStorage
        })
        .catch((err) => {
          setError(err.message); // Handle fetch errors
          setLoading(false);
        });
    }
  }, []);

  // Helper function to save contacts to localStorage
  const saveToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  // Validates the form fields before saving
  const validateForm = () => {
    let valid = true;
    let tempErrors = { name: "", email: "", phone: "" };

    if (!formData.name) {
      tempErrors.name = "Name is required!";
      valid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required!";
      valid = false;
    }

    if (!formData.phone) {
      tempErrors.phone = "Phone number is required!";
      valid = false;
    }

    setErrors(tempErrors); // Set validation errors
    return valid; // Return validation status
  };

  // Saves a new or updated contact
  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors!");
      return;
    }

    let updatedContacts;
    if (modalType === "add") {
      // Add a new contact
      const newContact = { id: contacts.length + 1, ...formData };
      updatedContacts = [...contacts, newContact];
      toast.success("Contact added successfully!");
    } else if (modalType === "edit") {
      // Edit an existing contact
      updatedContacts = contacts.map((contact) =>
        contact.id === selectedContact.id
          ? { ...contact, ...formData }
          : contact
      );
      toast.success("Contact updated successfully!");
    }

    setContacts(updatedContacts); // Update the contact list
    saveToLocalStorage(updatedContacts); // Save to localStorage
    setShowModal(false); // Close the modal
    setFormData({ name: "", email: "", phone: "" }); // Reset form data
  };

  // Deletes a selected contact
  const handleDelete = () => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== selectedContact.id
    );
    setContacts(updatedContacts); // Update the contact list
    saveToLocalStorage(updatedContacts); // Save to localStorage
    setShowModal(false); // Close the modal
    toast.error("Contact deleted successfully!");
  };

  // Filters contacts based on the search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorts contacts based on selected field and order
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="table-container">
      <h2 className="header">Contact List Interface</h2>
      <div className="controls">
        {/* Search input */}
        <TextField
          label="Search Contacts"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div>
          {/* Dropdown for selecting sort field */}
          <Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            size="small"
            className="sort-select"
          >
            <MenuItem value="name">Sort by Name</MenuItem>
            <MenuItem value="email">Sort by Email</MenuItem>
            <MenuItem value="phone">Sort by Phone</MenuItem>
          </Select>
          {/* Dropdown for selecting sort order */}
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            size="small"
            className="sort-select"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </div>
        {/* Button to add a new contact */}
        <Button
          variant="contained"
          color="primary"
          className="add-btn"
          onClick={() => {
            setModalType("add");
            setFormData({ name: "", email: "", phone: "" });
            setShowModal(true);
          }}
        >
          Add Contact
        </Button>
      </div>

      {/* Loading spinner */}
      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : (
        <div className="table-scroll">
          {/* Table displaying sorted and filtered contacts */}
          <MUITable className="table">
            <TableHead className="sticky-header">
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Phone</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    {/* Edit button */}
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedContact(contact);
                        setFormData(contact);
                        setModalType("edit");
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    {/* Delete button */}
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        setSelectedContact(contact);
                        setModalType("delete");
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MUITable>
        </div>
      )}

      {/* Modal for adding, editing, or deleting contacts */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle class="modalheading">
          {modalType === "add"
            ? "Add Contact"
            : modalType === "edit"
            ? "Edit Contact"
            : "Delete Contact"}
        </DialogTitle>
        <DialogContent>
          {modalType !== "delete" ? (
            <>
              {/* Input fields for adding/editing contact */}
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Email"
                fullWidth
                margin="dense"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Phone"
                fullWidth
                margin="dense"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </>
          ) : (
            <p>Are you sure you want to delete this contact?</p>
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          {/* Save/Delete button */}
          {modalType !== "delete" && (
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          )}
          {modalType === "delete" && (
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          )}
          {/* Cancel button */}
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Table;
