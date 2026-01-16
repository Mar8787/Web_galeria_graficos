const tbody = document.querySelector("#pictures-table");


// JSONs wiht charts data
const dataExercises = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  datasets: [{
    label: "Ejercicios Realizados",
    data: [10, 23, 40, 21, 14, 35, 37, 29, 17, 21, 32, 40]
  }]
};

const dataSongs = {
  labels: ["Enero", "Febrebo", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  datasets: [{
    label: "Canciones escuchadas",
    data: [250, 231, 230, 351, 99, 147, 434, 500, 80, 210, 125, 400]
  }]
};

let showData = dataExercises;

// Select the number of pictures using Select2
function selectPictures() {
  $(document).ready(function () {
    $("#pictures-select").select2({
      placeholder: "Elige una opción"
    });
  });
}

$("#pictures-select").on("select2:select", function (e) {
  const picValue = Number(e.params.data.id);
  console.log("Número seleccionado:", picValue);
  renderTable(picValue);
});
selectPictures();

// Fuction for render table
function renderTable(picValue) {
  tbody.innerHTML = ""; // All html inside table body -> Delete

  // Random number for the cache-busting
  for (let i = 0; i < picValue; i++) {
    let photoRandom = Math.floor(Math.random() * (10000 - 2 + 1) + 1);

    // Build the table with pictures, ids and description
    tbody.innerHTML += `
        <tr>
          <th scope="row">
            <div class="picture-container">
              <img class="picture" src="https://picsum.photos/200/200?${photoRandom}" alt="Imagen" loading="lazy">
            </div>
          </th>
          <td class="col-id">
            <div class="id-number-container">
                <p class="id-number">${i + 1}</p>
            </div>
          </td>
          <td class="col-description">
            <div class="description">
              <p id="text-description"> Imagen obtenida de <a href="https://picsum.photos/" target="blank">Lorem Picsum</a>
            </div>
          </td>
        </tr>
        `;
  }
}

// Select the data of chart using Select2
function selectData() {
  $(document).ready(function () {
    $("#data-select").select2({
      placeholder: "Elige los datos a mostrar"
    });
  });
}

$("#data-select").on("select2:select", function (e) {
  const dataValue = e.params.data.id;
  console.log("Datos seleccionados:", dataValue);

  if (dataValue === "dataSongs") {
    showData = dataSongs;
  } else {
    showData = dataExercises;
  }

  document.querySelector("#chartBars").innerHTML = "";
  document.querySelector("#chartDonut").innerHTML = "";

  barChart(showData);
  donutChart(showData);
});
selectData();

// Bar chart
function barChart(showData) {
  const barColor = (showData === dataSongs) ? ['#FF4560'] :  ['#0004e3'];

  let options = {
    chart: {
      type: 'bar'
    },
    colors: barColor,
    grid: {
      borderColor: '#ffff'
    },
    series: [{
      name: showData.datasets[0].label,
      data: showData.datasets[0].data
    }],
    xaxis: {
      categories: showData.labels
    }
  }

  let dataBarChart = new ApexCharts(document.querySelector("#chartBars"), options);

  dataBarChart.render();
}

// Donut char
function donutChart(showData) {
  let options = {
    chart: {
      type: 'donut'
    },
    series: showData.datasets[0].data,
    labels: showData.labels,
  }

  let dataDonutChart = new ApexCharts(document.querySelector("#chartDonut"), options);

  dataDonutChart.render();
}
