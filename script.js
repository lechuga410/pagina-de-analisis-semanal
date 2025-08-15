let todasLasOperaciones = [];

function agregarOperacion() {
    const inputNuevaOperacion = document.getElementById("nueva-operacion");
    const nuevaOperacion = inputNuevaOperacion.value.trim();

    if (nuevaOperacion !== "" && !isNaN(parseFloat(nuevaOperacion.replace(",", ".")))) {
        const valor = parseFloat(nuevaOperacion.replace(",", "."));
        todasLasOperaciones.push(valor); // Ganancia positiva
        actualizarListaOperaciones();
        inputNuevaOperacion.value = "";
    }
}

function agregarOperacionPerdida() {
    const inputNuevaOperacionPerdida = document.getElementById("nueva-operacion-perdida");
    const nuevaOperacionPerdida = inputNuevaOperacionPerdida.value.trim();

    if (nuevaOperacionPerdida !== "" && !isNaN(parseFloat(nuevaOperacionPerdida.replace(",", ".")))) {
        const valor = -Math.abs(parseFloat(nuevaOperacionPerdida.replace(",", ".")));
        todasLasOperaciones.push(valor); // Pérdida negativa
        actualizarListaOperacionesPerdidas();
        inputNuevaOperacionPerdida.value = "";
    }
}

function actualizarListaOperaciones() {
    // Muestra solo las ganadas
    const ganadas = todasLasOperaciones.filter(v => v > 0).map(v => `+${v.toFixed(2)}`);
    document.getElementById("lista-operaciones").innerText = ganadas.join("  ");
    document.getElementById("operaciones-ganadas").value = ganadas.join(" ");
}

function actualizarListaOperacionesPerdidas() {
    // Muestra solo las perdidas
    const perdidas = todasLasOperaciones.filter(v => v < 0).map(v => v.toFixed(2));
    document.getElementById("lista-operaciones-perdidas").innerText = perdidas.join("  ");
    document.getElementById("operaciones-perdidas").value = perdidas.join(" ");
}

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
    // Cuenta automáticamente las operaciones ganadas y perdidas
    const ganadas = document.getElementById("operaciones-ganadas").value.trim().split(" ").filter(v => v !== "");
    const perdidas = document.getElementById("operaciones-perdidas").value.trim().split(" ").filter(v => v !== "");
    const totalOperaciones = ganadas.length + perdidas.length;

    if (totalOperaciones === 0) {
        document.getElementById("resultado-tasa").innerText = "No hay operaciones registradas.";
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
    document.getElementById("resultado-margen").innerText = `Margen neto: ${signo}${margenNeto.toFixed(2)} $`;
}


function generarResumen() {
    const semana = document.getElementById("semana").value;
    const comprension = document.getElementById("comprension-en-tiempo-real").value;
    const comprensionPos = document.getElementById("comprension-pos-mercado").value;

    // Ganadas
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
            return `  #${i + 1}: +${valor.toFixed(2)} $ (${porcentaje}%)`;
        })
        .join('\n');

    // Perdidas
    const perdidasInput = document.getElementById("operaciones-perdidas").value.trim();
    const perdidasArr = perdidasInput.split(" ").filter(v => v !== "");
    const cantidadPerdidas = perdidasArr.length;
    const volumenPerdidas = perdidasArr
        .map(v => Math.abs(parseFloat(v.replace(",", "."))))
        .filter(v => !isNaN(v))
        .reduce((a, b) => a + b, 0);
    const detallePerdidas = perdidasArr
        .map((v, i) => {
            const valor = Math.abs(parseFloat(v.replace(",", ".")));
            const porcentaje = volumenPerdidas !== 0 ? ((valor / volumenPerdidas) * 100).toFixed(2) : "0.00";
            return `  #${i + 1}: -${valor.toFixed(2)} $ (${porcentaje}%)`;
        })
        .join('\n');

    // Breakeven
    const breakevenInput = document.getElementById("operaciones-breakeven").value.trim();
    const breakevenArr = breakevenInput.split(" ").filter(v => v !== "");
    const cantidadBreakeven = breakevenArr.length;
    const detalleBreakeven = breakevenArr
        .map((v, i) => `  #${i + 1}: ${parseFloat(v.replace(",", ".")).toFixed(2)}$`)
        .join('\n');

    // Número de operaciones automático (ganadas + perdidas)
    const cantidadOperaciones = cantidadGanadas + cantidadPerdidas;

    const resultadoMargen = document.getElementById("resultado-margen").innerText;
    const resultadoTasa = document.getElementById("resultado-tasa")?.innerText || "";
    const errores = Array.from(document.querySelectorAll("#lista-errores li"))
        .map(li => li.textContent)
        .join("\n");

    const drawdownTexto = calcularDrawdown();

    // Resumen
    const resumen = 
`📅 Semana: ${semana}
🎯 Comprensión en tiempo real: ${comprension}
📊 Comprensión post semana: ${comprensionPos}

✅ Ganadas: ${cantidadGanadas} | resultado neto: +${volumenGanadas.toFixed(2)}$
${detalleGanadas ? 'Detalle ganadas:\n' + detalleGanadas : ''}

❌ Perdidas: ${cantidadPerdidas} | resultado neto: -${volumenPerdidas.toFixed(2)}$
${detallePerdidas ? 'Detalle perdidas:\n' + detallePerdidas : ''}

➖ Breakeven: ${cantidadBreakeven}
${detalleBreakeven ? 'Detalle breakeven:\n' + detalleBreakeven : ''}

🔢 Número de operaciones: ${cantidadOperaciones}

${resultadoMargen}

${resultadoTasa}

${drawdownTexto}

⚠️ Errores cometidos:
${errores}`;

    document.getElementById("resumen-final").innerHTML = resumen;
}
function generarImagen() {
    const resumen = document.getElementById("resumen-final");
    const semana = document.getElementById("semana").value;
    html2canvas(resumen).then(canvas => {
        const link = document.createElement("a");
        link.download = `resumen_semana_${semana}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}
function calcularDrawdown() {
    const capitalInicial = parseFloat(document.getElementById("capital-inicial").value);
    if (isNaN(capitalInicial) || capitalInicial <= 0) {
        return "Capital inicial inválido.";
    }

    let capital = capitalInicial;
    let maxCapital = capitalInicial;
    let minCapitalDespuesDelPico = capitalInicial;
    let maxDrawdown = 0;

    // Variables para guardar el drawdown máximo y sus valores asociados
    let drawdownPico = capitalInicial;
    let drawdownValle = capitalInicial;

    for (let i = 0; i < todasLasOperaciones.length; i++) {
        capital += todasLasOperaciones[i];
        if (capital > maxCapital) {
            maxCapital = capital;
            minCapitalDespuesDelPico = capital; // reinicia el mínimo después de un nuevo pico
        }
        if (capital < minCapitalDespuesDelPico) {
            minCapitalDespuesDelPico = capital;
        }
        const drawdownActual = maxCapital - capital;
        if (drawdownActual > maxDrawdown) {
            maxDrawdown = drawdownActual;
            drawdownPico = maxCapital;
            drawdownValle = capital;
        }
    }

    const drawdownPorcentaje = drawdownPico > 0 ? (maxDrawdown / drawdownPico) * 100 : 0;

    // NUEVO: Mostrar el capital final
    return (
        `💰 Capital inicial: $${capitalInicial.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br><br>` +
        `📈 Pico máximo: $${maxCapital.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br><br>` +
        `📉 Capital mínimo después del pico: $${drawdownValle.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br><br>` +
        `🛑 Drawdown en dólares: $${maxDrawdown.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br><br>` +
        `🛑 Drawdown en porcentaje: ${drawdownPorcentaje.toFixed(2)}%<br><br>` +
        `💵 Capital final: $${capital.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
    );
}