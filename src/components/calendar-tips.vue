<template>
  <div class="calendar-tips">
    <template v-if="abnormalList.length > 0">
      <div v-for="(a, index) of abnormalList" :key="index">
        <p class="pt-10">异常类型：{{a.abnType}}</p>
        <p>上班有效卡：{{a.abnStartDate||tips.noneCalendar}}</p>
        <p>下班有效卡：{{a.abnEndDate||tips.noneCalendar}}</p>
      </div>
    </template>
    <template v-if="overTimeList.length > 0">
      <div v-for="(o, i) of overTimeList" :key="i">
        <p class="pt-10">加班类型：{{o.overTypeName}}</p>
        <p>加班时间：{{o.overBeginDate}} ~ {{o.overEndDate}}</p>
        <p>申请时长：{{o.actualOverTime}}</p>
      </div>
    </template>
    <template  v-if="vacationList.length > 0">
      <div v-for="(v,idx) of vacationList" :key="idx">
        <p class="pt-10">请假类型：{{v.vaType}}</p>
        <p>申请时间：{{v.vaStartDate}} ~ {{v.vaEndDate}}</p>
        <p>申请时长：{{v.value}}</p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'calendar-tips',
  props: {
    abnormal: {
      type: Array,
      default: () => []
    },
    overTime: {
      type: Array,
      default: () => []
    },
    vacation: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    abnormalList () {
      return this.abnormal
    },
    overTimeList () {
      return this.overTime
    },
    vacationList () {
      return this.vacation
    }
  }
}
</script>
<style lang="scss">
.calendar-tips {
  .pt-10{
    padding-top:10px;
  }
  p{
    line-height: 18px;
  }
}
</style>
