import React from 'react';
import Header from './components/header';
import Player from './page/player';
import List from './page/list';
import { MUSIC_LIST } from './config/config';

let Root = React.createClass({
  getInitialState() {
    return {
      currentMusicItem: MUSIC_LIST[0],
    }
  },
  componentDidMount() {
    const { currentMusicItem: { file } } = this.state;
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          mp3: file,
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
  },
  componentWillUnMount() {
  },
  render() {
    const { currentMusicItem } = this.state;
    return (
      <div>
        <Header />
        <List musicList={MUSIC_LIST} currentMusicItem={currentMusicItem} />
        </div>
     
    );
  }
});

export default Root;