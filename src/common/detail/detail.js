import React,{Component} from "react"
import './detail.scss'
import Comment from "../comment";
import CommentList from '../commentList';
import code from '../../static/detail/code.png'
import zan from '../../static/detail/zan.png'
import reward from '../../static/detail/reward.png'
import store1 from "../../store";
import instance from "../../utils/axios";
import { message } from 'antd';
const store = store1().store
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.zanFunc = this.zanFunc.bind(this)
        this.state = {
            detail: {}
        }
        store.subscribe(()=>{
            this.setState({
                detail: store.getState().detailReducer.articleDetail
            })
        })
        console.log(this.props.location.query.id, this.state)
    }
    componentDidMount() {
        this.setState({
            detail: store.getState().detailReducer.articleDetail
        })
        this.getDetail()
    }
    getDetail() {
        instance.post('/articleDetail', {id: this.props.location.query.id}).then(res => {
            this.setState({
                detail: res
            })
        }).catch(e => {
            message.error(e)
        })
    }
    render() {
        return (
            <div className='bg'>
                <div className='detailWrap'>
                    <div className='suspension'>
                        <div onClick={this.zanFunc}>
                            <div className='circle'>
                                <img src={zan} alt='图片丢失' className='image' />
                            </div>
                            <div className='text'>{this.state.detail.zanNum}赞</div>
                        </div>
                        <div>
                            <div className='circle'>
                                <img src={reward} alt='图片丢失' className='image'/>
                            </div>
                            <div className='text'>234赞赏</div>
                        </div>
                        <div>
                            <div className='circle'>
                                <img src={code} alt='图片丢失' className='image'/>
                            </div>
                            <div className='text'>下载APP</div>
                        </div>

                    </div>
                    <div className='left'>
                        <div className='title'>{this.state.detail.title}</div>
                        <div className='authorInfo'>
                            <img alt='图片丢失' src='https://upload.jianshu.io/users/upload_avatars/6855581/26cc35b4-d59c-4d86-99ec-5ffe51d5e997.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96'/>
                            <div className='authorDetail'>
                                <div>
                                    <span className='author' style={{fontSize: "16px",fontWeight: 500,marginRight: "8px"}}>{this.state.detail.author_name}</span>
                                    <span className='attention' style={{color: "#ec7259",backgroundColor: "#fff",borderColor: "#ec7259",border: 'solid 1rpx #ec7259'}}>关注</span>
                                </div>
                                <div>
                                    <span className="iconfont diamond">&#xe728;</span>
                                    <span className='diamondSum'>1</span>
                                    <span className='readSum'>2021.03.20 22:29:15 字数 {this.state.detail.language_num}阅读 {this.state.detail.read_num}</span>
                                </div>
                            </div>
                        </div>
                        <div className='paper' dangerouslySetInnerHTML={{__html: this.state.detail.content}}>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='authorCell'>
                            <div className='authorInfoWrap'>
                                <div className='authorInfo'>
                                    <img alt='图片丢失' src='https://upload.jianshu.io/users/upload_avatars/6855581/26cc35b4-d59c-4d86-99ec-5ffe51d5e997.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96'/>
                                    <div className='authorDetail'>
                                        <div>
                                            <span className='author' style={{fontSize: "16px",fontWeight: 500,marginRight: "8px"}}>{this.state.detail.author_name}</span>
                                            <span className='attention' style={{color: "#ec7259",backgroundColor: "#fff",borderColor: "#ec7259",border: 'solid 1rpx #ec7259'}}>关注</span>
                                        </div>
                                        <div>
                                            <span className='readSum'>总资产879 (约47.31元)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='interest'>
                                <div className='item'>
                                    <div className='name'>日更的日子</div>
                                    <div className='readCount'>阅读248</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>日更的日子</div>
                                    <div className='readCount'>阅读248</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>日更的日子</div>
                                    <div className='readCount'>阅读248</div>
                                </div>
                            </div>
                        </div>
                        <div className='suggestion authorCell'>
                            <div className='interestLabel'>
                                推荐阅读
                            </div>
                            <div className='interest'>
                                <div className='item'>
                                    <div className='name'>日更的日子</div>
                                    <div className='readCount'>阅读248</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>日更的日子</div>
                                    <div className='readCount'>阅读248</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>日更的日子</div>
                                    <div className='readCount'>阅读248</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment></Comment>
                <CommentList></CommentList>
            </div>
        )
    }
    zanFunc() {
        if(this.state.detail.isZan) {
            store.dispatch({
                type: 'cancelZan'
            })
        } else {
            store.dispatch({
                type: 'zan'
            })
        }

    }
}
