$(function () {

    const cuerpo = $('#cuerpoTabla');

    
    fetch('index.php?option=talleres_json')
        .then(response => response.json())
        .then(data => {
            
            cuerpo.innerHTML = "";

            if (data.length === 0) {
                cuerpo.innerHTML = "<tr><td colspan='4'>No hay talleres disponibles</td></tr>";
                return;
            }

            // Recorremos cada taller del JSON
            data.forEach(taller => {
                let fila = `
                    <tr>
                        <td>${taller.nombre}</td>
                        <td>${taller.descripcion}</td>
                        <td>${taller.cupo_disponible}</td>
                        <td>
                            <form action="/sc502-ln-caso2-Tomas-2111-1/index.php" method="POST" id="solicitarTaller">
                                <input type="hidden" name="option" value="solicitar">
                                <input type="hidden" name="taller_id" value="${taller.id}">
                                <button type="submit">Inscribirme</button>
                            </form>
                        </td>
                    </tr>
                `;
                cuerpo.append(fila);
            });
        })
        .catch(error => console.error('Error cargando talleres:', error));

    let form=$("#solicitarTaller");

    $(document).on("submit", "#solicitarTaller", function (event) {
        event.preventDefault();
         let form=$("#solicitarTaller"); 

    
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
