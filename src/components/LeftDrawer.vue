<template>
  <div id="drawer">
    <el-drawer
      title="使用选择"
      size="200px"
      direction="ltr"
      :visible.sync="drawerV"
      :with-header="false">
      <div class="drawerBox flexCC">
        <el-card class="elCard ldtable" style="">
          <el-table
            :data="searchForm"
            height="250"
            style="width: 80%; max-height: 90%; overflow: auto">
            <el-table-column
              prop="data"
              label="筛选"
            >
              <template slot-scope="scope">
                <el-button type="primary" plain v-if="scope.row.type === 'month'"
                           @click="sift(scope.row)">
                  {{ scope.row.data }}
                </el-button>
                <el-button type="warning" plain v-else @click="sift(scope.row)">
                  {{ scope.row.data }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="elCard">
          <div class="pointer flexCC sqlBox" @click="setStaChartV">
            <span>统计图</span>
          </div>
          <div class="staChart" :class="staChartVisible && drawerV ? 'staChart2' : ''">
            <div class="chartContainer flexRC">
              <div id="chart1" style="width: 450px;height: 350px;"></div>
              <div id="chart2" style="width: 450px;height: 350px;"></div>
            </div>
          </div>
        </el-card>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import {getDisMonth, getDisType, siftMonth, siftType, getStaMonthMoney, getStaTypeMoney} from "../api/sql";

export default {
  name: "LeftDrawer",
  data() {
    return {
      drawerV: false,
      staChartVisible: false,
      searchForm: [],
      dataAxis: ['2021年9月', '2021年8月'],
      dataBar: [299, 344],
      dataPie:[],
      chart1: null,
      chart2: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    setDrawer() {
      this.drawerV = true
    },
    init() {
      let months = [], types = []
      getDisMonth().then(res => {
        res.forEach(r => {
          months.push({data: r.year + '年' + r.month + '月', type: 'month'})
        })
        this.searchForm.push(...months)
      })
      getDisType().then(res => {
        res.forEach(r => {
          types.push({data: r.type, type: 'type'})
        })
        this.searchForm.push(...types)
      })
    },
    initChart1() {
      this.chart1 = this.$echarts.init(document.getElementById('chart1'))
      this.chart1.setOption({
        title: {
          text: '每月支出统计',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let tar = params[0];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + '元';
          }
        },
        xAxis: {
          data: this.dataAxis,
          axisLabel: {},
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}元',
            textStyle: {
              color: '#626161'
            }
          }
        },
        series: [
          {
            name: '支出',
            type: 'bar',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            label: {
              show: true,
              position: 'inside',
              color: '#ffffff'
            },
            data: this.dataBar
          }
        ]
      })
    },
    initChart2() {
      this.chart2 = this.$echarts.init(document.getElementById('chart2'))
      this.chart2.setOption({
        title: {
          text: '各类型花费统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let tar = params;
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + '元';
          }
        },
        series: [
          {
            name: '总花费',
            type: 'pie',
            radius: '50%',

            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: this.dataPie,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    sift(data) {
      if (data.type === 'month') {
        let minTime = data.data.replace(/[年]|[月]/g, '-') + '01'
        let maxTime = data.data.replace(/[年]|[月]/g, '-') + '31'
        let param = `select *
                     from 2021y09m
                     where date >= '${minTime}' and date <= '${maxTime}'`
        let data1 = {
          sqlCommand: param
        }
        siftMonth(data1).then(res => {
          this.$emit('setdatalist', res)
          this.drawerV = false
        })
      } else {
        let param = `select *
                     from 2021y09m
                     where type = '${data.data}'`
        let data1 = {
          sqlCommand: param
        }
        siftType(data1).then(res => {
          this.$emit('setdatalist', res)
          this.drawerV = false
        })
      }
    },
    setStaChartV() {
      this.staChartVisible = !this.staChartVisible
      if(this.staChartVisible === true) {
        getStaMonthMoney().then(res => {
          console.log('res', res)
          this.dataBar = []
          this.dataAxis = []
          res.forEach(r => {
            this.dataBar.push(r.money.toFixed(2))
            this.dataAxis.push(r.year + '年' + r.month + '月')
          })
          this.initChart1()
        })
        getStaTypeMoney().then(res => {
          console.log('res2', res)
          this.dataPie = []
          res.forEach(r => {
            this.dataPie.push({value: r.money.toFixed(2), name: r.type})
          })
          this.initChart2()
        })
      }
      else {
        this.chart1.clear()
        this.chart2.clear()
      }
    }
  },
  watch: {
    drawerV(val) {
      if (!val) {
        this.staChartVisible = false
        this.chart1.clear()
        this.chart2.clear()
      }
    },
  }
}
</script>

<style scoped>

.drawerBox {
  height: 100%;
  width: 100%;
}

.elCard {
  width: 95%;
  height: 100%;
  margin-bottom: 5px;
  flex: 1;
}

.elCard /deep/ .el-card__body {
  padding: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.pointer {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.buttons {
  height: 100%;
  width: 100%;
  padding: 30px 10px;
  overflow: auto;
}

.staChart {
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  background-color: #FFF;
  padding: 10px;
  width: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: -20;
  transition: width 0.5s, height 0.5s, left 0.5s, bottom 0.5s;
}

.staChart2 {
  z-index: 999;
  width: 70vw;
  height: 60vh;
  left: calc(18vw + 0px);
  bottom: 20vh;
  transition: width 0.5s, height 0.5s, left 0.5s, bottom 0.5s, z-index 0s linear 0.5s;
}

.chartContainer {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  padding: 30px;
}

#chart1 {
  margin-top: 60px;
  margin-left: 60px;
}

#chart2 {
  margin-top: 60px;
}

</style>
