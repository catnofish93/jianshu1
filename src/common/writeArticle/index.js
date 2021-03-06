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
      articleTitle: dayjs().format('YYYY-MM-DD'),
      articleList: [],
      articleSelected: {},
      articleSelectedIndex: -1
    }
  }
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }
  componentDidMount () {
    this.getData()
    document.title = '简书-写文章'
  }
  getData() {
    let search = {
      pageSize: 10,
      userId: this.props.user.id
    }
    instance.post('authorArticle', search).then(res => {
      console.log(res)
      this.setState({
        articleList: res.list
      })
    })
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
    const article = this.state.articleList[this.state.articleSelectedIndex]
    if (article.id) {
      let params = {
        title: article.title,
        content: this.state.editorState.toHTML(),
        id: article.id
      }
      instance.post('/editArticle', params).then(res => {
        this.getData()
        message.success('保存文章成功')
      })
    } else {
      let params = {
        title: article.title,
        content: this.state.editorState.toHTML(),
        authorName: this.props.user.name,
        authorId: this.props.user.id
      }
      instance.post('/addArticle', params).then(res => {
        this.getData()
        message.success('保存文章成功')
      })
    }
  }
  articleTitleChange(e) {
    this.state.articleList[this.state.articleSelectedIndex].title = e.target.value
    this.setState({
      articleList: this.state.articleList
    })
  }
  goHome() {
    this.props.router.replace('/view/list')
  }
  newArticle() {
    this.state.articleList.push({
      title: dayjs().format('YYYY-MM-DD'),
      description: ''
    })
    this.setState({
      articleList: this.state.articleList,
      articleSelected: {
        title: dayjs().format('YYYY-MM-DD'),
        description: ''
      }
    })
  }
  articleSelect(e, index) {
    this.setState({
      articleSelected: this.state.articleList[index],
      articleSelectedIndex: index,
      editorState: BraftEditor.createEditorState(this.state.articleList[index].content)
    })
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
            <div onClick={this.newArticle.bind(this)} style={{cursor: 'pointer'}}>新建文章</div>
          </div>
          <div className={styles.article}>
            {
              this.state.articleList.map((item, index) => {
                return (
                    <div className={[styles.item, this.state.articleSelectedIndex === index?styles.selected:null].join(' ')} onClick={(e) => {this.articleSelect(e, index)}} key={index}>
                      <SnippetsOutlined />
                      <div className={styles.center}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.description}>{item.discription}</div>
                      </div>
                      <SettingOutlined />
                    </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.content}>
          {
            this.state.articleSelectedIndex !== -1 ? (
              <div>
                {/*<div className={styles.status}>*/}
                {/*已保存*/}
                {/*</div>*/}
                <div style={{display: "flex",justifyContent: 'space-between'}}>
                  <div className={styles.title}>
                    <Input value={this.state.articleSelected['title']} onChange={this.articleTitleChange.bind(this)}></Input>
                  </div>
                  <div>
                    <Button type={'primary'} style={{marginLeft: '10px'}} onClick={this.saveArticle.bind(this)}>保存</Button>
                  </div>
                </div>
                <BraftEditor
                    value={this.state.editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
              </div>
            ): <div style={{textAlign: 'center'}}>暂无文章</div>
          }

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
