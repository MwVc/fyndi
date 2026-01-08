const db = require("../db");

const createService = async (req, res) => {
  const { title, description, category, location, phone } = req.body;
  const userId = req.user.id; // added by auth middleware

  try {
    const result = await db.query(
      `INSERT INTO services (user_id, title, description, category, location, phone)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `,
      [userId, title, description, category, location, phone]
    );

    res.status(201).json({ service: result.rows[0] });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT services.*, users.full_name, users.email FROM services JOIN users ON services.user_id = users.id ORDER BY services.created_at DESC      
      `);

    res.status(200).json({ services: result.rows });
  } catch (error) {
    console.error("Error fetching services", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `
      SELECT services.*, users.full_name, users.email FROM services JOIN users ON services.user_id = users.id WHERE services.id = $1   
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ service: result.rows[0] });
  } catch (error) {
    console.error("Error fetching service:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const userId = req.user.id;

  try {
    // verify if the service exists and belongs to the user
    const result = await db.query(`SELECT * FROM services WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).res.json({ error: "Service not found" });
    }

    const service = result.rows[0];

    if (service.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this service" });
    }

    // update service
    const updated = await db.query(
      `
      UPDATE services SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *      
      `,
      [title, description, category, id]
    );

    res.status(200).json({
      message: "Service updated successfully",
      service: updated.rows[0],
    });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
};
