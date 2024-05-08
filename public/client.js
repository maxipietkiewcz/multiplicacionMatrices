async function sendData() {
  const rows1 = document.getElementById("rows1").value;
  const cols1 = document.getElementById("cols1").value;
  const rows2 = document.getElementById("rows2").value;
  const cols2 = document.getElementById("cols2").value;

  if (rows1 === "" || cols1 === "" || rows2 === "" || cols2 === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const matrix1 = [];
  const matrix2 = [];

  for (let i = 0; i < rows1; i++) {
    matrix1[i] = [];
    for (let j = 0; j < cols1; j++) {
      const val = prompt(
        `Ingrese el valor para la posición [${i + 1},${j + 1}] de la Matriz 1:`
      );
      if (isNaN(val)) {
        alert("Ingrese un valor numérico.");
        return;
      }
      matrix1[i][j] = parseFloat(val);
    }
  }

  for (let i = 0; i < rows2; i++) {
    matrix2[i] = [];
    for (let j = 0; j < cols2; j++) {
      const val = prompt(
        `Ingrese el valor para la posición [${i + 1},${j + 1}] de la Matriz 2:`
      );
      if (isNaN(val)) {
        alert("Ingrese un valor numérico.");
        return;
      }
      matrix2[i][j] = parseFloat(val);
    }
  }

  const response = await fetch("/multiply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matrix1, matrix2 }),
  });

  const result = await response.json();
  document.getElementById("result").innerHTML = `<pre>${JSON.stringify(
    result,
    null,
    2
  )}</pre>`;
}
