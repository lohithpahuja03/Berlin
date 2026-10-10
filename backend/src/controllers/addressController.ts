import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { db } from '../models/db.js';

export const getAddresses = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }
  const addresses = db.getAddressesByUserId(req.user.id);
  res.json({ success: true, addresses });
};

export const addAddress = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const { name, phone, houseFlat, street, area, city, state, pincode, deliveryInstructions, isDefault } = req.body;

  if (!name || !phone || !houseFlat || !street || !city || !pincode) {
    res.status(400).json({ success: false, error: 'Please provide all required address fields.' });
    return;
  }

  const existingCount = db.getAddressesByUserId(req.user.id).length;

  const newAddress = db.createAddress({
    id: uuidv4(),
    userId: req.user.id,
    name: name.trim(),
    phone: phone.trim(),
    houseFlat: houseFlat.trim(),
    street: street.trim(),
    area: area ? area.trim() : '',
    city: city.trim(),
    state: state ? state.trim() : '',
    pincode: pincode.trim(),
    deliveryInstructions: deliveryInstructions?.trim(),
    isDefault: existingCount === 0 ? true : Boolean(isDefault),
    latitude: 28.4800 + Math.random() * 0.02,
    longitude: 77.0800 + Math.random() * 0.02,
  });

  res.status(201).json({ success: true, address: newAddress });
};

export const updateAddress = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = db.getAddressById(id);
  if (!existing || existing.userId !== req.user.id) {
    res.status(404).json({ success: false, error: 'Address not found.' });
    return;
  }

  const updated = db.updateAddress(id, req.body);
  res.json({ success: true, address: updated });
};

export const deleteAddress = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const deleted = db.deleteAddress(id, req.user.id);
  if (!deleted) {
    res.status(404).json({ success: false, error: 'Address not found or unauthorized.' });
    return;
  }

  res.json({ success: true, message: 'Address removed successfully.' });
};
