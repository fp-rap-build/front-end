import Document from './Document';

import styles from '../../../../../../styles/pages/request.module.css';

export default function Documents({ documents }) {
  return (
    <div className={styles.documents}>
      {documents.map(d => (
        <Document document={d} />
      ))}
    </div>
  );
}
