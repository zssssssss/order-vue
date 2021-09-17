<template>
  <div id="drawer">
    <el-drawer
      title="使用选择"
      size="200px"
      :visible.sync="drawerV"
      :with-header="false">
      <div class="drawerBox flexCC">
        <el-card class="elCard" style="margin-top: 5px;">
          <div class="pointer flexCC" @click="refresh">刷新</div>
        </el-card>
        <el-card class="elCard">
          <el-upload
            class="elUpload flexCC"
            style=""
            action="http://localhost:8082/action"
            :file-list="fileList"
            :on-success="uploadSuccess"
          >
            <el-card style="width: 100%; height: 100%;">文件导入</el-card>
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
          </el-upload>
        </el-card>
        <el-card class="elCard">
          <div class="pointer flexCC" @click="saveJSON">导出数据</div>
        </el-card>
        <el-card class="elCard" style="">
          <div class="pointer flexCC" @click="beforeAdd">添加订单</div>
        </el-card>
        <el-card class="elCard">
          <div class="pointer flexCC sqlBox" @click="setSqlVisible">
            <span>SQL</span>
          </div>

          <div class="inputSql" :class="sqlVisible && drawerV ? 'inputSql2' : ''">
            <h1 style="text-align: left; margin-left: 30px"
                class="disappear" :class="sqlVisible && drawerV ? 'appear' : ''">Sql语句执行</h1>
            <el-tooltip class="item" effect="light" content="运行" placement="bottom-end">
              <svg class="icon icon_runSql disappear" aria-hidden="true" @click="runSql"
                   :class="sqlVisible && drawerV ? 'appear' : ''">
                <use xlink:href="#icon-yunhang"></use>
              </svg>
            </el-tooltip>
            <el-input
              class="elInput"
              :class="sqlVisible && drawerV ? 'elInput2' : ''"
              type="textarea"
              :rows="7"
              placeholder="请输入Sql语句"
              v-model="sqlCommand">
            </el-input>
          </div>
        </el-card>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {addOrder, runSqlCom} from "../api/sql";
export default {
  name: "Drawer",
  data() {
    return {
      fileList: [],
      drawerV: false,
      sqlVisible: false,
      sqlCommand: '',
    }
  },
  methods: {
    refresh() {
      this.$emit('getdatalist')
    },
    saveJSON(data, filename) {
      data = this.dataList
      if (!filename)
        filename = 'data.json'
      if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4)
      }
      let blob = new Blob([data], {type: 'text/json'})
      this.$saveAs(blob, filename);
      this.$message({
        message: '导出成功',
        type: 'success'
      });
    },
    uploadSuccess(res, file, fileList) {
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        // this.filedata = Array.from(JSON.parse(String(reader.result)));
        Array.from(JSON.parse(String(reader.result))).forEach(async function (order) {
          await addOrder(order)
        })
      };
      this.$emit('getdatalist')
      this.$message.success('导入成功');
    },
    beforeAdd() {
      this.$emit('beforeadd')
    },
    setDrawer() {
      this.drawerV = true
    },
    setSqlVisible() {
      this.sqlVisible = !this.sqlVisible
    },
    runSql() {
      let data = {
        sqlCommand: this.sqlCommand
      }
      runSqlCom(data).then(res => {
        console.log('runSqlComResult', res)
        if(this.sqlCommand.substr(0, 6).toLowerCase() === 'select'){
          this.$emit('setdatalist', res)
        }
        else {
          this.$emit('getdatalist')
        }
      }).catch(error => {
        this.$message.error('失败啦')
      })
    }
  },
  watch: {
    drawerV(val) {
      if (!val) {
        this.sqlVisible = false
        this.sqlCommand = ''
      }
    },
    sqlCommand(val) {
      this.$nextTick(() => {
        this.sqlCommand = val.replace('\\', '    ')
      })
    }
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
  flex:1;
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

.elUpload {
  width: 100%;
  height: 100%;
}

.elUpload /deep/ .el-upload {
  width: 100%;
  height: 100%;
}

.pointer {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.inputSql {
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  background-color: #FFF;

  width: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: -20;
  transition: width 0.5s, height 0.5s, right 0.5s, bottom 0.5s;
}

.inputSql2 {
  z-index: 999;
  width: 50vw;
  height: 60vh;
  right: calc(25vw + 0px);
  bottom: 20vh;
  transition: width 0.5s, height 0.5s, right 0.5s, bottom 0.5s, z-index 0s linear 0.5s;
}

.elInput {
  margin: 10px 30px;
  width: calc(100% - 60px);
  font-size: 20px;
  opacity: 0;
}

.elInput2 {
  opacity: 100%;
  transition-property: opacity;
  transition-delay: 0.5s;
}

.icon_runSql{
  font-size: 30px;
  position: absolute;
  top: 23px;
  left: 170px;
  cursor: pointer;
}

</style>
