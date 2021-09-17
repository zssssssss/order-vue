<template>
  <div id="addForm">
    <el-dialog
      title="添加订单"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <el-form
        ref="form"
        :model="inputForm"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="名称" prop="name" required>
          <el-input v-model="inputForm.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" required>
          <el-input-number v-model.number="inputForm.price" :min="0" :precision="2"
                           placeholder="输入价格"></el-input-number>
        </el-form-item>
        <el-form-item label="日期" prop="date" required>
          <el-date-picker
            v-model="inputForm.date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类别" prop="type" required>
          <el-input v-model="inputForm.type" placeholder="选择类别"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="determine">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getOrder} from "../api/sql";

export default {
  name: "AddForm",
  data() {
    return {
      inputForm: {
        id: null,
        name: '',
        price: 0.00,
        date: '',
        type: ''
      },
      dialogVisible: false,
    }
  },
  methods: {
    setVisible(val) {
      this.dialogVisible = val
    },
    setForm(val) {
      if (val === 'empty') {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      }
      else {
        let data = {
          id: val
        }
        getOrder(data).then(res => {
          this.inputForm = res
          this.inputForm.date = new Date(this.inputForm.date).toLocaleDateString().replace(/[/]/g,'-')
        })
      }
    },
    determine(){
      this.$emit('idetermine', this.inputForm)
    }
  }
}
</script>

<style scoped>

</style>
