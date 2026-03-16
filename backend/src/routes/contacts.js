const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

const VALID_STATUSES = ['lead', 'active', 'inactive'];

// GET /api/contacts
router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contacts/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM contacts WHERE id = $1',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/contacts
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactStatus = status || 'lead';
    if (!VALID_STATUSES.includes(contactStatus)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
      });
    }

    const { rows } = await pool.query(
      `INSERT INTO contacts (name, email, phone, company, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name.trim(), email || null, phone || null, company || null, contactStatus]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/contacts/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
      });
    }

    // Check if contact exists
    const existing = await pool.query(
      'SELECT * FROM contacts WHERE id = $1',
      [req.params.id]
    );
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const current = existing.rows[0];
    const updatedName = name !== undefined ? name.trim() : current.name;
    const updatedEmail = email !== undefined ? (email || null) : current.email;
    const updatedPhone = phone !== undefined ? (phone || null) : current.phone;
    const updatedCompany = company !== undefined ? (company || null) : current.company;
    const updatedStatus = status !== undefined ? status : current.status;

    const { rows } = await pool.query(
      `UPDATE contacts
       SET name = $1, email = $2, phone = $3, company = $4, status = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [updatedName, updatedEmail, updatedPhone, updatedCompany, updatedStatus, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
