import React,{Component} from "react"
import {connect} from "react-redux"
import styles from  "./header.module.scss"
import axios from "axios"
import logo from '../../static/nav-logo-4c7bbafe27adc892f3046e6978459bac.png'
import { Dropdown, Menu, message, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SwitchStatus from '../../components/switch/switch'
import instance from '../../utils/axios';
class HeaderC extends Component{
    constructor(props){
        super(props);
        this.state = {
            filerArray: [],
            transition: false,
            goTopShow: false,
            domHeight: document.body.clientHeight - 58,
            modelIndex: 0
        }
        this.state.menu = <Menu>
            <Menu.Item className={styles.menu} onClick={this.goHomePage.bind(this)}>
                <span className={styles.iconfont}> &#xe7d8;</span>
                我的主页
            </Menu.Item>
            <Menu.Item className={styles.menu} onClick={this.goCollect.bind(this)}>
                <span className={styles.iconfont}>&#xe60a;</span>
                收藏的文章
            </Menu.Item>
            <Menu.Item className={styles.menu} onClick={this.goLikeArticle.bind(this)}>
                <span className={styles.iconfont}>&#xe68c;</span>
                喜欢的文章
            </Menu.Item>
            <Menu.Item className={styles.menu} onClick={this.shop.bind(this)}>
                <span className={styles.iconfont}>&#xe6cf;</span>
                已购内容
            </Menu.Item>
            <Menu.Item className={styles.menu}>
                <span className={styles.iconfont}>&#xe603;</span>
                我的钱包
            </Menu.Item>
            <Menu.Item className={styles.menu}>
                <span className={styles.iconfont}>&#xe68d;</span>
                设置
            </Menu.Item>
            <Menu.Item className={styles.menu}>
                <span className={styles.iconfont}>&#xe60d;</span>
                帮助与反馈
            </Menu.Item>
            <Menu.Item className={styles.menu} onClick={this.props.quit.bind(this)}>
                <span className={styles.iconfont}>&#xe72e;</span>
                退出
            </Menu.Item>
        </Menu>
        this.state.content = (
          <div style={{width: '200px'}}>
              <div className={styles.cell} style={{display: 'flex', alignItems: 'center'}}>
                  <div className={styles.night} style={{marginRight: '15px'}}>夜间模式</div>
                  <SwitchStatus list={['开','关']}></SwitchStatus>
              </div>
              <div className={styles.cell}>
                  <SwitchStatus list={['宋体','黑体']}></SwitchStatus>
              </div>
              <div className={styles.cell}>
                  <SwitchStatus list={['简','繁']}></SwitchStatus>
              </div>
          </div>
        );
        this.contentWrap = React.createRef()
    }
    componentWillMount(e) {
        this.getRedList()
    }
    goHomePage() {
        this.props.router.push('/pageHome')
    }
    goLikeArticle() {
        this.props.router.push('/likeArticle')
    }
    goCollect() {
        this.props.router.push('/shopArticle')
    }
    shop() {
        this.props.router.push('/collectArticle')
    }
    redListClose(e) {
        this.props.handerBlur()
    }
    render(){
        return (
            <div onClick={e => {this.redListClose(e)}}>
                <div className={styles.HeaderWrap}>
                    <img src={logo} className={styles.HeaderTitle} alt='图片丢失' />
                    <div className={styles.HeaderMenu}>
                        <div className={styles.home} onClick={this.goHome.bind(this)}>首页</div>
                        <div className={styles.download}>下载App</div>
                        <div className={styles.search_wrap}>
                            <input className={[this.props.focused?styles.search + ' ' + styles.search_focus:styles.search]} onClick={this.props.handerFocus}></input>
                            <span className={this.props.focused?styles.iconfont + ' ' +  styles.loupe + ' '+ styles.graybc:styles.iconfont+' '+styles.loupe}>&#xe624;</span>
                            {this.props.focused===true?<div className={styles.search_panel}>
                                <span>热门搜索</span>
                                <div className={[styles.change_red, this.state.transition?styles.transition:''].join(' ')} onClick={e=>{this.getRedList(e)}}><span className={styles.iconfont}>&#xe6e1;</span>换一批</div>
                                <div>{this.state.filerArray}</div>
                            </div>:""}
                        </div>
                    </div>
                    <div className={styles.HeaderPerson}>
                        <Popover placement={styles.bottomRight} title={''} content={this.state.content} trigger="click">
                            <span className={styles.iconfont +' '+styles.Aa}>&#xe636;</span>
                        </Popover>
                        <span className={styles.iconfont+' '+styles.diamond}>&#xe728;</span>
                        <span className={styles.iconfont+' '+styles.beta}>&#xe64c;</span>
                        {
                            this.props.user.id
                                ? <Dropdown overlay = {this.state.menu} className={styles.dropdown}>
                                    <div>
                                        <img src={this.props.user.img} alt={'图片丢失'} /><DownOutlined />
                                    </div>
                                  </Dropdown>
                                :<div className={styles.login} onClick={this.toLogin.bind(this)}>登录</div>
                        }
                        {
                            this.props.user.id
                            ?'' :<div className={styles.register} onClick={this.toLogin.bind(this)}>注册</div>
                        }
                        <div className={styles.writer} onClick={this.writeArticle.bind(this)}><span className={styles.iconfont}>&#xe96a;</span>写文章</div>
                    </div>
                </div>
                <div ref={this.contentWrap} className={styles.contentWrap} style={{height: this.state.domHeight + 'px'}} onScroll={this.contentScroll.bind(this)}>{this.props.children}</div>
                {
                    this.state.goTopShow ?
                      <div className={styles.goTop} onClick={this.goTop.bind(this)}>
                          <span className={styles.iconfont}>&#xe66d;</span>
                      </div>
                      : ''
                }
            </div>

        )
    }
    contentScroll(e) {
        if (e.currentTarget.scrollTop === 0) {
            this.setState({
                goTopShow: false
            })
        } else {
            this.setState({
                goTopShow: true
            })
        }
    }
    goTop(e) {
        this.contentWrap.current.scrollTop = 0
    }
    goHome() {
        this.props.router.replace('/view/list')
    }
    async getRedList(e){
        if (e) {
            e.stopPropagation()
        }
        this.setState({
            transition: true
        })
        setTimeout(()=>{
            this.setState({
                transition: false,

            })
        }, 1000)
        instance.get('/getSearchList').then(res => {
            console.log(res)
            this.setState({
                filerArray: res.map((item, index)=>{
                    return <span onClick={(e) => {this.redItemClick(e, item[index])}} className={styles.red_item} key={index}>{item['name']}</span>
                }),
                focused: true
            })
        }).catch(e => {
            message.error(e)
        })
    }
    toLogin() {
        this.props.router.replace('/signIn')
    }
    redItemClick(e, value) {
        e.stopPropagation()

    }
    writeArticle() {
        this.props.router.replace('/WriteArticle')
    }
}
const mapStateToProps=(state)=>{
    return {
        focused:state.reducer.focused,
        user: state.user
    }
}
const mapDispatchToProps=(dispatch, ownProps)=>{
    return {
        handerFocus(e){
            e.stopPropagation()
            let actions={
                type:"search_focus"
            }
            dispatch(actions)
        },
        handerBlur(){
            let actions={
                type:"search_blur"
            }
            dispatch(actions)
        },
        quit() {
            let actions={
                type: "user",
                user: {
                }
            }
            dispatch(actions)
            this.props.router.replace('/signIn')
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderC);
