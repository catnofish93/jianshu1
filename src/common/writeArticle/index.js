import React, {Component} from 'react'
import styles from './index.module.scss'
import {Menu, Modal, Popconfirm, Dropdown, Button, message, Input} from 'antd';
import BraftEditor from 'braft-editor'
import { PlusOutlined, SettingOutlined, BarsOutlined, QuestionCircleOutlined, SnippetsOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css'
import instance from "../../utils/axios";
import {connect} from "react-redux";
var dayjs = require('dayjs')
const { SubMenu } = Menu
const menu = (
  <Menu mode="vertical">
    <Menu.Item key="4">简书作者实名认证</Menu.Item>
    <SubMenu key="sub2" title="默认编辑器">
      <Menu.Item key="7">MarkDown编辑器</Menu.Item>
      <Menu.Item key="8">富文本编辑器</Menu.Item>
    </SubMenu>
    <SubMenu key="sub3" title="设置显示模式">
      <Menu.Item key="7">打开夜间模式</Menu.Item>
      <Menu.Item key="8">切换至宋体</Menu.Item>
      <Menu.Item key="8">切换至黑体</Menu.Item>
    </SubMenu>
    <Menu.Item key="4">回收站</Menu.Item>
    <Menu.Item key="4">帮助与反馈</Menu.Item>
  </Menu>
)
const windowHeight = document.body.offsetHeight
class WriteArtilce extends Component {
  constructor() {
    super();
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      helpModalShow: false,
      articleTitle: dayjs().format('YYYY-MM-DD')
    }
  }
  // state = {
  //   // 创建一个空的editorState作为初始值
  //   editorState: BraftEditor.createEditorState(null)
  // }
  // submitContent = async () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = this.state.editorState.toHTML()
  //   const result = await saveEditorContent(htmlContent)
  // }
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }
  componentDidMount () {
    // // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
  }
  helpShow() {
    this.setState({
      helpModalShow: true
    })
  }
  closeHelpModal() {
    this.setState({
      helpModalShow: false
    })
  }
  saveArticle() {
    let params = {
      title: this.state.articleTitle,
      content: this.state.editorState.toHTML(),
      authorName: this.props.user.name,
      authorId: this.props.user.id
    }
    instance.post('/addArticle', params).then(res => {
      message.success('保存文章成功')
    })
  }
  articleTitleChange(e) {
    this.setState({
      articleTitle: e.target.value
    })
  }
  goHome() {
    this.props.router.replace('/view/list')
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.menu}>
          <div className={styles.backHome} onClick={this.goHome.bind(this)}>回首页</div>
          <div className={styles.newCollect}><PlusOutlined />新建文集</div>
          <div className={styles.menus}>
            <div className={styles.menuItem}>
              <div>随笔</div>
              <SettingOutlined />
            </div>
            <div className={styles.menuItem}>
              <div>日记本</div>
              <SettingOutlined />
            </div>
          </div>
          <div className={styles.footer}>
            <Dropdown overlay={menu} placement="topCenter" arrow>
              <div className={styles.item}>
                <BarsOutlined />
                <div>设置</div>
              </div>
            </Dropdown>
            <div className={styles.item} onClick={this.helpShow.bind(this)}>
              <div>遇到问题</div>
              <QuestionCircleOutlined />
            </div>
          </div>
        </div>
        <div className={styles.articleList}>
          <div className={styles.newArticle}>
            <PlusOutlined />
            <div>新建文章</div>
          </div>
          <div className={styles.article}>
            <div className={styles.item}>
              <SnippetsOutlined />
              <div className={styles.center}>
                <div className={styles.title}>无标题文章</div>
                <div className={styles.description}>描述</div>
              </div>
              <SettingOutlined />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.status}>
            已保存
          </div>
          <div style={{display: "flex",justifyContent: 'space-between'}}>
            <div className={styles.title}>
              <Input value={this.state.articleTitle} onChange={this.articleTitleChange.bind(this)}></Input>
            </div>
            <div>
              <Button type={'primary'} style={{marginLeft: '10px'}} onClick={this.saveArticle.bind(this)}>保存</Button>
              <Button type={'primary'} style={{marginLeft: '10px'}}>发布文章</Button>
            </div>
          </div>
          <BraftEditor
            value={this.state.editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </div>
        <Modal title={'常见问题'} footer={'我知道了'} visible={this.state.helpModalShow} width={'400px'} onCancel={this.closeHelpModal.bind(this)}>
          <div>如果你在使用编辑器的过程中遇到问题，可以尝试以下方案解决：</div>
          <br />
          <div>1. Windows用户尽量将浏览器设置为极速模式，不要使用兼容模式写作</div>
          <br />
          <div>2.推荐使用chrome浏览器，创作体验更加流畅</div>
          <br />
          <div>3.浏览器插件可能与编辑器功能冲突，可以在使用编辑器时禁用插件</div>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(WriteArtilce)
