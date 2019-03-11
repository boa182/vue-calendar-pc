<template>
  <div class="calendar">
    <h2>考勤日历</h2>
    <div class="calendar-content">
      <div class="calendar-select clearfix">
        <el-date-picker class="fl" :clearable="false" @change="initDate"
            v-model="newDate" type="month" :picker-options="pickerOptions0"/>
      </div>
      <div class="calendar-day clearfix">
        <ul class="fl">
          <li>
            <span>{{fdAttDay}}</span>
            <p>出勤天数</p>
          </li>
          <li>
            <span>{{jbzsc}}</span>
            <p>加班时长</p>
          </li>
          <li>
            <span>{{fdLeavedays}}</span>
            <p>请假天数</p>
          </li>
          <li>
            <span>{{fdAbnormaldays}}</span>
            <p>异常</p>
          </li>
        </ul>
        <ul class="fr">
          <li v-for="(item,idx) of colorList" :key="idx">
            <i :class="item.color"></i>
            <span :title="item.label">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <ul class="calendar-label clearfix">
        <li v-for="(item, idx) of tableHead" :key="idx">{{item.title}}</li>
      </ul>
      <ul class="calendar-num clearfix">
        <li v-for="(item,idx) of dateArr" :key="idx">
          <el-tooltip v-if="item.attendStatus" :visible-arrow="false"
            placement="top" effect="light">
            <div slot="content">
              <Tips :abnormal="item.abnormal" :overTime="item.overTime" :vacation="item.vacation" :tips="tips"/>
            </div>
            <span :class="item.isSchedul? '': 'gray'">
              <i class="span-green" v-if="item.attendStatus === '3'">{{item.num}}</i>
              <i class="span-orange" v-if="item.attendStatus ==='2'">{{item.num}}</i>
              <i class="span-red" v-if="item.attendStatus ==='1'">{{item.num}}</i>
            </span>
          </el-tooltip>
          <span v-else :class="item.isSchedul? '': 'gray'">{{item.num}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Tips from './calendar-tips.vue'
export default {
  name: 'calendar',
  components: { Tips },
  data () {
    return {
      visible: false,
      fdAttDay: 0, // 实际出勤天数
      fdLeavedays: 0, // 请假天数
      jbzsc: 0, // 加班总时长
      fdAbnormaldays: 0, // 异常天数
      colorList: [
        {color: 'orange', label: '加班'},
        {color: 'green', label: '休假'},
        {color: 'red', label: '异常'}
      ],
      statisticalMonth: '', // 传给后台的每月第一天
      dateArr: [],
      newDate: '', // 当前的日期
      currentYear: '', // 当前的年数
      currentMonth: '', // 当前月份
      firstDay: '', // 第一天
      firstnow: '', // 当前的星期几
      lineNumber: 6,
      EveryMonthDays: [], // 每个月的天数
      strArr: [],
      tableHead: [
        {title: '周一'},
        {title: '周二'},
        {title: '周三'},
        {title: '周四'},
        {title: '周五'},
        {title: '周六'},
        {title: '周日'}],
      str: '',
      tips: {},
      pickerOptions0: {
        disabledDate (time) {
          let currentYear = (new Date()).getFullYear()
          let currentMont = (new Date()).getMonth()
          let firstDate = new Date(currentYear, currentMont, 1)
          let beforeMonth = firstDate.setMonth(firstDate.getMonth() - 1)
          let AfterMonth = firstDate.setMonth(firstDate.getMonth() + 2)
          return time.getTime() > AfterMonth || time.getTime() < beforeMonth
        }
      }
    }
  },
  methods: {
    initDate () {
      if (!this.newDate) { this.newDate = new Date() }
      this.currentYear = this.newDate.getFullYear()
      this.currentMonth = this.newDate.getMonth()
      // 当前月份的第一天
      this.firstDay = new Date(this.currentYear, this.currentMonth, 1)
      this.statisticalMonth = new Date(this.currentYear, this.currentMonth, 1)
      // 第一天是星期几
      this.firstnow = this.firstDay.getDay()
      if (this.firstnow > 0) this.firstnow = this.firstnow - 1
      else if (this.firstnow === 0) this.firstnow = 6
      this.EveryMonthDays = [31, 28 + this.isLeap(this.currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.creatTable()
    },
    isLeap (year) {
    // 判断是否为闰年
      return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
    },
    creatTable () {
      // 创建日历
      this.dateArr = []
      var idx = ''
      var dateStr = ''
      var dateObj = {}
      for (let i = 0; i < this.lineNumber; i++) {
        for (let k = 0; k < 7; k++) {
          idx = i * 7 + k
          dateStr = idx - this.firstnow + 1;
          (dateStr <= 0 || dateStr > this.EveryMonthDays[this.currentMonth]) ? dateStr = '' : dateStr = new Date(this.currentYear, this.currentMonth, dateStr).getDate()
          dateObj = {num: dateStr}
          this.dateArr.push(dateObj)
        }
      }
      // ajax请求数据
      // this.getSchedulingRecord()
      // this.getCalderTotal()
      // this.getAttendInfo()
    }
  },
  created () {
    this.initDate()
  }
}
</script>
<style lang="scss">
.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.calendar{
  float: left;
  width: 50rem;
  height: 28.5rem;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  @media (min-device-width: 1920px) {
    width: 975px;
  }
  i{
    font-style: normal;
  }
  .calendar-day{
    padding: 20px 0 20px 0;
    border-top: 1px solid #EEF0F4;
    .fl{
      li {
        float: left;
        padding-right: 40px;
        text-align: center;
        span:nth-child(1) {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          font-size: 24px;
          color: #253551;
          font-weight: bold;
        }
        p:nth-child(2) {
          font-size: 13px;
          color: #707786;
          line-height: 16px;
          max-width: 80px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .fr{
      float: right;
      position: relative;
      top: 30px;
      li{
        float: left;
        i{
          margin: 0 5px;
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #CFCFCF;
        }
        .orange{
          background: #F5C714;
        }
        .green{
          background: #70C259;
        }
        .red{
          background: #FF635D;
        }
        span{
          font-size: 12px;
          color: #767C93;
          letter-spacing: 0.2px;
        }
      }
    }
  }
  .calendar-select{
    padding: 19px 0;
    >p{
      cursor: pointer;
      margin-left: 18px;
      float: right;
      font-size: 13px;
      color: #707786;
      height: 28px;
      line-height: 28px;
      width: 73px;
      background: #FFFFFF;
      border: 1px solid #EEF0F4;
      border-radius: 4px;
      text-align: center;
      transition: all 0.5s linear;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    >p:hover {
      border: 1px solid #3AA5FF;
      color:#3AA5FF;
      transition: all 0.5s linear;
    }
  }
  .calendar-label{
    li{
      float: left;
      width: 108px;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      color: #767C93;
      text-align: center;
      @media (min-device-width: 1920px) {
        width: 133px;
      }
    }
  }
  .calendar-num {
    li{
      float: left;
      width: 108px;
      height: 30px;
      line-height: 30px;
      padding: 5px 0;
      text-align: center;
      @media (min-device-width: 1920px) {
        width: 133px;
      }
    }
    .gray{
      color: #B9BECE;
    }
    .span-green{
      cursor: pointer;
      color: #fff;
      display: inline-block;
      width: 30px;
      border-radius: 50%;
      background: #70C259;
      background-image: linear-gradient(-180deg, #70C259 3%, #B2D687 99%);
    }
    .span-red{
      cursor: pointer;
      display: inline-block;
      width: 30px;
      border-radius: 50%;
      background: #FF635D;
      background-image: linear-gradient(-180deg, #FF635D 3%, #FF944B 100%);
      color: #fff;
    }
    .span-orange{
      cursor: pointer;
      color: #fff;
      display: inline-block;
      width: 30px;
      border-radius: 50%;
      background: #F5C714;
      background-image: linear-gradient(-180deg, #F5C714 0%, #FDB33F 100%);
    }
  }
}
.pop-box{
  height: 60px;
  p{
    box-sizing: border-box;
    font-size: 12px;
    color: #253551;
    line-height: 22px;
  }
}
.el-tooltip__popper.is-light{
  border: 1px solid #EEF0F4;
  box-shadow: 0 8px 8px 0 rgba(0,0,0,0.05);
  border-radius: 2px;
}
</style>
