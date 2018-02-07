<template>
    <div class="demo-region">
        <Region :clearable="true" :selected="selected" :limitLen="limitLen" @change="regionCahge" />
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Region from  '../components/Region.vue';
    export default {
        name: 'demo-region',
        components:{
        	Region
        },
        data() {
            return {
                selected: ['6', '76', '693'], //初始化
                limitLen:2 //显示成都,1只显示省，默认为3显示省市区
            }
        },
        created() {},
        methods: {
            regionCahge(value) {
                console.log(value.join(','));
            }
        },
        mounted() {}
    }
</script>
<style lang="less" scoped>

</style>