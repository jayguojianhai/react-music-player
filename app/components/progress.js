import React from 'react';
import './progress.less';

let Progress = React.createClass({
  getDefaultProps() {
    return {
      barColor: '#2f9842',
    }
  },
  changeProgress(e) {
    const { progressBar } = this.refs;
    const { onProgressChange } = this.props;
    const progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    onProgressChange && onProgressChange(progress);
  },
  render() {
    const { progress, barColor } = this.props;
    return (
      <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
        <div className="progress" style={{ width: `${progress}%`, background: barColor}}></div>
      </div>
    );
  }
});

export default Progress;
