import React from 'react';
import { Link } from 'react-router';
import './header.less';

let Header = React.createClass({
  render() {
    return (
      <div className="components-header row">
        <Link to="/" className="-col-auto"><img src="/static/images/logo.png" width="40" alt="" /></Link>
        <h1 className="caption">React Music Player</h1>
      </div>
    );
  }
});

export default Header;
