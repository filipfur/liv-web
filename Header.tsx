import * as React from 'react';

import './Header.css';
import HeaderButton from './HeaderButton';

export default function Header() {
  return (
    <div className="Header">
      <HeaderButton id={'main'} label="Lunar enlightment" />
      <HeaderButton label="Om mig" />
      <HeaderButton label="Kontakt" />
    </div>
  );
}
