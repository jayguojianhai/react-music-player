import React from 'react';
import Pubsub from 'pubsub-js';
import './listItem.less';

let ListItem = React.createClass({
  play(item) {
    Pubsub.publish('PLAY', item);
  },
  delete(item, e) {
    e.stopPropagation();
    Pubsub.publish('DELETE', item);
  },
  render() {
    const { item, focus } = this.props;
    return (
      <li onClick={this.play.bind(this, item)} className={`components-listitem row${focus ? ' focus' : ''}`}>
        <p><strong>{item.title}</strong> - {item.artist}</p>
        <p onClick={this.delete.bind(this, item)} className="-col-auto delete"></p>
      </li>
    );
  },
});

export default ListItem;