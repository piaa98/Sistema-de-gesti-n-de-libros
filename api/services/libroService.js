import libroRepository from "../repositories/libroRepository.js";

class libroService {
  async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
    return await libroRepository.obtenerTodos({ pagina, limite });
  }

  async obtenerPorId(id) {
    return await libroRepository.obtenerPorId(id);
  }

async crear(datos) {
  this.#validarAño1900_hoy(datos.anioPublicacion);
  this.#validarCopiasVendidas(datos.copiasVendidas)
  this.#validarPuntuacion(datos.puntuacion)
  await this.#validarISBNUnico(datos.isbn, null);
  return await libroRepository.crear({ ...datos });
}

async actualizar(id, datos) {
  this.#validarAño1900_hoy(datos.anioPublicacion);
  this.#validarCopiasVendidas(datos.copiasVendidas)
  this.#validarPuntuacion(datos.puntuacion)
  await this.#validarISBNUnico(datos.isbn, id);
  const actualizado = await libroRepository.actualizar(id, { ...datos });
  return actualizado;
}

  async eliminar(id) {
    return await libroRepository.eliminar(id);
  }

  async buscarFiltrado(filtros) {
    return await libroRepository.buscarFiltrado(filtros);
  }

  async contarFiltrado(filtros) {
    return await libroRepository.contarFiltrado(filtros);
  }

  async obtenerISBN(isbn) {
    return await libroRepository.obtenerISBN(isbn)
  }

  async obtenerTodosSinFiltro() {
  return await libroRepository.obtenerTodosSinFiltro();
  } 

  // 🧪 Validaciones
    async #validarISBNUnico(isbn, idActual = null) {
      // sacar guiones y espacios
      const limpio = String(isbn).replace(/[-\s]/g, '');

      // 13 caracteres y todos dígitos
      const esFormatoValido = /^\d{13}$/.test(limpio);
      if (!esFormatoValido) {
        throw new Error('El ISBN debe tener 13 dígitos numéricos.');
      }

      // Calcular el dígito verificador del ISBN-13
      let suma = 0;
      for (let i = 0; i < 12; i++) {
        const digito = parseInt(limpio[i], 10);
        if (i % 2 === 0) {
          suma += digito; // posiciones pares: sumar directo
        } else {
          suma += digito * 3; // posiciones impares: multiplicar por 3
        }
      }

      // modulo de 10 de suma para obtener el numero mas cercano de 10 -> 93 % 10 = 3
      // resto 10 para saber cuanto falta para llegar a 10 -> 10 - 3 = 7
      // vuelvo a hacer modulo de 10 por si es cero ->  (10 - 0) % 10 = 0
      const digitoD10 = (10 - (suma % 10)) % 10;

      // comparo el ultimo digito con el calculado
      const ultimoDigito = parseInt(limpio[12], 10);
      if (digitoD10 !== ultimoDigito) {
        throw new Error('El ISBN no es válido según el código verificador.');
      }

      // si el ISBN ya existe en la base (salvo que sea el mismo libro)
      const libroExistente = await libroRepository.obtenerISBN(isbn);
      console.log('idActual:', idActual, 'libroExistente.id:', libroExistente?.id);
      const libro = libroExistente && libroExistente.id === idActual;
      if (libroExistente && !libro) {
        throw new Error(`Ya existe un libro con el ISBN "${isbn}".`);
      }
    }
    
    #validarAño1900_hoy(añoPublicacion) {
      const añoActual = new Date().getFullYear();
      if (añoPublicacion < 1900 || añoPublicacion > añoActual) {
        throw new Error(`El año de publicación debe estar entre 1900 y ${añoActual}.`);
      }
    }

    #validarPuntuacion(puntuacion) {
      if (puntuacion < 0 || puntuacion > 100) {
      throw new Error("La puntuación debe estar entre 0 y 100.");
      }
    }

    #validarCopiasVendidas(copiasVendidas) {
      if (copiasVendidas < 0) {
      throw new Error("Las copias vendidas deben ser un número mayor o igual a cero.");
      }
    }

  }



export default new libroService();
