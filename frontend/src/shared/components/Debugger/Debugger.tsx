import styles from "./Debugger.module.css"

interface DebuggerProps {
  data: any;
}

function isSerializable(value: any): boolean {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}

export const Debugger: React.FC<DebuggerProps> = ({ data }) => {
  const renderData = (data: any): string => {
    if (data === null || typeof data === 'undefined') {
      return String(data);
    }

    if (typeof data === 'object') {
      // Solo intenta serializar si es posible
      if (isSerializable(data)) {
        return JSON.stringify(data, null, 2);
      } else {
        return '[Non-serializable object]';
      }
    }

    return String(data);
  };

  return (
    <div className={styles.debugger}>
      <pre className={styles.debugger_text}>{renderData(data)}</pre>
    </div>
  );
};
