import React,{Component} from "react"
import {Menu, Input, Button} from 'antd'
import { ReadOutlined, BellOutlined} from '@ant-design/icons';
import styles from './index.module.scss'
const { TextArea } = Input

class HomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current: 'read',
      isEdit: false
    }
  }
  componentDidMount() {
    console.log(styles)
    document.title = '不爱吃鱼的猫'
  }
  menuClick(e) {
    this.setState({
      current: e.key

    })
  }
  edit() {
    this.setState({
      isEdit: true
    })
  }
  cancelEdit() {
    this.setState({
      isEdit: false
    })
  }
  saveEdit() {
    this.setState({
      isEdit: false
    })
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div style={{width: '650px'}}>
          <div style={{display: 'flex',width: '100%'}}>
            <div style={{width: '100px'}}>
              <img style={{width: '80px',height: '80px'}} />
            </div>
            <div className={styles.right}>
              <div className={styles.name}>不爱吃鱼的猫</div>
              <ul className={styles.infoList1}>
                <li className={styles.item}>
                  <div>2</div>
                  <div>关注</div>
                </li>
                <li className={styles.item}>
                  <div>2</div>
                  <div>粉丝</div>
                </li>
                <li className={styles.item}>
                  <div>2</div>
                  <div>文章</div>
                </li>
                <li className={styles.item}>
                  <div>2</div>
                  <div>字数</div>
                </li>
                <li className={styles.item}>
                  <div>2</div>
                  <div>收藏喜欢</div>
                </li>
              </ul>
            </div>
          </div>
          <Menu mode="horizontal" onClick={this.menuClick.bind(this)} selectedKeys={[this.state.current]}>
            <Menu.Item key="read" icon={<ReadOutlined />}>
              关注的专题/文集/连载0
            </Menu.Item>
            <Menu.Item key="bell" icon={<BellOutlined />}>
              喜欢的文章0
            </Menu.Item>
          </Menu>
          {
            this.state.current === 'read' ? (
              <div className={styles.articleList}>
                <div className={styles.title}>无标题的文章</div>
                <div className={styles.content1}>111121212121jhgjkhjkghj</div>
                <div className={styles.bottom}>
                  <div className={styles.item}>
                    <span className={'iconfont'}>&#xe633;</span>
                    <span>5</span>
                  </div>
                  <div className={styles.item}>
                    <span className={'iconfont'}>&#xe602;</span>
                    <span>0</span>
                  </div>
                  <div className={styles.item}>
                    <span className={'iconfont'}>&#xe60a;</span>
                    <span>0</span>
                  </div>
                  <div className={styles.item}>05.18 13:20</div>
                </div>
              </div>
            ): ''
          }
        </div>
        <div className={styles.right}>
          <div style={{borderBottom: 'solid 1px #f0f0f0'}}>
            <div className={styles.introduce}>
              <span className={styles.title}>个人介绍</span>
              <div className={styles.edit}>
                <span className={'iconfont'}>&#xe640;</span>
                <span onClick={this.edit.bind(this)}>编辑</span>
              </div>
            </div>
            {
              this.state.isEdit ? (
                <div>
                  <TextArea rows={4} style={{background: '#ddd'}} />
                  <Button shape={'round'} style={{margin: '10px 0',border: '1px solid #42c02e',color: '#42c02e'}} onClick={this.saveEdit.bind(this)}>保存</Button>
                  <Button shape={'round'} style={{marginLeft: '10px'}} type={'text'} onClick={this.cancelEdit.bind(this)}>取消</Button>
                </div>
              ): ''
            }
          </div>
          <div className={styles.interest}>
            <div className={styles.attention}><span className={'iconfont'}>&#xe68f;</span>我关注的专题/文集/连载</div>
            <div className={styles.like}><span className={'iconfont'}>&#xe669;</span>我喜欢的文章</div>
          </div>
          <div className={styles.create}>
            <div className={styles.title}>我创建的专题</div>
            <div className={styles.createOperator}>+ 创建一个新专题</div>
          </div>
          <div className={styles.create}>
            <div className={styles.title}>我的文集</div>
            <div className={styles.article}><span className={'iconfont'}>&#xe63b;</span>日记本</div>
          </div>
        </div>
      </div>
    )
  }
}
export default HomePage
