$(function () {

    const cuerpo = $('#solicitudes-body');

    
    fetch('index.php?option=solicitudes_json')
        .then(response => response.json())
        .then(data => {
            
            cuerpo.innerHTML = "";

            if (data.length === 0) {
                cuerpo.innerHTML = "<tr><td colspan='4'>No hay solicitudes disponibles</td></tr>";
                return;
            }

            // Recorremos cada solicitud del JSON
            data.forEach(solicitud => {
                let fila = `
                    <tr>
                        <td>${solicitud.id}</td>
                        <td>${solicitud.nombre}</td>
                        <td>${solicitud.username}</td>
                        <td>${solicitud.fecha_solicitud}</td>
                        <td>
                            <div style="display: flex; gap: 5px;">
                                <form  action="/sc502-ln-caso2-Tomas-2111-1/index.php" method="POST" class="form-accion-admin">
                                    <input type="hidden" name="option" value="aprobar">
                                    <input type="hidden" name="id_solicitud" value="${solicitud.id}">
                                    <input type="hidden" name="tallerId" value="${solicitud.tallerId}">
                                    <button type="submit" style="background-color: #25a058; color: white;  padding: 5px 10px; cursor: pointer;">Aprobar</button>
                                </form>

                                <form action="/sc502-ln-caso2-Tomas-2111-1/index.php" method="POST" class="form-accion-admin">
                                    <input type="hidden" name="option" value="rechazar">
                                    <input type="hidden" name="id_solicitud" value="${solicitud.id}">
                                    <button type="submit" style="background-color: #a32f22; color: white;  padding: 5px 10px; cursor: pointer;">Rechazar</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                `;
                cuerpo.append(fila);
            });
        })
        .catch(error => console.error('Error cargando solicitudes:', error));



    $(document).on("submit", ".form-accion-admin", function (event) {
        event.preventDefault();
        let form=$(".form-accion-admin"); 

    
        const formData = new FormData(this);


        fetch("index.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json()) 
        .then(data => {
            
            if (data.success) {
                alert(data.message);
                
                location.reload(); 
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
        
            alert(error);
        });
    });

    
    
})
