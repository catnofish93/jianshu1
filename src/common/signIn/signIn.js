import React,{Component} from "react"
import logo from '../../static/nav-logo-4c7bbafe27adc892f3046e6978459bac.png'
import phoneImg from '../../static/signIN/sign_in_bg-bbc515a9c2e7734807ea281b9b2ab380.png'
import code from "../../static/download-index-side-qrcode-4130a7a6521701c4cb520ee6997d5fdb.png"
import './signIn.scss'
import { Input, Checkbox, Button, Divider, Popover, Dropdown, Menu, message, Form } from 'antd';
import { UserOutlined, KeyOutlined, WeiboCircleOutlined, WechatOutlined, QqOutlined, PhoneOutlined } from '@ant-design/icons';
import instance from "../../utils/axios";
import axios from 'axios'
import {connect} from "react-redux";
const content = (
    <img src={code} alt={'图片丢失'} />
)
const loginProblem = (
    <Menu>
      <Menu.Item>用手机号重置密码</Menu.Item>
      <Menu.Item>用邮箱重置密码</Menu.Item>
      <Menu.Item>无法用海外手机号登录</Menu.Item>
      <Menu.Item>无法用google账号登录</Menu.Item>
    </Menu>
)
class SignIn extends Component {
    constructor() {
      super();
      document.title = '登录-简书'
      this.state={
        formType: 'login',
        phone: '',
        password: ''
      }
    }
    swichForm(type) {
      this.setState({
        formType: type
      })
    }
    login() {
      let that = this
      function thunkFunction() {
        return (dispatch) => {
          return instance.post( '/login', {phone: that.state.phone, password: that.state.password}).then(res =>{
            if (JSON.stringify(res) === '{}') {
              message.error('账号不存在')
            } else {
              message.success('登录成功')
              sessionStorage.setItem('token', res.token)
              dispatch({
                type: 'loginUser',
                data: res
              })
              that.props.router.push('/view/list')
            }
          }).catch(e => {
          })
        }
      }
      this.props.dispatch(thunkFunction())
    }
    phoneChange(e) {
      this.setState({
        phone: e.target.value
      })
    }
    passwordChange(e) {
      this.setState({
        password: e.target.value
      })
    }
    render() {
      return (
          <div>
            <div className='logo'>
              <img src={logo} alt="图片丢失" className='logo' />
            </div>
            <div className='content'>
              <div className='appDownload'>
                <img src={phoneImg}  alt="图片丢失" className='phoneImg' />
                <div className='downWrap'>
                  <div className='downApp'>下载APP</div>
                  <Popover content = {content}>
                    <img src={code} alt="图片丢失" className='code' />
                  </Popover>
                </div>
              </div>
              <div className='submitForm'>
                <div className={'tab'}>
                  <div className={`text ${this.state.formType === 'login'?'selected':''}`} onClick={this.swichForm.bind(this, 'login')}>登录</div>
                  <div className={'dian'}>.</div>
                  <div className={`text ${this.state.formType === 'register'?'selected':''}`} onClick={this.swichForm.bind(this,'register')}>注册</div>
                </div>
                <div className={'submitInfo'} onFinish={this.login}>
                  {
                    this.state.formType === 'login' ?
                        (
                            <div>
                              <div className='cell'>
                                <Input placeholder='手机号或邮箱' prefix={<UserOutlined />} value={this.state.phone} onChange={this.phoneChange.bind(this)} rules={[{ required: true, message: '请输入手机号或邮箱' }]} />
                              </div>
                              <div className='cell'>
                                <Input placeholder='密码' prefix={<KeyOutlined />} type={'password'} value={this.state.password} onChange={this.passwordChange.bind(this)} rules={[{ required: true, message: '请输入密码' }]} />
                              </div>
                            </div>

                        ):
                        (
                            <div>
                              <div className='cell'>
                              <Input placeholder='您的昵称' prefix={<UserOutlined />} rules={[{ required: true, message: '请输入昵称' }]} />
                              </div>
                              <div className='cell'>
                              <Input placeholder='手机号' prefix={<PhoneOutlined />} rules={[{ required: true, message: '请输入手机号' }]} />
                              </div>
                              <div className='cell'>
                              <Input placeholder='设置密码' prefix={<KeyOutlined />} type={'password'} rules={[{ required: true, message: '请输入密码' }]} />
                              </div>
                          </div>
                        )
                  }

                </div>
                <div className={'loginProblem'}>
                  <Checkbox>记住我</Checkbox>
                  <Dropdown overlay={loginProblem}>
                    <div>登录遇到问题？</div>
                  </Dropdown>
                </div>
                <Button type="primary" className='loginButton' style={{borderRadius: '20px',margin: '10px'}} onClick={this.login.bind(this)}>登录</Button>
                <Divider>社交账号登录</Divider>
                <div className='social'>
                  <WeiboCircleOutlined className={'socialIcon'} style={{color: '#e05244'}} />
                  <WechatOutlined className={'socialIcon'} style={{color: '#00bb29'}} />
                  <QqOutlined className={'socialIcon'} style={{color: '#498ad5'}} />
                </div>
              </div>
            </div>
          </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch ,ownProps) => {
  return {
    userStore(user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      dispatch({
        type: 'loginUser',
        data: user
      })
    }
  }
}
export default connect(mapStateToProps)(SignIn)
