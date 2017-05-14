var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};
var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.yellow,
                window.chartColors.green,
                window.chartColors.blue,
            ],
            label: 'Dataset 1'
        }],
        labels: [
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue"
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true
    }
};
var ctx1 = document.getElementById("overview-chart-1").getContext("2d");
var ctx2 = document.getElementById("overview-chart-2").getContext("2d");
window.myPie1 = new Chart(ctx1, config);
window.myPie2 = new Chart(ctx2, config);