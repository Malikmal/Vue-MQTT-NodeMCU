<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-gray-200 mb-1 text-xs font-semibold">
            Overview
          </h6>
          <h2 class="text-white text-xl font-semibold">
            Potensio value
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-350-px">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      // potensio1 : [0,0],
      // potensio2 : [0,0],
      // potensio : [
      //   [0,0],
      //   [0,0]
      // ]
      myLine : {},
      flagAsycnTopic : [0,0],
    }
  },
  mqtt : {
    '+/potensio/+' (data, topic){
      var date = Date.now();
      // date.toString = function(){ return ''+s; };
      var dataObj = {
        x : date,
        y : parseInt(data),
      };
      
      // window.myLine.data.datasets[(topic.split('/').pop() === '1'))?0:1].data.push(dataObj);
        
      if(topic.split('/').pop() === '1'){
        // this.potensio1.push(parseInt(data));
        window.myLine.data.datasets[0].data.push(dataObj);
        window.myLine.data.datasets[0].data.shift();
        // window.myLine.update();
        this.flagAsycnTopic[0] = 1;
      }
      else if(topic.split('/').pop() === '2'){
        window.myLine.data.datasets[1].data.push(dataObj);
        window.myLine.data.datasets[1].data.shift();
        // window.myLine.update();
        this.flagAsycnTopic[1] = 1;
      }
      if(this.flagAsycnTopic[0] && this.flagAsycnTopic[1])
      {
        window.myLine.update();
        this.flagAsycnTopic = [0,0];
      }
      // console.log(this.potensio1);
      // console.log(this.potensio2);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      var config = {
        type: "line",
        data: {
          labels: [
          ],
          datasets: [
            {
              label: 'Potensio #1',
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                
              ],
              fill: false,
            },
            {
              label: 'Potensio #2',
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data:[ 
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
                {x : new Date(),y : 0,},
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Potensiometer Data",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                type:'time',
                distribution: 'series',
                time: {
                  unit: 'second',
                  displayFormats: {
                    second: 'mm:ss'
                  }
                },
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                  source: 'auto',
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Time",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      var ctx = document.getElementById("line-chart").getContext("2d");
       window.myLine = new Chart(ctx, config);
      
    });
  },
};
</script>
