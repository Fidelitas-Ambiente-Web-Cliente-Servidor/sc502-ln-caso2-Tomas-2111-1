<!DOCTYPE html>
<html>

<head>

    <title>Listado Talleres</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet">
    <script src="public/js/jquery-4.0.0.min.js"></script>
    <link rel="stylesheet" href="./public/css/style.css">
</head>

<body class="container mt-5">

    <nav>
        <div>
            <a href="index.php?page=talleres">Talleres</a>
            <?php if (isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin'): ?>
                <a href="index.php?page=admin">Gestionar Solicitudes</a>
            <?php endif; ?>
        </div>
        <div>
            <span> <?= htmlspecialchars($_SESSION['nombre'] ?? $_SESSION['user'] ?? 'Usuario') ?></span>
            <button id="btnLogout" class="btn btn-primary">Cerrar sesión</button>
        </div>
    </nav>
    <main>
        <h3>Talleres</h3>

        <table class="table table-bordered" id="tablaTalleres">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Cupo disponible</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="cuerpoTabla">
            </tbody>

           



        </table>
    </main>
    <script src="./public/js/taller.js"></script>
</body>

</html>