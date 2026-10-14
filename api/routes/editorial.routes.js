import express from "express";
import editorialService from "../services/editorialService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const plataformas = await editorialService.obtenerTodas();
    res.json(plataformas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

