import axios from "axios";
import {Message} from "element-ui";

const BASE_URL = 'http://localhost:8082'

export function getData() {
  // console.log('getData')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${BASE_URL}/getData`,
      // data: ''
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('获取数据成功')
    }).catch((error) => {
      reject(error)
      Message.error('获取数据失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function getDisMonth() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${BASE_URL}/getDisMonth`,
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('获取月份成功')
    }).catch((error) => {
      reject(error)
      Message.error('获取月份失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function getDisType() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${BASE_URL}/getDisType`,
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('获取类型成功')
    }).catch((error) => {
      reject(error)
      Message.error('获取类型失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function getOrder(data) {
  // console.log('getOrder', data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/getOrder`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data[0])
      Message.success('获取订单成功')
    }).catch((error) => {
      reject(error)
      Message.error('获取订单失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function getStaMonthMoney() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${BASE_URL}/getStaMonthMoney`,
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('获取月份统计数据成功')
    }).catch((error) => {
      reject(error)
      Message.error('获取月份统计数据失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function getStaTypeMoney() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${BASE_URL}/getStaTypeMoney`,
    }).then((response) => {
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('获取类型统计数据成功')
    }).catch((error) => {
      reject(error)
      Message.error('获取类型统计数据失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function siftMonth(data) {
  // console.log('getOrder', data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/siftMonth`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('筛选成功')
    }).catch((error) => {
      reject(error)
      Message.error('筛选失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function siftType(data) {
  // console.log('getOrder', data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/siftType`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response)       //请求成功返回的数据
      resolve(response.data)
      Message.success('筛选成功')
    }).catch((error) => {
      reject(error)
      Message.error('筛选失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function runSqlCom(data) {
  // console.log('runSql', data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/runSql`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      // console.log(response.data)       //请求成功返回的数据
      if(response.data === 'failure') {
        reject(response.data)
        Message.error('执行Sql失败，请检查Sql语句格式')
      }
      else {
        resolve(response.data)
        Message.success('执行Sql成功')
      }
    })
  })
}

export function addOrder(data) {
  // console.log("addOrder", data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/addOrder`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      resolve(response.data)
      Message.success('添加数据成功')
      // console.log(response)       //请求成功返回的数据
    }).catch((error) => {
      reject(error)
      Message.error('添加数据失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function delOrder(data) {
  // console.log("delOrder", data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/delOrder`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      resolve(response.data)
      Message.success('添加数据成功')
      // console.log(response)       //请求成功返回的数据
    }).catch((error) => {
      reject(error)
      Message.error('添加数据失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}

export function modOrder(data) {
  // console.log("modOrder", data)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/modOrder`,
      data: data
    }).then((response) => {          //这里使用了ES6的语法
      resolve(response.data)
      Message.success('添加数据成功')
      // console.log(response)       //请求成功返回的数据
    }).catch((error) => {
      reject(error)
      Message.error('添加数据失败')
      // console.log(error)     //请求失败返回的数据
    })
  })
}
