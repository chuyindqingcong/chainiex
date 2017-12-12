// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
//	import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
//Vue.use(ElementUI)

import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Row,
  Col,
  Upload,
  MessageBox,
  Notification,
  Message
} from 'element-ui'

Vue.use(Pagination)//分页
Vue.use(Dialog)//对话框
Vue.use(Menu) //导航条
Vue.use(Submenu)//二级导航
Vue.use(MenuItem)//三级导航
Vue.use(Input)//input标签
Vue.use(Radio)//单选框按钮组
Vue.use(RadioGroup)//单选框按钮组
Vue.use(RadioButton)//单选框按钮组
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$notify = Notification
const service = Axios.create({
  timeout: 30000
});
//拦截器
service.defaults.baseURL = '/api'
service.interceptors.response.use(res => {
  if(res.data.code==2) {
    router.replace({
      path: '/'
    })
  } else {
    return res
  }
})
Vue.use(VueQuillEditor)

Vue.prototype.$ajax = service
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

//全局函数
Vue.prototype.getTime = function(data) {
  var create = new Date(data);
  var d = create.getDate();
  var y = create.getMonth() + 1;
  var m = create.getFullYear();
  var h = create.getHours();
  var f = create.getMinutes();
  var s = create.getSeconds();
  return m + '-' + timer(y) + '-' + timer(d) + ' ' + timer(h) + ':' + timer(f) + ':' + timer(s);
}

function timer(data) {
  return parseInt(data / 10) > 0 ? data : '0' + data;
}