import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

function multiplyMatrices(matrix1, matrix2) {
  const result = [];
  const rows1 = matrix1.length;
  const cols1 = matrix1[0].length;
  const rows2 = matrix2.length;
  const cols2 = matrix2[0].length;

  if (cols1 !== rows2) {
    throw new Error(
      "El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2"
    );
  }

  for (let i = 0; i < rows1; i++) {
    result[i] = [];
    for (let j = 0; j < cols2; j++) {
      result[i][j] = 0;
      for (let k = 0; k < cols1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  return result;
}

app.post("/multiply", (req, res) => {
  const { matrix1, matrix2 } = req.body;

  try {
    const result = multiplyMatrices(matrix1, matrix2);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
