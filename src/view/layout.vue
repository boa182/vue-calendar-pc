<template>
  <div class="layout">
    <calendar :nowDate="nowDate" :event="event">
      <p slot="calendar-title">
        <span class="calendar-title">考勤日历</span>
        <el-date-picker
          class="fr"
          :clearable="false"
          @change="changeEvent"
          v-model="nowDate"
          type="month"
          :picker-options="pickerOptions0"/>
      </p>
    </calendar>
  </div>
</template>
<script>
import calendar from '@/components/calendar.vue'
export default {
  name: 'Home',
  components: {calendar},
  data () {
    return {
      nowDate: '', // 当前需要显示的日期
      pickerOptions0: { // 日期选择器限制
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
    changeEvent () {
    },
    event (Arr) { console.log(Arr) }
  },
  created () {
    this.nowDate = new Date()
  }
}
</script>
<style lang="scss">
.layout {
  .calendar-title {
    font-size: 16px;
    font-weight: 600;
    padding-right:20px;
  }
}
</style>
