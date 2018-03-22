import React from 'react';
import Progress from '../components/progress';
import './player.less';

let duration = null;
let Player = React.createClass({
  getInitialState() {
    return {
      progress: 0,
      volume: 0,
      isPlay: true,
    }
  },
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
      });
    });
  },
  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  },
  progressChangehandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  },
  volumeChangehandler(progress) {
    $('#player').jPlayer('volume', progress);
  },
  play() {
    const { isPlay } = this.state;
    $('#player').jPlayer(isPlay ? 'pause' : 'play');
    this.setState({
      isPlay: !isPlay,
    });
  },
  render() {
    const { currentMusicItem: { title, artist, cover } } = this.props;
    const { progress, volume, isPlay } = this.state;
    return (
      <div className="player-page">
        <h1 className="caption"><a href="#">我的私人音乐坊 &gt;</a></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{title}</h2>
            <h3 className="music-artist mt10">{artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">leftTime</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">
                  <Progress
                    barColor="#aaa"
                    progress={volume}
                    onProgressChange={this.volumeChangehandler} />
                </div>
              </div>
            </div>
            <div style={{height: 10, lineHeight: '10px'}}>
			        <Progress
                barColor="#f00"
								progress={progress}
								onProgressChange={this.progressChangehandler}>
			        </Progress>
            </div>
            <div className="mt35 row">
            <div>
              <i className="icon prev"></i>
              <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
              <i className="icon next ml20"></i>
            </div>
            <div className="-col-auto">
              <i className={`icon repeat-cycle`}></i>
            </div>
          </div>
        </div>
        <div className="-col-auto cover">
          <img src={cover} alt={title}/>
        </div>
        </div>
      </div>
    );
  }
});

export default Player;