export default {
  data () {
    return {
      cutdownCount: 0,
      cutdownTimer: 0,
      cutdowned: false,
      isCutdowning: false
    }
  },
  methods: {
    getCode () {
      if (this.isCutdowning) {
        return
      }
      this.cutdown({
        count: 10,
        gap: 1000,
        onStart: () => {
          this.isCutdowning = true
        },
        onGoing: (count, timer) => {
          this.cutdownTimer = timer
          this.cutdownCount = count
        },
        onFinish: () => {
          this.cutdowned = true
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
