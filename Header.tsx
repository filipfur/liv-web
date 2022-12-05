import * as React from 'react';

import './Header.css';
import HeaderButton from './HeaderButton';

export default function Header() {
  return (
    <div className="Header">
      <HeaderButton id={"main"} label="Lunar enlightment" />
      <div style={{ width: '1px', background: 'lightgray' }} />
      <HeaderButton label="About" />
      <HeaderButton label="Cacao" />
    </div>
  );
}
