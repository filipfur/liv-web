import * as React from 'react';

import './HeaderButton.css';

export default function HeaderButton({ label, id }) {
  return (
    <a href="." id={id ? id : label}>
      <h2>{label}</h2>
    </a>
  );
}
