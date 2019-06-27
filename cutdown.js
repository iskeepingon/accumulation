// <a href="javascript:void(0)" @click="getCode">
//   {{cutdownCount==0?(cutdowned?'重新获取':'获取验证码'):(cutdownCount+'s')}}
// </a>
export default {
  data () {
    return {
      cutdownCount: 0,//倒计时的时间 59s 58s 57s...
      cutdownTimer: 0,//倒计时定时器的timer
      cutdowned: false,//是否倒计时过
      isCutdowning: false//是否正在倒计时
    }
  },
  methods: {
    getCode () {
      if (this.isCutdowning) {
        return
      }
      this.cutdown({
        onStart: () => {
          this.cutdowned = true
          this.isCutdowning = true
        },
        onGoing: (count, timer) => {
          this.cutdownTimer = timer
          this.cutdownCount = count
        },
        onFinish: () => {
          this.isCutdowning = false
        }
      })
    },
    cutdown ({count = 60, gap = 1000, onStart, onGoing, onFinish}) {
      if (typeof onStart === 'function') {
        onStart()
      }
      let timer = setInterval(() => {
        count--
        if (typeof onGoing === 'function') {
          onGoing(count, timer)
        }
        if (count == 0) {
          clearInterval(timer)
          if (typeof onFinish === 'function') {
            onFinish()
          }
        }
      }, gap)
    }
  }
}
