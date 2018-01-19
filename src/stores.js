export default {
    // 存储状态值
    state: {
        items: [],
        index: 0,
        image: ''
    },
    // 状态值的改变方法,操作状态值
    // 提交mutations是更改Vuex状态的唯一方法
    mutations: {
        // 修改state，第一个参数就是state
        // 注入所选大屏项目的数据
        screenItem(state,params){
            state=params
        },
        //新建图表
        createItem(state, string) {
            state.items.push({
                id: state.items.length,
                type: string,
                canvasId: state.items.length + string,
                w: 300,
                h: 260,
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
        //激活编辑
        draw(state, index) {
            //    激活序号
            state.index = index;
            var self = state;

            /*-------------------------- +
               获取id, class, tagName
               +-------------------------- */

            var get = {
                byClass: function (sClass, oParent) {
                    var aClass = [];
                    var reClass = new RegExp("(^| )" + sClass + "( |$)");
                    var aElem = this.byTagName("*", oParent);
                    for (var i = 0; i < aElem.length; i++)
                        reClass.test(aElem[i].className) && aClass.push(aElem[i]);
                    return aClass;
                },
                byTagName: function (elem, obj) {
                    return (obj || document).getElementsByTagName(elem);
                }
            };
            var dragMinWidth = 200;     //最小尺寸
            var dragMinHeight = 200;

            /*-------------------------- +
               改变大小函数
               +-------------------------- */
            function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
                handle.onmousedown = function (event) {
                    var event = event || window.event;
                    var disX = event.clientX - handle.offsetLeft;
                    var disY = event.clientY - handle.offsetTop;
                    var iParentTop = oParent.offsetTop;
                    var iParentLeft = oParent.offsetLeft;
                    var iParentWidth = oParent.offsetWidth;
                    var iParentHeight = oParent.offsetHeight;
                    document.onmousemove = function (event) {
                        var event = event || window.event;
                        var iL = event.clientX - disX;
                        var iT = event.clientY - disY;
                        var maxW =
                            document.documentElement.clientWidth - oParent.offsetLeft - 2;
                        var maxH =
                            document.documentElement.clientHeight - oParent.offsetTop - 2;
                        var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                        var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
                        isLeft && (oParent.style.left = iParentLeft + iL + "px");
                        isTop && (oParent.style.top = iParentTop + iT + "px");
                        iW < dragMinWidth && (iW = dragMinWidth);
                        iW > maxW && (iW = maxW);
                        lockX || (oParent.style.width = iW + "px");
                        iH < dragMinHeight && (iH = dragMinHeight);
                        iH > maxH && (iH = maxH);
                        lockY || (oParent.style.height = iH + "px");
                        if (
                            (isLeft && iW == dragMinWidth) ||
                            (isTop && iH == dragMinHeight)
                        )
                            document.onmousemove = null;

                        return false;
                    };
                    //拉伸后的宽高存入items
                    document.onmouseup = function () {
                        self.items[oParent.id].w = oParent.style.width;
                        self.items[oParent.id].h = oParent.style.height;
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };

                    return false;
                };
            }

            /*-------------------------- +
              拖拽函数
              +-------------------------- */
            function drag(oDrag, handle) {
                var disX = 0;
                var disY = 0;
                handle = handle || oDrag;
                handle.style.cursor = "move";
                handle.onmousedown = function (event) {
                    var event = event || window.event;
                    disX = event.clientX - oDrag.offsetLeft;
                    disY = event.clientY - oDrag.offsetTop;
                    document.onmousemove = function (event) {
                        var event = event || window.event;
                        var iL = event.clientX - disX;
                        var iT = event.clientY - disY;
                        var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                        var maxT =
                            document.documentElement.clientHeight - oDrag.offsetHeight;
                        iL <= 0 && (iL = 0);
                        iT <= 0 && (iT = 0);
                        iL >= maxL && (iL = maxL);
                        iT >= maxT && (iT = maxT);
                        oDrag.style.left = iL + "px"; //相对于父元素左侧的距离
                        oDrag.style.top = iT + "px";

                        return false;
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                        this.releaseCapture && this.releaseCapture();
                        self.items[oDrag.id].x = oDrag.style.left; // 坐标存入item
                        self.items[oDrag.id].y = oDrag.style.top;
                    };
                    this.setCapture && this.setCapture();
                    return false;
                };
            }

            //  点击激活某个图形，调用拖拽函数drag和改变大小函数resize
            $("#dialogWrap>div").click(function () {
                $(this).addClass("active");
                $(this)
                    .siblings()
                    .removeClass("active");
                var oDrag = $(this)[0]; //获取document对象
                var oTitle = get.byClass("title", oDrag)[0];
                var oDialog = get.byClass("dialog", oDrag)[0];
                var oL = get.byClass("resizeL", oDrag)[0];
                var oT = get.byClass("resizeT", oDrag)[0];
                var oR = get.byClass("resizeR", oDrag)[0];
                var oB = get.byClass("resizeB", oDrag)[0];
                var oLT = get.byClass("resizeLT", oDrag)[0];
                var oTR = get.byClass("resizeTR", oDrag)[0];
                var oBR = get.byClass("resizeBR", oDrag)[0];
                var oLB = get.byClass("resizeLB", oDrag)[0];
                drag(oDrag, oDialog); //可以拖拽
                //四角
                resize(oDrag, oLT, true, true, false, false);
                resize(oDrag, oTR, false, true, false, false);
                resize(oDrag, oBR, false, false, false, false);
                resize(oDrag, oLB, true, false, false, false);
                //四边
                resize(oDrag, oL, true, false, false, true);
                resize(oDrag, oT, false, true, true, false);
                resize(oDrag, oR, false, false, false, true);
                resize(oDrag, oB, false, false, true, false);
            });


        },
        // 删除图表
        close(state, index) {
            state.items.splice(index, 1);
        },
        screenCapture(state,params) {
            // html2canvas(document.querySelector("#dialogWrap")).then(canvas => {
            //     state.image = canvas.toDataURL();
            // });
            state.image =params;
        },
        back(state){
            // var params = JSON.stringify(state);
            // 把params传回数据库
        }
        // 提交载荷 Payload，第一个参数就是state，第二个参数是载荷。
        //   add(state, n) {
        //     state.count += n
        //   }
    },
    // actions用于处理异步事件，最后还是需要提交mutations来改变state
    actions: {
        // 这里使用context来提交mutations
        increment(context) {
            context.commit('increment')
        },
        incrementAsync(context) {
            setTimeout(() => {
                context.commit('increment')
            }, 1000)
        },
        incrementAsyncWithValue(context, value) {
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
