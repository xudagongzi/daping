export default {
    // 存储状态值
    state: {
        items: [],
        index:0
    },
    // 状态值的改变方法,操作状态值
    // 提交mutations是更改Vuex状态的唯一方法
    mutations: {
      // 修改state，第一个参数就是state
      increment(state) {
        state.count++
      },
      createItem(e, string) {
        this.items.push({
          id: this.items.length,
          type: string,
          canvasId: this.items.length + string,
          w: 250,
          h: 250,
          data: [
            { name: "2012", value: 1141 },
            { name: "2013", value: 1499 },
            { name: "2014", value: 2260 },
            { name: "2015", value: 1170 },
            { name: "2016", value: 970 },
            { name: "2017", value: 1450 }
          ],
          options: {
            title: "这里是标题",
            bgColor: "#009688",
            titleColor: "#ffffff",
            fillColor: "#e0f2f1", //柱子，折线的颜色
            axisColor: "#ffffff", //坐标轴及字体颜色
            contentColor: "#999", //网格线颜色
            legendColor: "#ffffff" //图例字体颜色
          }
        });
        window.localStorage.index = 1;
      },
      // 提交载荷 Payload，第一个参数就是state，第二个参数是载荷。
      add(state, n) {
        state.count += n
      }
    },
    // actions用于处理异步事件，最后还是需要提交mutations来改变state
    actions: {
      // 这里使用context来提交mutations
      increment (context) {
        context.commit('increment')
      },
      incrementAsync (context) {
        setTimeout(() => {
          context.commit('increment')
        }, 1000)
      },
      incrementAsyncWithValue (context, value) {
        setTimeout(() => {
          context.commit('add', value)
        }, 1000)
      }
    },
    // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
    getters: {
      done(state) {
        return state.count + 5;
      },
    }
  }
  