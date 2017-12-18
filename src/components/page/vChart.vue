<template>
   <div :id="chartId" :width="width" :height="height"></div>
</template>

<script>
    import echarts from "echarts";
    export default{
        data:{

        },
        props:{
             canvasId: {
                type: String,
                default: ''
            },
            width: {
                type: [String, Number],
                default: 500
            },
            height: {
                type: [String, Number],
                default: 400
            },
            type: {
                type: String,
                default: 'bar',
            },
            data: {
                type: Array,
                default: [],
            },
            options: {
                type: Object,
                required: false
            }
        }
    }
</script>