import React, {Component} from 'react'
import './index.scss'
import zan from '../../static/detail/zan.png'
import store1 from "../../store";
const store = store1().store
class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            focus: false
        }
        this.inputFocus = this.inputFocus.bind(this)
        this.cancel = this.cancel.bind(this)
        this.state = {
            detail: {}
        }
        store.subscribe(()=>{
            this.setState({
                detail: store.getState().detailReducer.articleDetail
            })
        })
    }
    componentDidMount() {
        this.setState({
            detail: store.getState().detailReducer.articleDetail
        })
    }
    render() {
        return (
            <div className='footer' style={{height: this.state.focus?'104px':'80px'}}>
                <input placeholder='写下你的评论...' onFocus={this.inputFocus} style={{height: this.state.focus?'60px':'36px'}} />
                {
                    this.state.focus?
                        <div className='commentWrap' style={{alignItems: 'bottom'}}>
                            <div className='button publish'>发布</div>
                            <div className='button cancel' onClick={this.cancel}>取消</div>
                        </div>:
                        <div className='commentWrap'>
                            <div className='comment'>评论</div>
                            <div className='zan'>
                                <img src={zan} alt='图片丢失' className='image' />
                                {this.state.detail.zanNum}赞
                            </div>
                            <div className='more'>...</div>
                        </div>
                }
            </div>
        )
    }
    inputFocus() {
        this.setState({
            focus: true
        })
    }
    cancel() {
        this.setState({
            focus: false
        })
    }
}
export default Comment