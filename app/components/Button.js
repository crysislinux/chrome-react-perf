import React from 'react';

export default function Button({ children, ...rest }) {
  return (
    <button {...rest}>{children}</button>
  );
}
