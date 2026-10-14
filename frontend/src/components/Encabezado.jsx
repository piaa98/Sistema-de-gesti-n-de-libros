import { NavLink } from 'react-router-dom';

export default function Encabezado() {
    return (
        <header className="bg-gradient bg-pink text-white py-4 mb-4 shadow">
            <div className="container-fluid position-relative">
                <h1 className="fw-bold text-center mb-4" style={{ letterSpacing: "2px" }}>
                    <i className="fa fa-book-open me-2"></i>
                    Gestión de Libros
                </h1>
                <nav>
                    <ul
                        className="nav nav-pills nav-fill gap-2 p-2 bg-white rounded-5 shadow-sm justify-content-center bg-pink"
                        id="pillNav"
                    >
                        <li className="nav-item">
                            <NavLink
                                to="/libros/lista"
                                className={({ isActive }) =>
                                    "nav-link rounded-5 fw-semibold " + (isActive ? " active bg-pink text-white" : " text-pink")
                                }
                            >
                                <i className="fa fa-list me-1"></i>
                                Libros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/libros/crear"
                                className={({ isActive }) =>
                                    "nav-link rounded-5 fw-semibold" + (isActive ? " active bg-pink text-white" : " text-pink")
                                }
                            >
                                <i className="fa fa-plus me-1"></i>
                                Nuevo Libro
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}