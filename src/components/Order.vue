<template>
  <div id="order" class="flexCC">
    <div class="drawerSwitch" @mouseenter="setDrawer"></div>
    <div class="drawerSwitchLeft" @mouseenter="setLeftDrawer"></div>
    <el-table
      :data="dataList"
      height="250"
      style="max-height: 70vh; overflow: auto; max-width: 90vw;"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        align="center"
        :formatter="formatDate"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类别"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="warning" plain @click="beforeMod(scope.row.id)">修改</el-button>
          <el-button size="mini" type="danger" plain @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Drawer ref="drawer" @getdatalist="getDataList" @setdatalist="setDataList"
            @beforeadd="beforeAdd"></Drawer>
    <LeftDrawer ref="leftdrawer" @setdatalist="setDataList"></LeftDrawer>
    <ItemForm ref="item-form" @idetermine="determine"></ItemForm>
  </div>
</template>

<script>
import {getData, addOrder, delOrder, modOrder} from "../api/sql";
import Drawer from "./Drawer";
import ItemForm from "./ItemForm";
import LeftDrawer from "./LeftDrawer";

export default {
  name: "Order",
  components: {LeftDrawer, Drawer, ItemForm},
  data() {
    return {
      dataList: [],
      dialogId: -1,
      method: '',
      drawerV: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getDataList()
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
    },
    getDataList() {
      getData().then(result => {
        this.dataList = result
      })
    },
    setDataList(result) {
      this.dataList = result
    },
    determine(inputForm) {
      if (this.method === 'add') {
        this.add(inputForm)
      } else if (this.method === 'mod') {
        this.mod(inputForm)
      }
    },
    beforeAdd() {
      this.$refs["item-form"].setVisible(true)
      this.$refs["item-form"].setForm('empty')
      this.method = 'add'
    },
    add(inputForm) {
      let form = {
        name: inputForm.name,
        price: inputForm.price,
        date: inputForm.date,
        type: inputForm.type
      }
      addOrder(form).then(res => {
        if (res === 'success') {
          this.$message.success('添加成功!');
          this.getDataList()
          this.$refs["item-form"].setVisible(false)
        }
      }).catch(() => {
        this.$message.error('添加失败')
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {id}
        delOrder(data).then(res => {
          if (res === 'success') {
            this.$message.success('删除成功!');
            this.getDataList()
          }
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    beforeMod(id) {
      this.$refs["item-form"].setVisible(true)
      this.$refs["item-form"].setForm(id)
      this.method = 'mod'
      this.dialogId = id
    },
    mod(inputForm) {
      let form = {
        id: inputForm.id,
        name: inputForm.name,
        price: inputForm.price,
        date: inputForm.date,
        type: inputForm.type
      }
      modOrder(form).then(res => {
        if (res === 'success') {
          this.$message.success('修改成功!');
          this.getDataList()
          this.$refs["item-form"].setVisible(false)
        }
      }).catch(() => {
        this.$message.error('修改失败')
      })
    },
    setDrawer() {
      this.$refs.drawer.setDrawer()
    },
    setLeftDrawer() {
      this.$refs.leftdrawer.setDrawer()
    }
  }
}
</script>

<style scoped>

#order {
  width: 100%;
  height: 100%;
}

.drawerSwitch {
  height: 30vh;
  width: 0.3vw;
  position: absolute;
  right: 0;
  border-radius: 2px;
  background-color: blueviolet;
}

.drawerSwitchLeft {
  height: 30vh;
  width: 0.3vw;
  position: absolute;
  left: 0;
  border-radius: 2px;
  background-color: blueviolet;
}

</style>
