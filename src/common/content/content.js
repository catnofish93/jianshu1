import React,{Component} from "react"
import './content.css'
import daily from "../../static/banner-s-daily-e6f6601abc495573ad37f2532468186f.png"
import club from "../../static/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"
import lianzai from "../../static/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png"
import copyRight from "../../static/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"
import code from "../../static/download-index-side-qrcode-4130a7a6521701c4cb520ee6997d5fdb.png"
import record from '../../static/copyRight/smrz-557fa318122c99a66523209bf9753a27.png'
// import weiffa from '../../static/copyRight/weifa-57fe174be588966e9ae70967539666e3.jpg'
// import wxb from '../../static/copyRight/wxb-e6e244a25f15a58bc91ceb4ea6d0e70a.png'
import { Button, Breadcrumb, message } from 'antd';
import instance from "../../utils/axios";
class Content extends Component {
    constructor(props) {
        document.title = '简书-创作你的创作'
        super(props);
        this.state = {
            download1: false,
            articleList: []
        }
    }
    componentDidMount() {
        instance.post('/articleList', {}).then(res => {
            if (res.success === false) {
                message.error('获取列表信息失败')
            } else {
                console.log(res)
                this.setState({
                    articleList: res.list
                })
            }
        }).catch(e => {
            message.error(e)
        })
    }

    toDetail(item) {
        this.props.router.push({pathname: '/view/detail', query: {id: item.id}})
    }
    download1Focus() {
        this.setState({
            download1: true
        })
    }
    download1out() {
        this.setState({
            download1: false
        })
    }
    render() {
        return (
            <div>
                <div className='wrap'>
                    <div>
                        {this.state.articleList.map(item => {
                            return (
                              <div className='infoList' onClick={this.toDetail.bind(this, item)}>
                                  <div className='name'>{item.title}</div>
                                  <div className='detail'>{item.discription}</div>
                                  <div className='operator'>
                                      <div className='diamond'><span className="iconfont diamond">&#xe728;</span>13.4</div>
                                      <div className='author'>{item.author_name}</div>
                                      <div className='comment'><span className="iconfont diamond">&#xe602;</span>{item.comment_num}</div>
                                      <div className='like'><span className="iconfont diamond">&#xe60a;</span>60</div>
                                  </div>
                              </div>
                            )
                        })}
                        <Button type="primary" block={true} shape={'round'} style={{background: '#9b9b9b', color: '#fff', marginTop: '15px'}}>阅读更多</Button>
                        <div className={'otherFunction'}>
                            <div className={'item'}>关于简书</div>
                            <div className={'dian'}>.</div>
                            <div className={'item'}>联系我们</div>
                            <div className={'dian'}>.</div>
                            <div className={'item'}>加入我们</div>
                            <div className={'dian'}>.</div>
                            <div className={'item'}>简书出版</div>
                            <div className={'dian'}>.</div>
                            <div className={'item'}>品牌与徽标</div>
                            <div className={'dian'}>.</div>
                            <div className={'item'}>帮助中心</div>
                            <div className={'dian'}>.</div>
                            <div className={'item'}>合作伙伴</div>
                        </div>
                        <Breadcrumb>
                            <Breadcrumb.Item>©2012-2021 上海佰集信息科技有限公司</Breadcrumb.Item>
                            <Breadcrumb.Item>简书</Breadcrumb.Item>
                            <Breadcrumb.Item>沪ICP备11018329号-5</Breadcrumb.Item>
                            <Breadcrumb.Item><img alt={'图片丢失'}></img>沪公网安备31010402002252号</Breadcrumb.Item>
                            <Breadcrumb.Item><img alt={'图片丢失'} style={{width: '100px',marginRight: "20px"}}></img><img alt={'图片丢失'} style={{width: '100px'}}></img>简书网举报电话：021-34770013</Breadcrumb.Item>
                            <Breadcrumb.Item>亲爱的市民朋友，上海警方反诈劝阻电话“962110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='adver'>
                        <img src={daily} className='adverImage' alt='图片丢失'></img>
                        <img src={club} className='adverImage' alt='图片丢失'></img>
                        <img src={lianzai} className='adverImage' alt='图片丢失'></img>
                        <img src={copyRight} className='adverImage' alt='图片丢失'></img>
                        <div className='download1' onMouseEnter={this.download1Focus.bind(this)} onMouseLeave={this.download1out.bind(this)}>
                            <img src={code} className="qrcode" alt='图片丢失'></img>
                            <div>
                                <div className='title'>下载简书App</div>
                                <div className='description'>随时随地发现和创作内容</div>
                            </div>
                            {this.state.download1?
                              <div>
                                  <div className='bigqrcodewrap'>
                                      <img src={code} className="bigqrcode" alt='图片丢失' />
                                  </div>
                                  <div className='arror'></div>
                              </div>
                                :''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Content
