import React from 'react';
import styles from '../../../../styles/modals/case.module.css';

export default function Documents({ documents }) {
  return (
    <div className={styles.documents}>
      {documents.map(d => (
        <a href={d.location} target="_blank" rel="noopener noreferrer">
          {d.name}
        </a>
      ))}
    </div>
  );
}
