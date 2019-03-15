<template>
  <div class="calendar">
    <header>
      <slot name="calendar-title"/>
    </header>
    <div class="calendar-day clearfix">
      <ul class="fl">
        <li v-for="(item, idx) of totalList" :key="idx">
          <span>{{item.value}}</span>
          <p>{{item.label}}</p>
        </li>
      </ul>
      <ul class="fr">
        <li v-for="(item,idx) of colorList" :key="idx">
          <i :style="{'backgroundColor': item.color}"></i>
          <span :title="types[item.type]">{{types[item.type]}}</span>
        </li>
      </ul>
    </div>
    <ul class="calendar-label clearfix">
      <li v-for="(item, idx) of weeks" :key="idx">{{item}}</li>
    </ul>
    <ul class="calendar-num clearfix">
      <li v-for="(item,idx) of dateArr" :key="idx">
        <el-tooltip v-if="item.attendStatus" :visible-arrow="false"
          placement="top" effect="light">
          <div slot="content">
            <Tips :abnormal="item.abnormal" :overTime="item.overTime" :vacation="item.vacation"/>
          </div>
          <span :class="item.isSchedul? '': 'gray'">
            <i
              :style="{'backgroundColor': i.color}"
              v-for="(i,idx) of colorList"
              :key="idx">
              <i class="cirle" v-if="i.type === item.attendStatus">
                {{item.num}}
              </i>
            </i>
            <!-- <i class="cirle" v-if="item.attendStatus === '2'">{{item.num}}</i>
            <i class="cirle" v-if="item.attendStatus ==='1'">{{item.num}}</i>
            <i class="cirle" v-if="item.attendStatus ==='3'">{{item.num}}</i> -->
          </span>
        </el-tooltip>
        <span v-else :class="item.isSchedul? '': 'gray'">{{item.num}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Tips from './calendar-tips.vue'
export default {
  name: 'calendar',
  components: { Tips },
  props: {
    dataList: {
      type: Array,
      default: () => { return [] }
    },
    // 考勤类型
    types: {
      type: Object,
      default: () => {
        return {
          '1': '加班',
          '2': '休假',
          '3': '异常'
        }
      }
    },
    // 考勤类型代表的颜色
    colorList: {
      type: Array,
      default: () => {
        return [
          {color: '#F5C714', type: '1'},
          {color: '#70C259', type: '2'},
          {color: '#FF635D', type: '3'}
        ]
      }
    },
    // 考勤总计
    attendanceTotal: {
      type: Array,
      default: () => {
        return [
          {label: '出勤天数', value: 0},
          {label: '加班时长', value: 0},
          {label: '请假天数', value: 0},
          {label: '异常', value: 0}
        ]
      }
    },
    // 当前需要的月份
    nowDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    },
    // 自定义事件
    event: {
      type: Function,
      dafault: () => {}
    },
    // 自定义星期名
    weeks: {
      type: Array,
      default: () => {
        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    }
  },
  computed: {
    totalList () {
      return this.attendanceTotal
    }
  },
  data () {
    return {
      dateArr: [],
      currentYear: '', // 当前的年数
      currentMonth: '', // 当前月份
      firstDay: '', // 第一天
      firstnow: '', // 当前的星期几
      lineNumber: 6,
      EveryMonthDays: [], // 每个月的天数
      strArr: [],
      str: ''
    }
  },
  created () {
    this.initDate()
  },
  methods: {
    initDate () {
      if (!this.nowDate) { this.nowDate = new Date() }
      this.currentYear = this.nowDate.getFullYear()
      this.currentMonth = this.nowDate.getMonth()
      // 当前月份的第一天
      this.firstDay = new Date(this.currentYear, this.currentMonth, 1)
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
      this.event()
      this.dateArr = this.dateArr.map(x => ({...x, ...this.dataList.find(y => y.num === x.num)}))
      // ajax请求数据
    }
  },
  watch: {
    nowDate (val) {
      val && this.initDate()
    }
  }
}
</script>
<style lang="scss">
.calendar{
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  width: 980px;
  header{
    height: 60px;
    line-height: 60px;
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
        span{
          font-size: 12px;
          color: #767C93;
          letter-spacing: 0.2px;
        }
      }
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
    .cirle{
      cursor: pointer;
      color: #fff;
      display: inline-block;
      width: 30px;
      border-radius: 50%;
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
