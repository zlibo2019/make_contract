<template>
    <div class="transfer" :style="{width,height}">
        <!-- 左侧穿梭框 原料框 -->
        <div class="transfer-left">
            <h3 class="transfer-title">
                <el-checkbox :indeterminate="from_is_indeterminate" v-model="from_check_all"
                             @change='fromAllBoxChange' :disabled="self_from_data.length == 0"></el-checkbox>
                <span class="u-right">选择授权学生</span>
            </h3>
            <!-- 内容区 -->
            <div class="transfer-main">
                <!-- <slot name="from"></slot> -->
                <el-autocomplete class="inline-input" v-model="mySearch" :fetch-suggestions="querySearch"
                        placeholder="请输入学生姓名" :trigger-on-focus="false" @select="handleSelect">
                    <template slot-scope="{ item }">
                        <span>{{ item.value }}</span>
                        <span>{{ item.className }}</span>
                    </template>
                </el-autocomplete>
                <el-tree ref='from-tree' :data="self_from_data" show-checkbox node-key="id" @check='fromTreeChecked'
                         :default-expanded-keys="from_expanded_keys" >
                </el-tree>
            </div>
        </div>
        <!-- 穿梭区 按钮框 -->
        <div class="transfer-center">
            <template v-if='button_text'>
                <p class="transfer-center-item">
                    <el-button type="primary" @click="addTo" :disabled="from_disabled">
                        {{fromButton || '添加'}}
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                </p>
                <p class="transfer-center-item">
                    <el-button type="primary" @click='removeTo' :disabled="to_disabled" icon="el-icon-arrow-left">
                        {{toButton || '移除'}}
                    </el-button>
                </p>
            </template>
            <template v-else>
                <p class="transfer-center-item">
                    <el-button type="primary" @click="addToAims" icon="el-icon-arrow-right" circle
                               :disabled="from_disabled"></el-button>
                </p>
                <p class="transfer-center-item">
                    <el-button type="primary" @click='removeToSource' :disabled="to_disabled" icon="el-icon-arrow-left"
                               circle></el-button>
                </p>
            </template>
        </div>
        <!-- 右侧穿梭框 目标框 -->
        <div class="transfer-right">
            <h3 class="transfer-title">
                <span class="u-right">已选择（{{ studentSelection.length }}）人</span>
            </h3>
            <!-- 内容区 -->
            <div class="transfer-main">
                <el-table id="cardTable" ref="cardTable" border height="100%" :data="transferData" tooltip-effect="dark"
                          highlight-current-row style="width: 100%" @selection-change="selectionChangeStudent"
                          v-loading="tabLoading" @row-click="rowClick"><!--  row-key="device_id"-->
                    <el-table-column type="selection" width="45"></el-table-column>
                    <el-table-column prop="deviceinfo_id" v-if="showIndx"></el-table-column>
                    <el-table-column prop="studentName" label="姓名" align="center"
                                     show-overflow-tooltip></el-table-column>
                    <!--<el-table-column prop="label" label="姓名" align="center"
                                     show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="className" label="班级" align="center"
                                     column-key="className" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
	import {cloneDeepWith, flattenDeep} from "lodash";

	export default {
		data() {
			return {
				from_is_indeterminate: false, // 源数据是否半选
				from_check_all: false, // 源数据是否全选
				to_is_indeterminate: false, // 目标数据是否半选
				to_check_all: false, // 目标数据是否全选
				from_expanded_keys: [], // 源数据展开节点
				to_expanded_keys: [], // 目标数据展开节点
				self_from_data: [...this.from_data], // 左侧数据
				self_to_data: [...this.to_data], // 右侧数据
				from_disabled: true, // 添加按钮是否禁用
				to_disabled: true, // 移除按钮是否禁用
				from_check_keys: [], // 源数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
//				to_check_keys: [], // 目标数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
				showIndx: false,       //是否显示序号
				transferData: [...this.user_data],     //右侧table显示的学生数组
				tabLoading: false,        //表格加载动画
				studentSelection: [] ,      //选中的学生数组
				mySearch:'',            //模糊查询时输入的学生姓名
				fuzzyArr:[],         //模糊查询数组
			};
		},
		props: {
			// 宽度
			width: {
				type: String,
				default: "100%"
			},
			// 高度
			height: {
				type: String,
				default: "320px"
			},
			// 标题
			title: {
				type: Array,
				default: () => ["源列表", "目标列表"]
			},
			// 穿梭按钮名字
			button_text: Array,
			// 源数据
			from_data: {
				type: Array,
				default: () => []
			},
			// 源数据
			user_data: {
				type: Array,
				default: () => []
			},
			// 选中数据
			to_data: {
				type: Array,
				default: () => []
			},
		},
		methods: {
			querySearch(queryString, cb) {
				let fuzzyArr = this.loadAll();
				let results = queryString ? fuzzyArr.filter(this.createFilter(queryString)) : fuzzyArr;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (fuzzyArr) => {
					return (fuzzyArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			/**
			 *  @function: 点击行-选中多选框
			 *  @author: lxr
			 *  @date 2018-09-20
			 **/
			rowClick(row){
				this.$refs.cardTable.toggleRowSelection(row);
            },
			/**
			 *  @function模糊查询下拉列表的点击事件
			 *  @author: wzx
			 *  @date 2018-7-24
			 **/
			handleSelect(item) {
				// console.log("点击选中:",item);
				let vThis = this;
				this.mySearch = '';
				this.transferData.push({"id":item.id,"label":item.value,"className":item.className,"disabled":'true',"pid":item.pid,"userNo":item.userNo,"studentName":item.value});
				let length = this.transferData.length;
				for (let i = 0; i < length; i++) {
					for(let k = i+1;k < length;k++){
						if(this.transferData[k].id == this.transferData[i].id){
							this.transferData.splice(k,1);
							length--;
							k--;
						}
					}
				}
				function ifArrVal(arr, value) {//多维数组判断是否存在某值
					for (let i = 0; i < arr.length; i++) {
						if (arr[i].children instanceof Array) {//判断是否为多维数组
							if (arr[i].children.length > 0) {
								ifArrVal(arr[i].children, value);
							} else {
								if (arr[i].id == value) {
									arr[i].disabled = true;
									// console.log(666666666666, arr[i])
									// vThis.$emit('checkedClick',vThis.transferData[vThis.transferData.length-1])
									vThis.$emit('checkedClick',item)
									break
								}
							}
						}
					}
					return -1;//不存在
				}
				ifArrVal(this.self_from_data, item.id);
			},
			// 添加按钮
			addToAims() {
				// 获取选中通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
				let keys = this.$refs["from-tree"].getCheckedKeys();
				// 选中节点数据
				let arrayCheckedNodes = this.$refs["from-tree"].getCheckedNodes();
				// 半选中节点数据
				let arrayHalfCheckedNodes = this.$refs["from-tree"].getHalfCheckedNodes();
				let getCheckedNodes = this.$refs["from-tree"].getCheckedNodes(true);
				let checkArr = [];
				for (let g = 0; g < getCheckedNodes.length; g++) {
					let getNode = this.$refs["from-tree"].getNode(getCheckedNodes[g]);
					// console.log(getNode.data.group,getCheckedNodes[g])
					if(getNode.data.group == 200){//只选学生
						checkArr.push(getCheckedNodes[g])
					}
				}
				// console.log(checkArr)
				for (let k = 0; k < checkArr.length; k++) {
					let getNode = this.$refs["from-tree"].getNode(checkArr[k]);
					// console.log(getNode,checkArr[k])
					checkArr[k].className = getNode.parent.parent.label+' '+getNode.parent.label
					checkArr[k].disabled = 1;
				}
				$('.transfer-left .is-indeterminate').removeClass('is-indeterminate');
				//清空所有选中状态
				this.$refs["from-tree"].setCheckedKeys([]);
				this.from_disabled = true;

                if(this.transferData.length>0){
	                this.transferData = this.transferData.concat(checkArr)
                }else{
	                this.transferData = checkArr
				}
				// console.log("getCheckedNodes",this.transferData,checkArr)
				let length = this.transferData.length;
				for (let i = 0; i < length; i++) {
					for(let k = i+1;k < length;k++){
						if(this.transferData[k].id == this.transferData[i].id){
							this.transferData.splice(k,1);
							length--;
							k--;
						}
					}
				}
				this.from_check_all = false;//情况选中状态
				this.$emit('showSelected',this.transferData)
				// console.log(123, this.transferData,'----------', getCheckedNodes)
			},
			// 移除按钮
			removeToSource() {
				$('.transfer-left .is-indeterminate').removeClass('is-indeterminate');
				$('.transfer-right .is-indeterminate').removeClass('is-indeterminate');
				let vThis = this;
				function ifArrVal(arr, value) {//多维数组判断是否存在某值
					for (let i = 0; i < arr.length; i++) {
						if (arr[i].children instanceof Array) {//判断是否为多维数组
							if (arr[i].children.length > 0) {
								ifArrVal(arr[i].children, value);
							} else {
								if (arr[i].id == value) {
									arr[i].disabled = 0;
									// console.log(666666666666, i,arr[i])
									break
								}
							}
						}
					}
					return -1;//不存在
				}
                // console.log(888,this.studentSelection)
				for (let k = 0; k < this.studentSelection.length; k++) {
					ifArrVal(vThis.self_from_data, vThis.studentSelection[k].id)
				}
				let allLen = this.transferData.length,
					hasLen = this.studentSelection.length;
				let allRolesCodeList =[];
				//中间值
				for(let i = 0; i < allLen; i++) {
					allRolesCodeList.push(this.transferData[i].id);
				}
				//去重
				for(let i = 0; i < hasLen ; i++) {
					// console.log(7777,allRolesCodeList.indexOf(this.studentSelection[i].id))
					if(allRolesCodeList.indexOf(this.studentSelection[i].id) != -1) {
						this.transferData.splice(allRolesCodeList.indexOf(this.studentSelection[i].id),1);
						allRolesCodeList.splice(allRolesCodeList.indexOf(this.studentSelection[i].id),1);
					}
				}
				// console.log(1111,this.transferData,)
			},
			// 源树选中事件 - 是否禁用穿梭按钮
			fromTreeChecked(nodeObj, treeObj) {
				this.from_check_keys = treeObj.checkedNodes;
				// console.log(999,this.from_check_keys);
			},
			// 目标树选中事件 - 是否禁用穿梭按钮
			/*toTreeChecked(nodeObj, treeObj) {
				this.to_check_keys = treeObj.checkedNodes;
			},*/
			// 源数据 总全选checkbox
			fromAllBoxChange(val) {
				if (val) {
					this.from_is_indeterminate = false;
					this.$refs["from-tree"].setCheckedNodes(this.self_from_data);
					//若已全部选中，则不可在被选中
					let getCheckedNodes = this.$refs["from-tree"].getCheckedNodes(true);
					if(getCheckedNodes.length == 0){
						this.from_disabled = true;
						this.from_check_all = false;
					}else{
						this.from_disabled = false;
						this.from_check_all = true;
					}
					// console.log('11111',val,getCheckedNodes)
				} else {
					this.$refs["from-tree"].setCheckedNodes([]);
					this.from_check_keys = [];
				}
			},
			// 目标数据 总全选checkbox
			/**
			 *  @function指纹状态下选中的表格中的哪些行
			 *  @author: wzx
			 *  @date 2018-7-23
			 **/
			selectionChangeStudent(val) {
				this.studentSelection = val;
				// console.log(6868, this.studentSelection)
				if (this.studentSelection.length > 0) {
					this.to_disabled = false
				}else{
					this.to_disabled = true
                }
			},
			/**
			 *  @function加载模糊查询列表方法
			 *  @author: wzx
			 *  @date 2018-7-23
			 **/
			loadAll() {
				this.fuzzyArr = [];     //数组清空
				let vThis = this;
				let classArr = []
				function ifArrVal(arr, value) {//多维数组判断是否存在某值
					for (let i = 0; i < arr.length; i++) {
						if (arr[i].children instanceof Array) {//判断是否为多维数组
							if (arr[i].children.length > 0 ) {
								if(arr[i].group == 104){//年级
									for(let k=0;k<arr[i].children.length;k++){
										// if(arr[i].children[k].children.length == 0){
										if(arr[i].children[k].group == 105){
											// console.log(`'年级：'${arr[i].label}--'班级：'${arr[i].children[k].label}`,arr[i].children[k].children.length)
											for(let j = 0 ;j<arr[i].children[k].children.length;j++){
												// console.log(6666666666666,arr[i].children[k].children[j].label,value)
												let reg = new RegExp(value);
												if(arr[i].children[k].children[j].label.match(reg)){
													classArr.push(arr[i].label+' '+arr[i].children[k].label)
													// console.log(6666666666666,classArr)
												}
											}
											
										}
									}
								}
								ifArrVal(arr[i].children, value);
							} else {
								let reg = new RegExp(value);
								if(arr[i].label.match(reg)){
									// console.log(787878,arr[i])
									vThis.fuzzyArr.push({"value":arr[i].label,"id":arr[i].id,"pid":arr[i].pid,"userNo":arr[i].userNo});
								}
							}
						}
					}
					for (let i= 0; i<vThis.fuzzyArr.length;i++){
						vThis.fuzzyArr[i].className=classArr[i]
                    }
					return -1;//不存在
				}
				ifArrVal(this.self_from_data, this.mySearch)
				// console.log(999, vThis.fuzzyArr)
				return vThis.fuzzyArr
			},
		},
		computed: {
			// 左侧菜单名
			fromTitle() {
				let [text] = this.title;
				return text;
			},
			// 右侧菜单名
			toTitle() {
				let [, text] = this.title;
				return text;
			},
			// 上部按钮名
			fromButton() {
				if (this.button_text == undefined) {
					return;
				}

				let [text] = this.button_text;
				return text;
			},
			// 下部按钮名
			toButton() {
				if (this.button_text == undefined) {
					return;
				}
				let [, text] = this.button_text;
				return text;
			}
		},
		watch: {
			// 左侧 状态监测
			from_check_keys(val) {
				if (val.length > 0) {
					// 穿梭按钮是否禁用
					this.from_disabled = false;
					// 总半选是否开启
					this.from_is_indeterminate = true;
					// 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等
					let allCheck = this.$refs['from-tree'].getCheckedKeys();
					if (allCheck.includes(this.self_from_data[0].id)) {
						// 关闭半选 开启全选
						this.from_is_indeterminate = false;
						this.from_check_all = true;
					} else {
						this.from_is_indeterminate = true;
						this.from_check_all = false;
					}
				} else {
					this.from_disabled = true;
					this.from_is_indeterminate = false;
					this.from_check_all = false;
				}
			},
			// 右侧 状态监测
			/*to_check_keys(val) {
				if (val.length > 0) {
					// 穿梭按钮是否禁用
					this.to_disabled = false;
					// 总半选是否开启
					this.to_is_indeterminate = true;

					// 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等
					let allCheck = val.filter(item => item.pid == 0);
					if (allCheck.length == this.self_to_data.length) {
						// 关闭半选 开启全选
						this.to_is_indeterminate = false;
						this.to_check_all = true;
					} else {
						this.to_is_indeterminate = true;
						this.to_check_all = false;
					}
				} else {
					this.to_disabled = true;
					this.to_is_indeterminate = false;
					this.to_check_all = false;
				}
			}*/
			// 监听外部传入的数组，每当变化就赋值
			from_data(val){
                this.self_from_data = val;
            },
			user_data(val){
				if(val.length == 0){
					this.from_disabled = true;
					this.from_is_indeterminate = false;
				}else{
					this.from_is_indeterminate = true;
				}
                this.transferData = val;
            }
		},
        mounted(){
//	        this.fuzzyArr = this.loadAll();
        }
	};
</script>

<style scoped>

    .transfer {
        position: relative;
        overflow: hidden;
    }

    .transfer-left {
        position: absolute;
        top: 0;
        left: 0;
    }

    .transfer-right {
        position: absolute;
        top: 0;
        right: 0;
    }

    .transfer-main {
        padding: 10px;
        height: calc(100% - 41px);
        box-sizing: border-box;
        overflow: auto;
    }

    .transfer-left,
    .transfer-right {
        border: 1px solid #ebeef5;
        height: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        vertical-align: middle;
    }

    .transfer-left {
        width: 35%;
    }

    .transfer-right {
        width: 50%;
    }

    .transfer-center {
        position: absolute;
        top: 50%;
        left: 35%;
        width: 15%;
        transform: translateY(-50%);
        text-align: center;
    }

    .transfer-center-item {
        padding: 10px;
        overflow: hidden;
    }

    .transfer-title {
        border-bottom: 1px solid #ebeef5;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        color: #333;
        font-size: 16px;
        background-color: #f5f7fa;
    }

    .transfer-title .el-checkbox {
        margin-right: 10px;
    }
</style>

