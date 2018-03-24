import React from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js';
import './player.less';

let duration = null;
let Player = React.createClass({
  getInitialState() {
    return {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: '',
    }
  },
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      const time = duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100);
      const leftTime = this.formartTime(time);
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime,
      });
    });
  },
  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  },
  formartTime(time) {
    time = Math.floor(time);
    const miniutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    const newTime = `${miniutes}:${seconds}`;
    return newTime;
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
  repeat() {
    Pubsub.publish('REPEEAT');
  },
  prev() {
    Pubsub.publish('PREV');
  },
  next() {
    Pubsub.publish('NEXT');
  },
  render() {
    const { currentMusicItem: { title, artist, cover }, repeat } = this.props;
    const { progress, volume, isPlay, leftTime } = this.state;
    return (
      <div className="player-page">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{title}</h2>
            <h3 className="music-artist mt10">{artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{leftTime}</div>
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
            <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
			        <Progress
								progress={progress}
								onProgressChange={this.progressChangehandler}>
			        </Progress>
            </div>
            <div className="mt35 row">
            <div>
              <i className="icon prev" onClick={this.prev}></i>
              <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
              <i className="icon next ml20" onClick={this.next}></i>
            </div>
            <div className="-col-auto">
              <i onClick={this.repeat} className={`icon repeat-${repeat}`}></i>
            </div>
          </div>
        </div>
        <div className="-col-auto cover">
          <img src={cover} alt={title} className={isPlay ? 'play' : ''} />
        </div>
        </div>
      </div>
    );
  }
});

export default Player;