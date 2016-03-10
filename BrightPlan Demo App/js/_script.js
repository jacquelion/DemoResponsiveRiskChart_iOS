(function() {
"use strict";

var data = {}
var startingVals = [70, 15, 10, 3, 2];
var endingVals = [10, 10, 25, 30, 25];
var currentRiskFactor = 5;
var increments = [];
var dataArray = [];

function setValues(a, b, c, d, e) {
  dataArray = [];
  a = a.toFixed(0);
  b = b.toFixed(0);
  c = c.toFixed(0);
  d = d.toFixed(0);
  e = e.toFixed(0);
  dataArray.push(a, b, c, d, e);
  return dataArray;
}

function calcIncrements() {
  for (var i = 0; i < 5; i++) {
    //Set up equation for how risk affects investments here. Default set to even increments
    var valIncrement = (startingVals[i] - endingVals[i]) / 100;
    increments.push(valIncrement);
  }
}

function calcData() {
  calcIncrements();
  var a = startingVals[0];
  var b = startingVals[1];
  var c = startingVals[2];
  var d = startingVals[3];
  var e = startingVals[4];

  var incA = increments[0];
  var incB = increments[1];
  var incC = increments[2];
  var incD = increments[3];
  var incE = increments[4];

  for (var i = 0; i < 100; i++) {
    var dataByRisk = setValues(a, b, c, d, e);
    data[i] = dataByRisk;
    a -= incA;
    b -= incB;
    c -= incC;
    d -= incD;
    e -= incE;
  }
}

window.onload = function() {
  calcData();
  drawChart(5, true);

  //Fluid animation as UISlider Changes
  var slider = document.querySelector("input");

  var listener = function() {
    window.requestAnimationFrame(function() {
      drawChart(slider.value, false);
    });
  };

  slider.addEventListener("mousedown", function() {
    listener();
    slider.addEventListener("mousemove", listener);
  });

  slider.addEventListener("mouseup", function() {
    slider.removeEventListener("mousemove", listener);
  });


 //Implement Rangeslider to respond to touchscreen
  $('input[type="range"]').rangeslider({
    // TODO: update on slide
    onSlide: function() {
      drawChart(slider.value, false);
    }
  });
   $('input').on('change', function () {
     drawChart(slider.value, false);
  });
}

//HELPER functions
function drawChart(valueFromRange, shouldAnimate) {

  currentRiskFactor = valueFromRange;

  //set doughnut chart inner text:
  var ctx = $('#doughnutChart').get(0).getContext('2d');
  var chartData = [{
    value: data[currentRiskFactor][0],
    color: "#00ccff",
    highlight: "#80e5ff", //Highlight based on % increase in lightness of color
    label: "Cash"
  }, {
    value: data[currentRiskFactor][1],
    color: "#00ff80",
    highlight: "#80ffbf",
    label: "Bonds"
  }, {
    value: data[currentRiskFactor][2],
    color: "#ffbf00",
    highlight: "#ffd24d",
    label: "Stocks"
  }, {
    value: data[currentRiskFactor][3],
    color: "#ff1a53",
    highlight: "#ff4d79",
    label: "ETFs"
  }, {
    value: data[currentRiskFactor][4],
    color: "#b366ff",
    highlight: "#cc99ff",
    label: "Futures"
  }]

  var chart = new Chart(ctx).Doughnut(chartData, {
    responsive: true,
    percentageInnerCutout: 75,
    animation: shouldAnimate,
    onAnimationComplete: function() {
      //SETS TEXT INSIDE CHART
      document.getElementById('textInnerDoughnut').innerHTML = currentRiskFactor;

    }
  });

  //SETs LEGEND (PANEL VALUES)
  document.getElementById("legend").innerHTML = chart.generateLegend();
}

})();
