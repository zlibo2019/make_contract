<!-- 树状选择器 -->
<template>
  <el-popover
    ref="popover"
    placement="bottom-start"
    trigger="click"
    @show="onShowPopover"
    @hide="onHidePopover">
    <el-tree
      ref="tree"
      class="select-tree"
      highlight-current
      :style="`min-width: ${treeWidth}`"
      :data="data"
      :props="props"
      node-key="id"
      :show-checkbox="Array.isArray(this.value)"
      :default-checked-keys="defaultKeys"
      :expand-on-click-node="true"
      :filter-node-method="filterNode"
      :default-expand-all="true"
      @node-click="onClickNode"
      @check="getCheckedKeys"
      >
    </el-tree>
    <el-input
      slot="reference"
      ref="input"
      v-model="labelModel"
      :size="size"
      maxlength='0'
      readonly
      :style="`width: ${width}px`"
      :class="{ 'rotate': showStatus }"
      suffix-icon="el-icon-arrow-down"
      :placeholder="placeholder">
    </el-input>
    <el-button class="normal" size="mini" v-if="Array.isArray(this.value)" plain @click="onCloseTree">取消</el-button>
    <el-button class="normal" size="mini" v-if="Array.isArray(this.value)" plain @click="confirmChoose">确定</el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 接收绑定参数
    value: [String,Number,Array],
    // 默认选中的key
    defaultKeys: Array,
    // 输入框宽度
    width: String,
    // 选项数据
    options: {
      type: Array,
      required: true,
    },
    // 输入框尺寸
    size: {
      type: String,
      default: 'small',
    },
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择',
    },
    // 树节点配置选项
    props: {
      type: Object,
      required: false,
      default: () => ({
        parent_id: 'parent_id',   // 父级唯一标识
        id: 'id',          // 唯一标识
        label: 'label',       // 标签显示
        children: 'children', // 子级
      }),
    },
  },
  // 设置绑定参数
  model: {
    // prop: 'value',
    event: 'selected',
  },
  computed: {
    // 是否为树状结构数据
    dataType() {
      const jsonStr = JSON.stringify(this.options);
      return jsonStr.indexOf(this.props.children) !== -1;
    },
    // 若非树状结构，则转化为树状结构数据
    data() {
      return this.dataType ? this.options : this.switchTree();
    },
  },
  watch: {
    labelModel(val) {
        console.log(1111,val);
        if (!val) {
            this.valueModel = '';
        }
        this.$refs.tree.filter(val);
      
    },
    value(val) {
        console.log(222,val);
        if(Array.isArray(this.value)){
            console.log(val);
          this.checkedKeys = val;
          this.$refs.tree.setCheckedKeys(val);
          if(val.length == 0){
              this.labelModel = '';//点击外面全部 清空所选值
          }
        }else{
            console.log("labelModel:",val);
            this.labelModel = this.queryTree(this.data, val);
        }
      
      this.$emit('labelVal',this.labelModel)
      console.log( typeof val,typeof this.labelModel);
      
    },
  },
  data() {
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: 'auto',
      // 输入框显示值
      labelModel: '',
      // 实际请求传值
      valueModel: '',
      // 多选节点id
      checkedKeys: [],
    };
  },
  created() {
    // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
        this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`;
        console.log(this.value);
            // 检测输入框原有值并显示对应 label
            if(Array.isArray(this.value)){
                console.log(this.value);
                this.checkedKeys = this.value;
                this.$refs.tree.setCheckedKeys(this.value);
            }else{
                this.labelModel = this.queryTree(this.data, this.value);
            }
    });
  },
  methods: {
    // 单击节点
    onClickNode(node) {
        if(Array.isArray(this.value)) return
        //   if(node.group != 104) return
        console.log(node);
        this.labelModel = node[this.props.label];
        this.valueModel = node[this.props.id];
        this.$emit('selected', this.valueModel);
        this.onCloseTree();
    },
    // 节点选择 多选
    getCheckedKeys() {
        this.checkedKeys = this.$refs.tree.getCheckedKeys(true);
        console.log("checkedKeys:",this.checkedKeys)
    },
    // 多选 确认选择
    confirmChoose() {
        this.valueModel = this.checkedKeys;
        let checkNode = this.$refs.tree.getCheckedNodes(true);
        console.log(checkNode);
        let labelModel = [];
        checkNode.forEach(item => {
            labelModel.push(item[this.props.label])
        });
        this.labelModel = labelModel.join(',');
        this.$emit('selected', this.valueModel);
        this.onCloseTree();
    },
    // 偏平数组转化为树状层级结构
    switchTree() {
      return this.cleanChildren(this.buildTree(this.options, '0'));
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false;
    },
    // 显示时触发
    onShowPopover() {
      this.showStatus = true;
      this.$refs.tree.filter(false);
    },
    // 隐藏时触发
    onHidePopover() {
        this.showStatus = false;
    },
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true;
      return data[this.props.label].indexOf(query) !== -1;
    },
    // 搜索树状数据中的 ID
    queryTree(tree, id) {
      let stark = [];
      stark = stark.concat(tree);
      while (stark.length) {
        const temp = stark.shift();
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children]);
        }
        if (temp[this.props.id] === id) {
          return temp[this.props.label];
        }
      }
      return '';
    },
    // 将一维的扁平数组转换为多层级对象
    buildTree(data, id = '0') {
      const fa = (parent_id) => {
        const temp = [];
        for (let i = 0; i < data.length; i++) {
          const n = data[i];
          if (n[this.props.parent] === parent_id) {
            n.children = fa(n.id);
            temp.push(n);
          }
        }
        return temp;
      };
      return fa(id);
    },
    // 清除空 children项
    cleanChildren(data) {
      const fa = (list) => {
        list.map((e) => {
          if (e.children.length) {
            fa(e.children);
          } else {
            delete e.children;
          }
          return e;
        });
        return list;
      };
      return fa(data);
    },
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
.el-popover{
  padding: 10px 0 !important;

}
  /deep/ .el-input{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
  .el-input.el-input--suffix {
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
  .el-input.el-input--suffix.rotate .el-input__suffix {
    transform: rotate(180deg);
  }
  .select-tree {
    max-height: 350px;
    overflow-y: auto;
  }
  /* 菜单滚动条 */
  /* .select-tree::-webkit-scrollbar {
    z-index: 11;
    width: 6px;
  }
  .select-tree::-webkit-scrollbar-track,
  .select-tree::-webkit-scrollbar-corner {
    background: #fff;
  }
  .select-tree::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b4bccc;
  }
  .select-tree::-webkit-scrollbar-track-piece {
    background: #fff;
    width: 6px;
  } */
</style>