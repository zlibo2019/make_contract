<template>
    <div class="button-div" :style="'width:'+btnWidth+';height:'+btnHeight">
        <button :disabled="dised0 || dised || dised1 || dised2" type="button" class="button"
                :style="[dised ? styleA : '',dised0 ? customMoban : '',dised2 ? styleB:'']"
                :class="btnClass" @click="clickbtn(data.act)" @mouseover="mover = true" @mouseout="mover = false">
            <img src="./icons/load1.gif" v-if="loaded == true" alt="">
            <img :src="mover==true?data.iconLAct: data.iconL" v-if="iconLeft" alt="">
            <span :style="'font-size:'+btnFontSize">{{ title }}</span>
            <img :src="data.iconR" v-if="iconRight" alt="">
        </button>
        <div v-if="dised1 || loaded" class="moban"></div>
    </div>
</template>

<script>

	export default {
		props: {
			title: {
				type: String,
				default: '标题'
			},
			data: {
				type: Object,
				default() {
					return {
						title: '标题'
					}
				}
			},
			//按钮颜色：gray、black、red、yellow、green、blue可选。(必选)
			//向右箭头按钮：rarrow；向左箭头按钮：larrow。
			//自定义class写按钮样式
			btnClass: {
				type: String,
				default() {
					return 'gray'
				}
			},
			dised: {//按钮禁用状态，默认样式18-3-19修改,与custom1样式配对
				type: Boolean,
				default() {
					return false
				}
			},
			dised0: {//按钮禁用状态，外层自定义行内style样式
				type: Boolean,
				default() {
					return false
				}
			},
			dised1: {//按钮禁用状态，默认启用(添加一白色蒙版)
				type: Boolean,
				default() {
					return false
				}
			},
			dised2: {//按钮禁用状态，默认启用（背景使用灰色）
				type: Boolean,
				default() {
					return false
				}
			},
			styleA: {//配合dised使用，普通背景样式
				type: Object,
				default() {
					return {
						background: '#EBEBEB',
						color: '#9A9A9A',
						cursor: 'not-allowed'
					}
				}
			},
			styleB: {//配合dised2使用，背景图片
				type: Object,
				default() {
					return {
						'background': "url(" + require('./icons/btn_disable.png') + ")no-repeat center center/100% 100%"
					}
				}
			},
			//自定义style写按钮禁用蒙版样式,如背景色，字体颜色等---> 需要跟随dised0使用
			customMoban: {
				type: Object,
				default() {
					return {}
				}
			},
			iconLeft: {//按钮左边有图标
				type: Boolean,
				default() {
					return false
				}
			},
			iconRight: {//按钮右边有图标
				type: Boolean,
				default() {
					return false
				}
			},
			loaded: {//加载中状态，并开启禁用状态
				type: Boolean,
				default() {
					return false
				}
			},
			btnWidth: {
				type: String,
				default() {
					return ''
				}
			},
			btnHeight: {
				type: String,
				default() {
					return '38px'
				}
			},
			btnFontSize: {
				type: String,
				default() {
					return '1vh'
				}
			}
		},
		data() {
			return {
				active: -1,
				mover: false
			}
		},
		computed: {},
		methods: {
			clickbtn(act) {
				// act = -1
				this.active = act
				this.$emit('click');
			},
		},
		created() {
		}
	}

</script>

<style scoped type="text/scss" lang="scss">
    .button-div {
        display: inline-block;
        position: relative;
        vertical-align: middle;

        .moban { //禁用样式dised1(透明白色)
            position: absolute;
            background: #fff;
            opacity: 0.5;
            margin: 0 auto;
            left: 0;
            right: 0;
            height: 100%;
            cursor: not-allowed;
        }

        .button {
            width: 140px;
            width: 100%;
            line-height: 38px;
            text-align: center;
            font-weight: bold;
            color: #fff;
            text-shadow: 1px 1px 1px #333;
            border-radius: 5px;
            /*margin:0 20px 20px 20px;*/
            position: relative;
            overflow: hidden;
            float: left;
            display: inline;
            cursor: pointer;
            padding: 0 10px;
            outline: none; //去掉光标蓝色的边框

            span, img {
                vertical-align: middle;
            }
            img {
                width: 19%;
            }
        }
        .button:nth-child(6n) {
            margin-right: 0;
        }
        .button.gray {
            color: #8c96a0;
            text-shadow: 1px 1px 1px #fff;
            border: 1px solid #dce1e6;
            box-shadow: 0 1px 2px #fff inset, 0 -1px 0 #a8abae inset;
            background: -webkit-linear-gradient(top, #f2f3f7, #e4e8ec);
            background: -moz-linear-gradient(top, #f2f3f7, #e4e8ec);
            background: linear-gradient(top, #f2f3f7, #e4e8ec);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f2f3f7', endColorstr='#e4e8ec'); /*  IE */
        }
        .button.black {
            border: 1px solid #333;
            box-shadow: 0 1px 2px #8b8b8b inset, 0 -1px 0 #3d3d3d inset, 0 -2px 3px #8b8b8b inset;
            background: -webkit-linear-gradient(top, #656565, #4c4c4c);
            background: -moz-linear-gradient(top, #656565, #4a4a4a);
            background: linear-gradient(top, #656565, #4a4a4a);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#656565', endColorstr='#4a4a4a'); /*  IE */
        }
        .button.red {
            border: 1px solid #b42323;
            box-shadow: 0 1px 2px #e99494 inset, 0 -1px 0 #954b4b inset, 0 -2px 3px #e99494 inset;
            background: -webkit-linear-gradient(top, #d53939, #b92929);
            background: -moz-linear-gradient(top, #d53939, #b92929);
            background: linear-gradient(top, #d53939, #b92929);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d53939', endColorstr='#b92929'); /*  IE */
        }
        .button.yellow {
            border: 1px solid #d2a000;
            box-shadow: 0 1px 2px #fedd71 inset, 0 -1px 0 #a38b39 inset, 0 -2px 3px #fedd71 inset;
            background: -webkit-linear-gradient(top, #fece34, #d8a605);
            background: -moz-linear-gradient(top, #fece34, #d8a605);
            background: linear-gradient(top, #fece34, #d8a605);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fece34', endColorstr='#d8a605'); /*  IE */
        }
        .button.green {
            border: 1px solid #64c878;
            box-shadow: 0 1px 2px #b9ecc4 inset, 0 -1px 0 #6c9f76 inset, 0 -2px 3px #b9ecc4 inset;
            background: -webkit-linear-gradient(top, #90dfa2, #84d494);
            background: -moz-linear-gradient(top, #90dfa2, #84d494);
            background: linear-gradient(top, #90dfa2, #84d494);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#90dfa2', endColorstr='#84d494'); /*  IE */
        }
        .button.blue {
            border: 1px solid #1e7db9;
            box-shadow: 0 1px 2px #8fcaee inset, 0 -1px 0 #497897 inset, 0 -2px 3px #8fcaee inset;
            background: -webkit-linear-gradient(top, #42a4e0, #2e88c0);
            background: -moz-linear-gradient(top, #42a4e0, #2e88c0);
            background: linear-gradient(top, #42a4e0, #2e88c0);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#42a4e0', endColorstr='#2e88c0'); /*  IE */
        }
        .tags:after {
            font-weight: normal;
            position: absolute;
            display: inline-block;
            content: "FREE";
            top: -3px;
            right: -33px;
            color: #fff;
            text-shadow: none;
            width: 85px;
            height: 25px;
            line-height: 28px;
            -webkit-transform: rotate(45deg) scale(.7, .7);
            -moz-transform: rotate(45deg) scale(.7, .7);
            transform: rotate(45deg) scale(.7, .7);
        }
        .gray.tags:after {
            background: #8c96a0;
            border: 2px solid #fff;
        }
        .black.tags:after {
            background: #333;
            border: 2px solid #777;
        }
        .red.tags:after {
            background: #b42323;
            border: 2px solid #df4141;
        }
        .yellow.tags:after {
            background: #d2a000;
            border: 2px solid #fcc100;
        }
        .green.tags:after {
            background: #64c878;
            border: 2px solid #9bebac;
        }
        .blue.tags:after {
            background: #1e7db9;
            border: 2px solid #54b1e9;
        }
        .button.rarrow, .button.larrow {
            overflow: visible;
        }
        .rarrow:after, .rarrow:before, .larrow:after, .larrow:before {
            position: absolute;
            content: "";
            display: block;
            width: 28px;
            height: 28px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        .rarrow:before {
            width: 27px;
            height: 27px;
            top: 6px;
            right: -13px;
            clip: rect(auto auto 26px 2px);
        }
        .rarrow:after {
            top: 6px;
            right: -12px;
            clip: rect(auto auto 26px 2px);
        }
        .gray.rarrow:before {
            background: #d6dbe0;
        }
        .gray.rarrow:after {
            box-shadow: 0 1px 0 #fff inset, -1px 0 0 #b7babd inset;
            background: -webkit-linear-gradient(top left, #f2f3f7, #e4e8ec);
            background: -moz-linear-gradient(top left, #f2f3f7, #e4e8ec);
            background: linear-gradient(top left, #f2f3f7, #e4e8ec);
        }
        .black.rarrow:before {
            background: #333;
        }
        .black.rarrow:after {
            box-shadow: 0 1px 0 #8B8B8B inset, -1px 0 0 #3d3d3d inset, -2px 0 0 #8B8B8B inset;
            background: -webkit-linear-gradient(top left, #656565, #4C4C4C);
            background: -moz-linear-gradient(top left, #656565, #4C4C4C);
            background: linear-gradient(top left, #656565, #4C4C4C);
        }
        .red.rarrow:before {
            background: #B42323;
        }
        .red.rarrow:after {
            box-shadow: 0 1px 0 #E99494 inset, -1px 0 0 #954B4B inset, -2px 0 0 #E99494 inset;
            background: -webkit-linear-gradient(top left, #D53939, #B92929);
            background: -moz-linear-gradient(top left, #D53939, #B92929);
            background: linear-gradient(top left, #D53939, #B92929);
        }
        .yellow.rarrow:before {
            background: #D2A000;
        }
        .yellow.rarrow:after {
            box-shadow: 0 1px 0 #FEDD71 inset, -1px 0 0 #A38B39 inset, -2px 0 0 #FEDD71 inset;
            background: -webkit-linear-gradient(top left, #FECE34, #D8A605);
            background: -moz-linear-gradient(top left, #FECE34, #D8A605);
            background: linear-gradient(top left, #FECE34, #D8A605);
        }
        .green.rarrow:before {
            background: #64C878;
        }
        .green.rarrow:after {
            box-shadow: 0 1px 0 #B9ECC4 inset, -1px 0 0 #6C9F76 inset, -2px 0 0 #B9ECC4 inset;
            background: -webkit-linear-gradient(top left, #90DFA2, #84D494);
            background: -moz-linear-gradient(top left, #90DFA2, #84D494);
            background: linear-gradient(top left, #90DFA2, #84D494);
        }
        .blue.rarrow:before {
            background: #1E7DB9;
        }
        .blue.rarrow:after {
            box-shadow: 0 1px 0 #8FCAEE inset, -1px 0 0 #497897 inset, -2px 0 0 #8FCAEE inset;
            background: -webkit-linear-gradient(top left, #42A4E0, #2E88C0);
            background: -moz-linear-gradient(top left, #42A4E0, #2E88C0);
            background: linear-gradient(top left, #42A4E0, #2E88C0);
        }
        .larrow:before {
            top: 6px;
            left: -13px;
            width: 27px;
            height: 27px;
            clip: rect(2px 26px auto auto);
        }
        .larrow:after {
            top: 6px;
            left: -12px;
            clip: rect(2px 26px auto auto);
        }
        .gray.larrow:before {
            background: #d6dbe0;
        }
        .gray.larrow:after {
            box-shadow: 0 -1px 0 #b7babd inset, 1px 0 0 #fff inset;
            background: -webkit-linear-gradient(top left, #f2f3f7, #e4e8ec);
            background: -moz-linear-gradient(top left, #f2f3f7, #e4e8ec);
            background: linear-gradient(top left, #f2f3f7, #e4e8ec);
        }
        .black.larrow:before {
            background: #333;
        }
        .black.larrow:after {
            box-shadow: 0 -1px 0 #3d3d3d inset, 0 -2px 0 #8B8B8B inset, 1px 0 0 #8B8B8B inset;
            background: -webkit-linear-gradient(top left, #656565, #4C4C4C);
            background: -moz-linear-gradient(top left, #656565, #4C4C4C);
            background: linear-gradient(top left, #656565, #4C4C4C);
        }
        .red.larrow:before {
            background: #B42323;
        }
        .red.larrow:after {
            box-shadow: 0 -1px 0 #954B4B inset, 0 -2px 0 #E99494 inset, 1px 0 0 #E99494 inset;
            background: -webkit-linear-gradient(top left, #D53939, #B92929);
            background: -moz-linear-gradient(top left, #D53939, #B92929);
            background: linear-gradient(top left, #D53939, #B92929);
        }
        .yellow.larrow:before {
            background: #D2A000;
        }
        .yellow.larrow:after {
            box-shadow: 0 -1px 0 #A38B39 inset, 0 -2px 0 #FEDD71 inset, 1px 0 0 #FEDD71 inset;
            background: -webkit-linear-gradient(top left, #FECE34, #D8A605);
            background: -moz-linear-gradient(top left, #FECE34, #D8A605);
            background: linear-gradient(top left, #FECE34, #D8A605);
        }
        .green.larrow:before {
            background: #64C878;
        }
        .green.larrow:after {
            box-shadow: 0 -1px 0 #6C9F76 inset, 0 -2px 0 #B9ECC4 inset, 1px 0 0 #B9ECC4 inset;
            background: -webkit-linear-gradient(top left, #90DFA2, #84D494);
            background: -moz-linear-gradient(top left, #90DFA2, #84D494);
            background: linear-gradient(top left, #90DFA2, #84D494);
        }
        .blue.larrow:before {
            background: #1E7DB9;
        }
        .blue.larrow:after {
            box-shadow: 0 -1px 0 #497897 inset, 0 -2px 0 #8FCAEE inset, 1px 0 0 #8FCAEE inset;
            background: -webkit-linear-gradient(top left, #42A4E0, #2E88C0);
            background: -moz-linear-gradient(top left, #42A4E0, #2E88C0);
            background: linear-gradient(top left, #42A4E0, #2E88C0);
        }
        .button.gray:hover {
            background: -webkit-linear-gradient(top, #fefefe, #ebeced);
            background: -moz-linear-gradient(top, #fefefe, #ebeced);
            background: linear-gradient(top, #fefefe, #ebeced);
        }
        .black:hover {
            background: -webkit-linear-gradient(top, #818181, #575757);
            background: -moz-linear-gradient(top, #818181, #575757);
            background: linear-gradient(top, #818181, #575757);
        }
        .red:hover {
            background: -webkit-linear-gradient(top, #eb6f6f, #c83c3c);
            background: -moz-linear-gradient(top, #eb6f6f, #c83c3c);
            background: linear-gradient(top, #eb6f6f, #c83c3c);
        }
        .yellow:hover {
            background: -webkit-linear-gradient(top, #ffd859, #e3bb38);
            background: -moz-linear-gradient(top, #ffd859, #e3bb38);
            background: linear-gradient(top, #ffd859, #e3bb38);
        }
        .green:hover {
            background: -webkit-linear-gradient(top, #aaebb9, #82d392);
            background: -moz-linear-gradient(top, #aaebb9, #82d392);
            background: linear-gradient(top, #aaebb9, #82d392);
        }
        .blue:hover {
            background: -webkit-linear-gradient(top, #70bfef, #4097ce);
            background: -moz-linear-gradient(top, #70bfef, #4097ce);
            background: linear-gradient(top, #70bfef, #4097ce);
        }
        .gray:active {
            top: 1px;
            box-shadow: 0 1px 3px #a8abae inset, 0 3px 0 #fff;
            background: -webkit-linear-gradient(top, #e4e8ec, #e4e8ec);
            background: -moz-linear-gradient(top, #e4e8ec, #e4e8ec);
            background: linear-gradient(top, #e4e8ec, #e4e8ec);
        }
        .black:active {
            top: 1px;
            box-shadow: 0 1px 3px #111 inset, 0 3px 0 #fff;
            background: -webkit-linear-gradient(top, #424242, #575757);
            background: -moz-linear-gradient(top, #424242, #575757);
            background: linear-gradient(top, #424242, #575757);
        }
        .red:active {
            top: 1px;
            box-shadow: 0 1px 3px #5b0505 inset, 0 3px 0 #fff;
            background: -webkit-linear-gradient(top, #b11a1a, #bf2626);
            background: -moz-linear-gradient(top, #b11a1a, #bf2626);
            background: linear-gradient(top, #b11a1a, #bf2626);
        }
        .yellow:active {
            top: 1px;
            box-shadow: 0 1px 3px #816b1f inset, 0 3px 0 #fff;
            background: -webkit-linear-gradient(top, #d3a203, #dba907);
            background: -moz-linear-gradient(top, #d3a203, #dba907);
            background: linear-gradient(top, #d3a203, #dba907);
        }
        .green:active {
            top: 1px;
            box-shadow: 0 1px 3px #4d7254 inset, 0 3px 0 #fff;
            background: -webkit-linear-gradient(top, #5eac6e, #72b37e);
            background: -moz-linear-gradient(top, #5eac6e, #72b37e);
            background: linear-gradient(top, #5eac6e, #72b37e);
        }
        .blue:active {
            top: 1px;
            box-shadow: 0 1px 3px #114566 inset, 0 3px 0 #fff;
            background: -webkit-linear-gradient(top, #1a71a8, #1976b1);
            background: -moz-linear-gradient(top, #1a71a8, #1976b1);
            background: linear-gradient(top, #1a71a8, #1976b1);
        }
        .gray.rarrow:hover:after, .gray.rarrow:hover:after {
            background: -webkit-linear-gradient(top left, #fefefe, #ebeced);
            background: -moz-linear-gradient(top left, #fefefe, #ebeced);
            background: linear-gradient(top left, #fefefe, #ebeced);
        }
        .black.rarrow:hover:after, .black.larrow:hover:after {
            background: -webkit-linear-gradient(top left, #818181, #575757);
            background: -moz-linear-gradient(top left, #818181, #575757);
            background: linear-gradient(top left, #818181, #575757);
        }
        .red.rarrow:hover:after, .red.larrow:hover:after {
            background: -webkit-linear-gradient(top left, #eb6f6f, #c83c3c);
            background: -moz-linear-gradient(top left, #eb6f6f, #c83c3c);
            background: linear-gradient(top left, #eb6f6f, #c83c3c);
        }
        .yellow.rarrow:hover:after, .yellow.larrow:hover:after {
            background: -webkit-linear-gradient(top left, #ffd859, #e3bb38);
            background: -moz-linear-gradient(top left, #ffd859, #e3bb38);
            background: linear-gradient(top left, #ffd859, #e3bb38);
        }
        .green.rarrow:hover:after, .green.larrow:hover:after {
            background: -webkit-linear-gradient(top left, #aaebb9, #82d392);
            background: -moz-linear-gradient(top left, #aaebb9, #82d392);
            background: linear-gradient(top left, #aaebb9, #82d392);
        }
        .blue.rarrow:hover:after, .blue.larrow:hover:after {
            background: -webkit-linear-gradient(top left, #70bfef, #4097ce);
            background: -moz-linear-gradient(top left, #70bfef, #4097ce);
            background: linear-gradient(top left, #70bfef, #4097ce);
        }
        .gray.rarrow:active:after, .gray.larrow:active:after {
            background: -webkit-linear-gradient(top left, #e4e8ec, #e4e8ec);
            background: -moz-linear-gradient(top left, #e4e8ec, #e4e8ec);
            background: linear-gradient(top left, #e4e8ec, #e4e8ec);
        }
        .black.rarrow:active:after, .black.larrow:active:after {
            background: -webkit-linear-gradient(top left, #424242, #575757);
            background: -moz-linear-gradient(top left, #424242, #575757);
            background: linear-gradient(top left, #424242, #575757);
        }
        .red.rarrow:active:after, .red.larrow:active:after {
            background: -webkit-linear-gradient(top left, #b11a1a, #bf2626);
            background: -moz-linear-gradient(top left, #b11a1a, #bf2626);
            background: linear-gradient(top left, #b11a1a, #bf2626);
        }
        .yellow.rarrow:active:after, .yellow.larrow:active:after {
            background: -webkit-linear-gradient(top left, #d3a203, #dba907);
            background: -moz-linear-gradient(top left, #d3a203, #dba907);
            background: linear-gradient(top left, #d3a203, #dba907);
        }
        .green.rarrow:active:after, .green.larrow:active:after {
            background: -webkit-linear-gradient(top left, #63a870, #72b37e);
            background: -moz-linear-gradient(top left, #63a870, #72b37e);
            background: linear-gradient(top left, #63a870, #72b37e);
        }
        .blue.rarrow:active:after, .blue.larrow:active:after {
            background: -webkit-linear-gradient(top left, #1a71a8, #1976b1);
            background: -moz-linear-gradient(top left, #1a71a8, #1976b1);
            background: linear-gradient(top left, #1a71a8, #1976b1);
        }
        .gray.rarrow:active:after {
            box-shadow: 0 1px 0 #b7babd inset, -1px 0 0 #b7babd inset;
        }
        .gray.larrow:active:after {
            box-shadow: 0 -1px 0 #b7babd inset, 1px 0 0 #b7babd inset;
        }
        .black.rarrow:active:after {
            box-shadow: 0 1px 0 #333 inset, -1px 0 0 #333 inset;
        }
        .black.larrow:active:after {
            box-shadow: 0 -1px 0 #333 inset, 1px 0 0 #333 inset;
        }
        .red.rarrow:active:after {
            box-shadow: 0 1px 0 #640909 inset, -1px 0 0 #640909 inset;
        }
        .red.larrow:active:after {
            box-shadow: 0 -1px 0 #640909 inset, 1px 0 0 #640909 inset;
        }
        .yellow.rarrow:active:after {
            box-shadow: 0 1px 0 #816b1f inset, -1px 0 0 #816b1f inset;
        }
        .yellow.larrow:active:after {
            box-shadow: 0 -1px 0 #816b1f inset, 1px 0 0 #816b1f inset;
        }
        .green.rarrow:active:after {
            box-shadow: 0 1px 0 #4d7254 inset, -1px 0 0 #4d7254 inset;
        }
        .green.larrow:active:after {
            box-shadow: 0 -1px 0 #4d7254 inset, 1px 0 0 #4d7254 inset;
        }
        .blue.rarrow:active:after {
            box-shadow: 0 1px 0 #114566 inset, -1px 0 0 #114566 inset;
        }
        .blue.larrow:active:after {
            box-shadow: 0 -1px 0 #114566 inset, 1px 0 0 #114566 inset;
        }

        ///////////////////////////////////////
        //2018-3-19新增默认按钮样式
        button.custom1 {
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            background: #81AFF7;
            text-shadow: none; //修改样式必选项目
            border: 0px solid #dce1e6; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            border-radius: 2px;
            font-size: 1.8vh;
            letter-spacing: 2px;

            span {
            }
            &:hover {
                background: #A3C7FD;
            }
            &:active {
                background: #6C9BDF;
            }
        }
        //2018/1/18 学生app提交按钮（使用阴影图片）
        button.custom2 {
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            background: url("./icons/btn_hight.png") no-repeat;
            background-size: 100% 100%;
            border-radius: 100px;
            text-shadow: none; //修改样式必选项目
            border: 0px solid #dce1e6; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 1.8vh;
            letter-spacing: 2px;
            padding-top: 0.02rem;
            padding-bottom: 0.02rem;

            span {
                display: inline-block;
                margin-top: -8%;
            }
            &:active {
                background: url("./icons/btn_active.png") no-repeat;
                background-size: 100% 100%;
            }
        }
        button.custom3 { //学生app提交按钮（圆角边框按钮）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            border-radius: 100px;
            text-shadow: none; //修改样式必选项目
            border: 1px solid #37bafd; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 1.8vh;
            letter-spacing: 2px;
            padding-top: 0.02rem;
            padding-bottom: 0.02rem;
            background: transparent;
            color: #37bafd;

            span {
                display: inline-block;
            }
            &:active {
            }
        }
        button.custom4 { //180315企业公众号登录按钮（蓝色背景普通样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 1.8vh;
            letter-spacing: 2px;
            background: #006DFF;
            border: none;
            color: #fff;
            span {
                display: inline-block;
            }
            &:active {
            }
        }
        button.custom5 { //180322售后按钮（蓝色背景普通样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            background: #286EDD;
            text-shadow: none; //修改样式必选项目
            border: 0px solid #dce1e6; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            border-radius: 2px;
            font-size: 1.8vh;
            letter-spacing: 2px;

            span {
            }
            &:hover {
                background: #A3C7FD;
            }
            &:active {
                background: #6C9BDF;
            }
        }
        button.custom6 {
            //180710基教协同教育平台按钮1（灰色背景，hover绿色背景普通样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 12px;
            letter-spacing: 2px;
            padding: 0 20px;
            background: #F5F6F5;
            border: 1px solid #e6e6e6;
            color: #999;
            &:hover {
                background: #1cab7d;
                border: 1px solid #1cab7d;
                color: #fff;
            }
            span {
                display: inline-block;
            }
            &:active {
                background: #1b9a71;
                color: #fff;
            }
        }
        button.custom7 {
            //180710基教协同教育平台按钮2（灰色背景，hover 浅绿色背景，取消按钮样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 12px;
            letter-spacing: 2px;
            padding: 0 20px;
            background: #F2F2F2;
            border: 1px solid #e6e6e6;
            color: #A5A5A5;
            &:hover {
                background: #f9fffc;
                border: 1px solid #1cab7d;
            }
            span {
                display: inline-block;
            }
            &:active {
                background: #f9fffc;
            }
        }
        button.custom8 {
            //180710基教协同教育平台按钮3（绿色背景，确定按钮样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 12px;
            letter-spacing: 2px;
            padding: 0 20px;
            background: #1cab7d;
            border: 1px solid #1cab7d;
            color: #fff;
            &:hover {
                background: #1b9a71;
                /*border: 1px solid #1cab7d;*/
            }
            span {
                display: inline-block;
            }
            &:active {
                background: #1b9a71;
            }
        }
        button.custom10 {
            //180710基教协同教育平台按钮2（白色背景，hover 绿色背景，取消按钮样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 12px;
            letter-spacing: 2px;
            padding: 0 25px;
            background: #fff;
            border: 1px solid #1cab7d;
            color: #1cab7d;
            &:hover {
                background: #1b9a71;
                border: 1px solid #1b9a71;
                color: #fff;
            }
            span {
                display: inline-block;
            }
            &:active {
                background: #1b9a71;
                color: #fff;
            }
        }

        button.custom11 {
            //180710基教协同教育平台按钮4（灰色点状线边框，中空）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 12px;
            letter-spacing: 2px;
            padding: 0 20px;
            background: transparent;
            border: 1px dashed #bbb;
            color: #1cab7d;
            &:hover {
                background: #1cab7d;
                border: 1px solid #1cab7d;
                color: #fff;
            }
            span {
                display: inline-block;
            }
            &:active {
                background: #1b9a71;
                color: #fff;
            }
        }
        button.custom12 {
            //180710基教协同教育平台按钮3（红色背景，删除按钮样式）
            width: 100%;
            height: 100%;
            line-height: 150%; //修改样式必选项目
            text-shadow: none; //修改样式必选项目
            box-shadow: none; //修改样式必选项目
            font-weight: normal; //修改样式必选项目
            font-size: 12px;
            letter-spacing: 2px;
            padding: 0 20px;
            background: #F2F2F2;
            border: 1px solid #FF4E4E;
            color: #FF4E4E;
            &:hover {
                background: #FF4E4E;
                color: #fff;
                /*border: 1px solid #1cab7d;*/
            }
            span {
                display: inline-block;
            }
            &:active {
                background: #FF4E4E;
                color: #fff;
            }
        }
    }
</style>
