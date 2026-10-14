import express from "express";
import libroService from "../services/libroService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { pagina, limite } = req.query;
    const libros = await libroService.obtenerTodos({ pagina, limite });
    res.json(libros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  router.get("/todos", async (req, res) => {
    try {
      const libros = await libroService.obtenerTodosSinFiltro();
      res.json(libros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.post("/", async (req, res) => {
  try {
    const libroCreado = await libroService.crear(req.body);
    res.status(201).json(libroCreado);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      errors: err.errors || {}
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const libroActualizado = await libroService.actualizar(parseInt(req.params.id), req.body);
    res.json(libroActualizado);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      errors: err.errors || {}
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await libroService.eliminar(parseInt(req.params.id));
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Filtrado
router.get("/filtrar", async (req, res) => {
  try {
    const libros = await libroService.buscarFiltrado(req.query);
    res.json(libros);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/filtrar/contar", async (req, res) => {
  try {
    const cantidad = await libroService.contarFiltrado(req.query);
    res.json({ cantidad });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const libro = await libroService.obtenerPorId(parseInt(req.params.id));
    if (!libro) return res.status(404).json({ error: "libro no encontrado." });
    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

