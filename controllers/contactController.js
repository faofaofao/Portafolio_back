const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { email, message } = req.body;
    const newContact = new Contact({ email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
