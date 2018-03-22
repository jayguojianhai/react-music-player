import React from 'react';
import './listItem.less';

let ListItem = React.createClass({
  render() {
    const { item, focus } = this.props;
    return (
      <li className={`components-listitem row${focus ? ' focus' : ''}`}>
        <p><strong>{item.title}</strong> - {item.artist}</p>
        <p className="-col-auto delete"></p>
      </li>
    );
  },
});

export default ListItem;