import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import librosService from "../services/libro.service.js";
import editorialService from "../services/editorial.service.js";

const FormularioLibro = () => {
  const [editoriales, setEditoriales] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { id } = useParams();

  const cargarEditoriales = async () => {
    const editoriales = await editorialService.obtenerTodos();
    setEditoriales(editoriales);
  };

// cambiar
useEffect(() => {
  cargarEditoriales();
  if (id) {
    librosService.obtenerPorId(id).then(libro => {
      if (libro) {
        reset({
          titulo: libro.titulo,
          autor: libro.autor,
          anioPublicacion: libro.anioPublicacion,
          genero: libro.genero,
          isbn: libro.isbn,
          idEditorial: libro.idEditorial,
          copiasVendidas: libro.copiasVendidas,
          puntuacion: libro.puntuacion
        });
      }
    });
  } else {
    reset({
      titulo: "",
      autor: "",
      anioPublicacion: "",
      genero: "",
      isbn: "",
      idEditorial: "",
      copiasVendidas: "",
      puntuacion: ""
    });}
}, [id, reset]);

const validarISBN = async (value) => {
  const isbn = value.replace(/-/g, "").trim();
  if (!/^\d{13}$/.test(isbn)) return "El ISBN debe tener 13 caracteres válidos";

  let suma = 0;
  for (let i = 0; i < 12; i++) {
    const digito = parseInt(isbn[i], 10);
    if (isNaN(digito)) return "El ISBN debe contener solo números";
    suma += (i % 2 === 0) ? digito : digito * 3;
  }
  const digitoVerificador = (10 - (suma % 10)) % 10;
  if (digitoVerificador !== parseInt(isbn[12], 10)) {
    return "El ISBN no es válido según el código verificador";
  }

  return true;
};

  const onSubmit = async (data) => {
    data.idEditorial = Number(data.idEditorial);
    data.anioPublicacion = Number(data.anioPublicacion);
    data.puntuacion = Number(data.puntuacion);
    data.copiasVendidas = Number(data.copiasVendidas);

    setErrorMsg("");
    try {
      if (id) {
        const cleanId = id.replace(":", "");
        await librosService.actualizar(cleanId, data);
      } else {
        await librosService.crear(data);
      }
      navigate("/libros/lista");
    } catch (error) {
      const msg = error?.response?.data?.message || error?.response?.data?.error || "Error inesperado";
      setErrorMsg(msg);
    }
  };

  return (
    <main className="container-fluid mt-5">
      <h3 className="mb-4">{id ? "Editar Libro" : "Nuevo Libro"}</h3>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label>Título:</label>
          <input
            {...register("titulo", { required: "Campo obligatorio" })}
            className="form-control"
          />
          {errors.titulo && <span className="text-danger">{errors.titulo.message}</span>}
        </div>

        <div className="col-md-6">
          <label>Autor:</label>
          <input
            {...register("autor", { required: "Campo obligatorio" })}
            className="form-control"
          />
          {errors.autor && <span className="text-danger">{errors.autor.message}</span>}
        </div>

        <div className="col-md-6">
          <label>Año de Publicación:</label>
          <input
            type="number"
            {...register("anioPublicacion", {
              required: "Campo obligatorio",
              min: { value: 1900, message: "Año inválido" },
              max: { value: new Date().getFullYear(), message: "Año inválido" }
            })}
            className="form-control"
          />
          {errors.anioPublicacion && <span className="text-danger">{errors.anioPublicacion.message}</span>}
        </div>

        <div className="col-md-6">
          <label>Género:</label>
          <input
            {...register("genero", { required: "Campo obligatorio" })}
            className="form-control"
          />
          {errors.genero && <span className="text-danger">{errors.genero.message}</span>}
        </div>

        <div className="col-md-6">
          <label>ISBN:</label>
          <input type="text"
          {...register("isbn", {
            required: "Campo obligatorio",
            validate: validarISBN
          })}
          className="form-control" />
          {errors.isbn && <span className="text-danger">{errors.isbn.message}</span>}
        </div>

                <div className="col-md-6">
          <label>Puntuacion:</label>
          <input type="number"
          {...register("puntuacion", {
            required: "Campo obligatorio",
            min: { value: 0, message: "La puntuacion debe ser mayor a 0"},
            max: { value: 100, message: "La puntuacion debe ser menor a 100"},
          })}
          className="form-control" />
          {errors.puntuacion && <span className="text-danger">{errors.isbn.message}</span>}
        </div>

        <div className="col-md-6">
          <label>Cantidad de copias vendidas:</label>
          <input type="number"
          {...register("copiasVendidas", {
            required: "Campo obligatorio",
            min: { value: 0, message: "La puntuacion debe ser mayor a 0"},
          })}
          className="form-control" />
          {errors.copiasVendidas && <span className="text-danger">{errors.isbn.message}</span>}
        </div>

        <div className="col-md-6">
          <label>Editorial:</label>
          <select
            {...register("idEditorial", { required: "Campo obligatorio" })}
            className="form-select"
          >
            <option value="">Seleccione</option>
            {editoriales.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
          {errors.idEditorial && <span className="text-danger">{errors.idEditorial.message}</span>}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success btn-pink ">Subir</button>
        </div>
      </form>


      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-secondary btn-pink " onClick={() => navigate("/libros/lista")}>Volver a la lista</button>
      </div>
    </main>
  );
};

export default FormularioLibro;