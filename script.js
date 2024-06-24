// Chargement de Google Charts
google.charts.load('current', { packages: ['corechart'] });

// Variables globales pour les graphiques, données et options
let chart1, chart2;
let data1, data2;
let options1, options2;
const originalData1 = [
    [0, 0],
    [6685.71, 6500]
];
const originalData2 = [
    [0, 0],
    [4642.86, 6500]
];

// Données pour les courbes d'origine (constantes)
const originalCurveData1 = [
    [0, 0],
    [6685.71, 6500]
];
const originalCurveData2 = [
    [0, 0],
    [4642.86, 6500]
];

// Fonction à appeler une fois que Google Charts est chargé
google.charts.setOnLoadCallback(initialize);

// Fonction d'initialisation
function initialize() {
    // Initialisation des données et options pour le graphique 1
    data1 = new google.visualization.DataTable();
    data1.addColumn('number', 'Largeur de détection');
    data1.addColumn('number', 'Hauteur d\'installation');
    data1.addRows(originalData1);

    options1 = {
        title: 'Graphique 1',
        hAxis: { title: 'Largeur de détection (mm)', viewWindow: { min: 0, max: 7200 } },
        vAxis: { title: 'Hauteur d\'installation (mm)', viewWindow: { min: 0, max: 7200 } },
        legend: 'none',
        colors: ['#a52714'],
        pointSize: 5,
        chartArea: { width: '80%', height: '70%' }
    };

    // Initialisation des données et options pour le graphique 2
    data2 = new google.visualization.DataTable();
    data2.addColumn('number', 'Profondeur de détection');
    data2.addColumn('number', 'Hauteur d\'installation');
    data2.addRows(originalData2);

    options2 = {
        title: 'Graphique 2',
        hAxis: { title: 'Profondeur de détection (mm)', viewWindow: { min: 0, max: 5000 } },
        vAxis: { title: 'Hauteur d\'installation (mm)', viewWindow: { min: 0, max: 7200 } },
        legend: 'none',
        colors: ['#097138'],
        pointSize: 5,
        chartArea: { width: '80%', height: '70%' }
    };

    // Dessiner les graphiques avec les données initiales
    drawCharts();

    // Écouteur d'événement pour détecter les changements dans les champs de texte
    document.getElementById('inputY').addEventListener('input', updateCharts);
}

// Fonction pour dessiner les graphiques
function drawCharts() {
    chart1 = new google.visualization.LineChart(document.getElementById('chart_div1'));
    chart2 = new google.visualization.LineChart(document.getElementById('chart_div2'));

    // Dessiner les courbes d'origine (statiques)
    drawStaticCurves();

    // Dessiner les graphiques avec les données actuelles
    chart1.draw(data1, options1);
    chart2.draw(data2, options2);
}

// Fonction pour dessiner les courbes d'origine (statiques)
function drawStaticCurves() {
    // Graphique 1
    data1.addRows(originalCurveData1);
    // Graphique 2
    data2.addRows(originalCurveData2);
}

// Fonction pour mettre à jour les graphiques et les croix de sélection
function updateCharts() {
    const inputY = parseFloat(document.getElementById('inputY').value) || 0;
    const inputX1 = (inputY / 6500) * 6685.71;
    const inputX2 = (inputY / 6500) * 4642.86;

    document.getElementById('inputX1').value = inputX1.toFixed(2);
    document.getElementById('inputX2').value = inputX2.toFixed(2);

    // Mettre à jour les données du graphique 1 avec les nouvelles coordonnées
    data1.setValue(1, 0, inputX1);
    data1.setValue(1, 1, inputY);

    // Mettre à jour les données du graphique 2 avec les nouvelles coordonnées
    data2.setValue(1, 0, inputX2);
    data2.setValue(1, 1, inputY);

    // Dessiner les graphiques avec les nouvelles données
    chart1.draw(data1, options1);
    chart2.draw(data2, options2);
}
