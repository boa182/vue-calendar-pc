# vue-calendar

>我在工作中基于vue+element封装的一个可显示员工出勤排班情况的考勤日历组件,适用于pc端。
Attendance calendar component

## 运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

## props
- 参数 | 说明 | 类型 | 可选值 | 默认值

```
types | 考勤类型 | Object | -- | { '1': '加班', '2': '休假', '3': '异常'}

colorList | 考勤类型代表的颜色 | Array<Object> | -- | [{color: 'orange', type: '1'}]

attendanceTotal | 考勤合计 | Array<Object> | -- | [{label: '出勤天数', value: 0}]

nowDate | 当前需要展示的月份 | Date | -- | new Date()

event | 自定义事件 | Function | -- | --
```
