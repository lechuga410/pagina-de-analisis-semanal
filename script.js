let operaciones = [];

function agregarOperacion() {
    const inputNuevaOperacion = document.getElementById("nueva-operacion");
    const nuevaOperacion = inputNuevaOperacion.value.trim();

    if (nuevaOperacion !== "") {
        operaciones.push(nuevaOperacion);
        actualizarListaOperaciones();
        inputNuevaOperacion.value = "";
    }
}
function actualizarListaOperaciones() {
    const lista = operaciones.join("  ");
    document.getElementById("lista-operaciones").innerText = lista;
    document.getElementById("operaciones-ganadas").value = lista;
}// Actualiza el hidden input

function calcularTotalsuma() {
    const input = document.getElementById("operaciones-ganadas").value;
    const valores = input.split(" ");
    let total = 0;

    valores.forEach(valor => {
        valor = valor.replace("+", "").replace(",", ".");
        if (!isNaN(parseFloat(valor))) {
            total += parseFloat(valor);
        }
    });

    document.getElementById("resultado").innerText = "Total ganancias: + " + total.toFixed(2);
}

let operacionesPerdidas = [];

function agregarOperacionPerdida() {
    const inputNueva = document.getElementById("nueva-operacion-perdida");
    const nuevaOperacion = inputNueva.value.trim();

    if (nuevaOperacion !== "") {
        operacionesPerdidas.push(nuevaOperacion);
        actualizarListaOperacionesPerdidas();
        inputNueva.value = "";
    }
}

function actualizarListaOperacionesPerdidas() {
    const lista = operacionesPerdidas.join("  ");
    document.getElementById("lista-operaciones-perdidas").innerText = lista;
    document.getElementById("operaciones-perdidas").value = lista;
}
function calcularTotalresta() {
    const input = document.getElementById("operaciones-perdidas").value;
    const valores = input.split(" ");
    let total = 0;

    valores.forEach(valor => {
        valor = valor.replace("-", "").replace(",", ".");
        if (!isNaN(parseFloat(valor))) {
            total += parseFloat(valor);
        }
    });

    document.getElementById("resultado2").innerText = "Total pérdidas: - " + total.toFixed(2);
}

function agregarError() {
    const tipo = document.getElementById("tipo-error").value;
    const cantidad = document.getElementById("cantidad-error").value;
    const lista = document.getElementById("lista-errores");

    if (cantidad === "" || cantidad <= 0) {
        alert("Escribe un número válido.");
        return;
    }

    const textoVisible = document.querySelector(`#tipo-error option[value="${tipo}"]`).textContent;

    const li = document.createElement("li");
    li.textContent = `${textoVisible} — ${cantidad} operaciones.`;

    lista.appendChild(li);
}

function calcularTasaAciertos() {
    const ganadas = document.getElementById("operaciones-ganadas").value.trim().split(" ").filter(v => v !== "");
    const totalOperaciones = parseInt(document.getElementById("cantidad-operaciones").value);

    if (isNaN(totalOperaciones) || totalOperaciones <= 0) {
        document.getElementById("resultado-tasa").innerText = "Ingresa el número total de operaciones válido.";
        return;
    }

    const tasa = (ganadas.length / totalOperaciones) * 100;
    document.getElementById("resultado-tasa").innerText = `Tasa de aciertos: ${tasa.toFixed(2)}%`;
}

function calcularMargen() {
    const gananciasInput = document.getElementById("operaciones-ganadas").value;
    const perdidasInput = document.getElementById("operaciones-perdidas").value;

    const ganancias = gananciasInput.split(" ").map(v => parseFloat(v.replace(",", "."))).filter(v => !isNaN(v));
    const perdidas = perdidasInput.split(" ").map(v => Math.abs(parseFloat(v.replace(",", ".")))).filter(v => !isNaN(v));

    const totalGanancias = ganancias.reduce((a, b) => a + b, 0);
    const totalPerdidas = perdidas.reduce((a, b) => a + b, 0);

    const margenNeto = totalGanancias - totalPerdidas;

    let signo = margenNeto >= 0 ? "+" : "";
    document.getElementById("resultado-margen").innerText = `Margen neto: ${signo}${margenNeto.toFixed(2)}`;
}


function generarResumen() {
    const semana = document.getElementById("semana").value;
    const comprension = document.getElementById("comprension-en-tiempo-real").value;
    const comprensionPos = document.getElementById("comprension-pos-mercado").value;

        const ganadasInput = document.getElementById("operaciones-ganadas").value.trim();
        const ganadasArr = ganadasInput.split(" ").filter(v => v !== "");
        const cantidadGanadas = ganadasArr.length;
        const volumenGanadas = ganadasArr
        .map(v => parseFloat(v.replace(",", ".")))
        .filter(v => !isNaN(v))
        .reduce((a, b) => a + b, 0);

        const detalleGanadas = ganadasArr
        .map((v, i) => {
            const valor = parseFloat(v.replace(",", "."));
            const porcentaje = volumenGanadas !== 0 ? ((valor / volumenGanadas) * 100).toFixed(2) : "0.00";
            return `#${i + 1}: +${v} (${porcentaje}%)`;
        })
        .join('\n');

    const perdidasInput = document.getElementById("operaciones-perdidas").value.trim();
    const perdidasArr = perdidasInput.split(" ").filter(v => v !== "");
    const cantidadPerdidas = perdidasArr.length;

    const volumenPerdidas = perdidasArr
    .map(v => Math.abs(parseFloat(v.replace(",", ".")))) 
    .filter(v => !isNaN(v))
    .reduce((a, b) => a + b, 0);
    const volumenPerdidasTexto = volumenPerdidas > 0 ? `-${volumenPerdidas.toFixed(2)}` : `0.00`;
    const detallePerdidas = perdidasArr
    .map((v, i) => {
        const valor = Math.abs(parseFloat(v.replace(",", ".")));
        const porcentaje = volumenPerdidas !== 0 ? ((valor / volumenPerdidas) * 100).toFixed(2) : "0.00";
        return `#${i + 1}: -${valor} (${porcentaje}%)`; 
    })
    .join('\n');


    const resultadoMargen = document.getElementById("resultado-margen").innerText;
    const resultadoTasa = document.getElementById("resultado-tasa")?.innerText || "";

    const breakeven = document.getElementById("operaciones-breakeven").value;
    const cantidadOperaciones = document.getElementById("cantidad-operaciones").value;

    const errores = Array.from(document.querySelectorAll("#lista-errores li"))
        .map(li => li.textContent)
        .join("\n");

    const resumen = 
`📅 Semana: ${semana}
🎯 Comprensión en tiempo real: ${comprension}
📊 Comprensión post semana: ${comprensionPos}

✅ Ganadas: ${cantidadGanadas} | resultado neto: +${volumenGanadas.toFixed(2)}
${detalleGanadas ? 'Detalle ganadas:\n' + detalleGanadas : ''}
❌ Perdidas: ${cantidadPerdidas} | resultado neto: -${volumenPerdidas.toFixed(2)}
${detallePerdidas ? 'Detalle perdidas:\n' + detallePerdidas : ''}

➖ Operaciones en breakeven: ${breakeven}
🔢 Número de operaciones: ${cantidadOperaciones}
📈 ${resultadoTasa}
💰 ${resultadoMargen}

⚠️ Errores cometidos:
${errores}`;

    document.getElementById("resumen-final").innerText = resumen;
}

function generarImagen() {
    const resumen = document.getElementById("resumen-final");
    const semana = document.getElementById("📅 semana").value;
    html2canvas(resumen).then(canvas => {
        const link = document.createElement("a");
        link.download = `resumen_semana_${semana}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}
