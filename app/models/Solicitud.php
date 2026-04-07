<?php
class Solicitud
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function rechazar($id)
    {
        $query = "UPDATE solicitudes SET estado='rechazada' WHERE id=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->affected_rows > 0;

    }

    public function aprobar($id)
    {
        $query = "UPDATE solicitudes SET estado='aprobada' WHERE id=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->affected_rows > 0;

    }

    public function insertar($tallerId,$usuarioId)
    {
        $query = "INSERT INTO solicitudes (taller_id,usuario_id,estado) VALUES(?,?,'pendiente')";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $tallerId,$usuarioId);
        $stmt->execute();
        return $stmt->affected_rows > 0;

    }

    public function getById($tallerId,$usuarioId)
    {
        $query = "SELECT * FROM solicitudes WHERE taller_id = ? AND usuario_id=? AND estado IN ('aprobada','pendiente')";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $tallerId,$usuarioId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    
    }

    public function getAllPendientes()
    {
        $result = $this->conn->query("SELECT solicitudes.id,talleres.nombre, usuarios.username,solicitudes.fecha_solicitud FROM solicitudes INNER JOIN usuarios ON solicitudes.usuario_id= usuarios.id INNER JOIN talleres ON solicitudes.taller_id= talleres.id WHERE estado='pendiente' ORDER BY solicitudes.id");
        $solicitudes = [];
        while ($row = $result->fetch_assoc()) {
            $solicitudes[] = $row;
        }
        return $solicitudes;

    }

    


}