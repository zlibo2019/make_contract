<template>
    <div class="radioBtn">
        <span>{{radioTitle}}</span>
        <label :style="'width:'+rdWidth" :class="{checked:item.checked}" :for="'radio'+index"
               v-for="(item,index) in radioList" :key="index">
            <span>{{item.title}}</span>
            <input :id="'radio'+index" type="radio" name="sample-radio" v-model="item.value" :value="item.value"
                   @click="changeState(item)"/>
        </label>
    </div>
</template>
<script>
	export default {
		name: 'RadBtn',
		props: {
			radioList: {
				type: Array,
				default: []
			},
			radioTitle: {
				type: String,
				default: ''
			},
			rdWidth: {
				type: String,
				default: ''
			},
		},
		methods: {
			changeState(item) {
				this.radioList.forEach(item => {
					item.checked = false; //让所有的不显示，isDelete = false
				});
				item.checked = true;
				this.$emit('changeState', item);
			}
		}
	}
</script>
<style type="text/scss" lang="scss" scoped>
    .radioBtn {
        width: auto;
        min-width: 100px;
        height: 30px;
        float: left;
        >span{
            line-height: 32px;
            font-size: 14px;
            margin-right: 10px;
            float: left;
        }
        label {
            width: 100px;
            height: 30px;
            display: block;
            float: left;
            background: url("icons/radBtnd.png") no-repeat 0 center/16px 16px;
            text-align: left;
            padding-left: 30px;
            input[type=radio] {
                display: none;
            }
            span {
                font-size: 12px;
                line-height: 30px;
            }
        }
        label.checked {
            background: url("icons/radBtns.png") no-repeat 0 center/16px 16px;
        }
    }

</style>
