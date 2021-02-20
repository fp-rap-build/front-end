import React from 'react';

import styles from '../../styles/common/button.module.css';

export default function Button({ children }) {
  return <button className={styles.btn}>{children}</button>;
}
