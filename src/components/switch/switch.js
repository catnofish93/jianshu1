import React from "react"
import styles from './switch.module.scss'
class SwitchStatus extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      selected: 0
    }
  }
  changeModel() {
    this.setState({
      selected: this.state.selected === 1 ? 0:1
    })
  }

  render() {
    return (
      <div className={'SwitchWrap'} style={{display: 'flex',marginBottom: '10px'}}>
        {this.props.list.map((item, index) => {
          return <div className={[styles.item, this.state.selected === index?styles.selected:''].join(' ')} key={index} onClick={this.changeModel.bind(this)}>{item}</div>
        })}
      </div>
    )
  }
}
export default SwitchStatus
