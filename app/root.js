import React from 'react';
import Header from './components/header';
import Player from './page/player';
import List from './page/list';
import Pubsub from 'pubsub-js';
import { randomRange } from './utils/util';
import { MUSIC_LIST } from './config/config';

let App = React.createClass({
  getInitialState() {
    return {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      repeat: 'cycle',
    }
  },
  play(item) {
    $('#player').jPlayer('setMedia', {
      mp3: item.file,
    }).jPlayer('play');
    this.setState({
      currentMusicItem: item,
    })
  },
  playNext(type = 'next') {
    const { musicList, currentMusicItem, repeat } = this.state; 
    const length = musicList.length;
    const index = this.findCurrentIndex(musicList, currentMusicItem);
    let newIndex = index;
    if (repeat === 'cycle') {
      if(type === 'next') {
        newIndex = (index + 1) % length;
      } else {
        newIndex = (index - 1 + length ) % length;
      }
    } else if (repeat === 'random') {
      newIndex = randomRange(0, length - 1);
      while(newIndex === index) {
        newIndex = randomRange(0, length - 1);
      }
    }
    this.play(musicList[newIndex]);
  },
  findCurrentIndex(arr, item) {
    return arr.indexOf(item);
  },
  componentDidMount() {
    const { currentMusicItem, currentMusicItem: { file } } = this.state;
    let { musicList } = this.state;
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    this.play(currentMusicItem);
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    });
    Pubsub.subscribe('PLAY', (msg, item) => {
      this.play(item);
      this.setState({
        currentMusicItem: item,
      });
    });
    Pubsub.subscribe('DELETE', (msg, item) => {
      musicList = musicList.filter(o => o !== item);
      this.setState({
        musicList,
      });
    });
    Pubsub.subscribe('PREV', (msg) => {
      this.playNext('prev');
    });
    Pubsub.subscribe('NEXT', (msg) => {
      this.playNext();
    });
    Pubsub.subscribe('REPEEAT', (msg) => {
      const repeats = ['cycle', 'random', 'once'];
      const { repeat } = this.state;
      const length = repeats.length;
      const index = this.findCurrentIndex(repeats, repeat);
      const newIndex = (index + 1) % length;
      this.setState({
        repeat: repeats[newIndex],
      });
    });
  },
  componentWillUnMount() {
    Pubsub.unsubscribe('DELETE');
    Pubsub.unsubscribe('PLAY');
    Pubsub.unsubscribe('PREV');
    Pubsub.unsubscribe('NEXT');
    Pubsub.unsubscribe('REPEEAT');
    $('#player').unbind($.jPlayer.event.ended);
  },
  render() {
    const { currentMusicItem, musicList } = this.state;
    return (
      <div>
        <Header />
        {
          React.cloneElement(this.props.children, this.state)
        }
      </div>
     
    );
  }
});

export default App;
