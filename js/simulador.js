// Lista de campeones disponibles
const campeones = [
  { nombre: "Garen", vida: 100, ataque: 30, defensa: 10 },
  { nombre: "Ahri", vida: 80, ataque: 35, defensa: 5 },
  { nombre: "Darius", vida: 120, ataque: 25, defensa: 15 },
  { nombre: "Lux", vida: 70, ataque: 40, defensa: 4 }
];

// Función para mostrar campeones y elegir uno (con validación)
function elegirCampeon() {
  let eleccionValida = false;
  let eleccion;

  while (!eleccionValida) {
    let mensaje = "Elige tu campeón:\n";
    campeones.forEach((c, i) => {
      mensaje += `${i + 1}. ${c.nombre} (Vida: ${c.vida}, Atk: ${c.ataque}, Def: ${c.defensa})\n`;
    });

    eleccion = parseInt(prompt(mensaje));
    if (!isNaN(eleccion) && eleccion >= 1 && eleccion <= campeones.length) {
      eleccionValida = true;
    } else {
      alert("Opción inválida. Por favor, ingresa un número válido.");
    }
  }

  return campeones[eleccion - 1];
}

// Elegir enemigo aleatorio (diferente al jugador)
function elegirEnemigo(jugador) {
  let posibles = campeones.filter(c => c.nombre !== jugador.nombre);
  let enemigo = posibles[Math.floor(Math.random() * posibles.length)];
  return JSON.parse(JSON.stringify(enemigo)); // copia profunda
}

// Calcular daño con posibilidad de evasión
function calcularDanio(ataque, defensa, defensorNombre) {
  const evasionChance = 0.2; // 20% de probabilidad de esquivar

  if (Math.random() < evasionChance) {
    console.log(`${defensorNombre} ¡evadió el ataque!`);
    return 0;
  }

  let danio = ataque - defensa;
  return danio > 0 ? danio : 5; // daño mínimo
}

// Simular combate por turnos con evasión
function combatir(jugador, enemigo) {
  alert(`¡Combate entre ${jugador.nombre} y ${enemigo.nombre}!\nRevisá la consola para seguir el duelo.`);

  let ronda = 1;

  while (jugador.vida > 0 && enemigo.vida > 0) {
    console.log(`--- Ronda ${ronda} ---`);

    let danioJugador = calcularDanio(jugador.ataque, enemigo.defensa, enemigo.nombre);
    enemigo.vida -= danioJugador;
    if (danioJugador > 0) {
      console.log(`${jugador.nombre} ataca y causa ${danioJugador} de daño a ${enemigo.nombre} (vida restante: ${enemigo.vida})`);
    }

    if (enemigo.vida <= 0) break;

    let danioEnemigo = calcularDanio(enemigo.ataque, jugador.defensa, jugador.nombre);
    jugador.vida -= danioEnemigo;
    if (danioEnemigo > 0) {
      console.log(`${enemigo.nombre} ataca y causa ${danioEnemigo} de daño a ${jugador.nombre} (vida restante: ${jugador.vida})`);
    }

    ronda++;
  }

  if (jugador.vida > 0) {
    alert(`¡Ganaste el combate! ${jugador.nombre} derrotó a ${enemigo.nombre}`);
  } else {
    alert(`Perdiste... ${enemigo.nombre} venció a ${jugador.nombre}`);
  }
}

// Función principal
function iniciarSimulador() {
  alert("Bienvenido al Simulador de Combate entre Campeones");

  const jugador = JSON.parse(JSON.stringify(elegirCampeon()));
  const enemigo = elegirEnemigo(jugador);

  combatir(jugador, enemigo);

  if (confirm("¿Querés volver a combatir?")) {
    iniciarSimulador(); // reinicia
  } else {
    alert("¡Gracias por jugar!");
  }
}

// Iniciar simulación
iniciarSimulador();
