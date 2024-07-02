// Al cargar la página, recuperar los datos del Storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('notas')) {
        notas = JSON.parse(localStorage.getItem('notas'));
        actualizarListaNotas();
    }

    if (localStorage.getItem('listaAlumnos')) {
        listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos'));
        mostrarListaAlumnos();
    }
});

// Array para almacenar las notas de los alumnos
let notas = [];

// Función para agregar una nota al array de notas
function agregarNota() {
    const notaInput = document.getElementById('nota');
    const nota = parseFloat(notaInput.value);
    // Validar que la nota sea un número y esté entre 0 y 10
    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert('Por favor, ingrese una nota válida (entre 0 y 10).');
    } else {
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas)); // Guardar en localStorage
        console.log(`Nota ${nota} agregada.`);
        notaInput.value = ''; // Limpiar el campo de entrada
        actualizarListaNotas();
    }
}

// Función para calcular el promedio de las notas
function calcularPromedio() {
    if (notas.length === 0) {
        alert('No hay notas ingresadas.');
        return;
    }
    let suma = 0;
    for (let nota of notas) {
        suma += nota;
    }
    const promedio = suma / notas.length;
    mostrarResultado(`El promedio de las notas es: ${promedio.toFixed(2)}`);
}

// Función para mostrar el resultado en el HTML
function mostrarResultado(mensaje) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = mensaje;
}

// Función para actualizar la lista de notas en el HTML
function actualizarListaNotas() {
    const notasList = document.getElementById('notasList');
    notasList.innerHTML = '';
    for (let nota of notas) {
        const li = document.createElement('li');
        li.innerText = nota;
        notasList.appendChild(li);
    }
}

// Función para limpiar el array de notas y el mensaje de resultado
function limpiarNotas() {
    notas = [];
    localStorage.removeItem('notas'); // Eliminar del localStorage
    mostrarResultado('');
    actualizarListaNotas();
    console.log('Notas y resultado limpiados.');
}

// Funciones de operaciones matemáticas
function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return "Error: división por cero";
    }
    return a / b;
}

function mostrarOperaciones(mensaje) {
    const resultDiv = document.getElementById('resultOperaciones');
    resultDiv.innerText = mensaje;
}

// Event listeners para los botones
document.getElementById('agregarNotaButton').addEventListener('click', agregarNota);
document.getElementById('calcularPromedioButton').addEventListener('click', calcularPromedio);
document.getElementById('limpiarButton').addEventListener('click', limpiarNotas);

document.getElementById('sumarButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(suma(num1, num2));
});

document.getElementById('restarButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(resta(num1, num2));
});

document.getElementById('multiplicarButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(multiplicacion(num1, num2));
});

document.getElementById('dividirButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(division(num1, num2));
});

// Constructor para Alumno
function Alumno(nombre, apellido, notas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.notas = notas;
    this.calcularPromedio = function() {
        if (this.notas.length === 0) {
            return 0;
        }
        let suma = this.notas.reduce((a, b) => a + b, 0);
        return suma / this.notas.length;
    };
}

// Lista de alumnos
let listaAlumnos = [];

// Función para agregar un alumno a la lista
function agregarAlumno() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const notasInput = document.getElementById('notas');

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const notas = notasInput.value.split(',').map(parseFloat);

    const alumno = new Alumno(nombre, apellido, notas);
    listaAlumnos.push(alumno);
    localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos)); // Guardar en localStorage

    console.log(`Alumno ${nombre} ${apellido} agregado.`);
    mostrarListaAlumnos();
}

// Función para mostrar la lista de alumnos
function mostrarListaAlumnos() {
    const listaAlumnosDiv = document.getElementById('listaAlumnos');
    listaAlumnosDiv.innerHTML = '';

    listaAlumnos.forEach(alumno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <b>${alumno.nombre} ${alumno.apellido}</b><br>
            Notas: ${alumno.notas.join(', ')}<br>
            Promedio: ${alumno.calcularPromedio().toFixed(2)}<br>
            -----------------------------<br>`;
        listaAlumnosDiv.appendChild(li);
    });
}

// Función para buscar alumnos por nombre o apellido
function buscarAlumno() {
    const buscarInput = document.getElementById('buscar');
    const searchTerm = buscarInput.value.toLowerCase();

    const resultados = listaAlumnos.filter(alumno => {
        return alumno.nombre.toLowerCase().includes(searchTerm) || 
               alumno.apellido.toLowerCase().includes(searchTerm);
    });

    mostrarResultadosBusqueda(resultados);
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultadosBusqueda(resultados) {
    const listaAlumnosDiv = document.getElementById('listaAlumnos');
    listaAlumnosDiv.innerHTML = '';

    resultados.forEach(alumno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <b>${alumno.nombre} ${alumno.apellido}</b><br>
            Notas: ${alumno.notas.join(', ')}<br>
            Promedio: ${alumno.calcularPromedio().toFixed(2)}<br>
            -----------------------------<br>`;
        listaAlumnosDiv.appendChild(li);
    });
}

// Event listeners para los botones
document.getElementById('agregarAlumnoButton').addEventListener('click', agregarAlumno);
document.getElementById('buscarAlumnoButton').addEventListener('click', buscarAlumno);
