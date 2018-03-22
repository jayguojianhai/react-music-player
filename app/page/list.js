import React from 'react';
import ListItem from '../components/listItem';

let List = React.createClass({
  render() {
    const { musicList, currentMusicItem } = this.props;
    const listEle = musicList.map(item => <ListItem
      focus={item === currentMusicItem}
      item={item}
      key={item.id}
    />);
    return (
      <ul>
        {listEle}
      </ul>
    );
  }
});
export default List;