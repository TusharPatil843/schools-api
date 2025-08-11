// controllers/schoolsController.js
const { addSchool, getAllSchools } = require('../models/schoolModel');
const { haversineDistance } = require('../utils/distance');

async function addSchoolHandler(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;
    const result = await addSchool({ name, address, latitude, longitude });
    return res.status(201).json({ success: true, message: 'School added', data: { id: result.id } });
  } catch (err) {
    console.error('addSchool error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function listSchoolsHandler(req, res) {
  try {
    const userLat = parseFloat(req.query.lat);
    const userLon = parseFloat(req.query.lon);
    const rows = await getAllSchools();

    const withDistance = rows.map((r) => ({
      id: r.id,
      name: r.name,
      address: r.address,
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      distance_km: Number(haversineDistance(userLat, userLon, Number(r.latitude), Number(r.longitude)).toFixed(3)),
    }));

    withDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.json({ success: true, data: withDistance });
  } catch (err) {
    console.error('listSchools error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = { addSchoolHandler, listSchoolsHandler };
