import { useNotification } from '../context/NotificationContext';
import '../styles/Notifications.css';

const NotificationToast = ({ notification }) => {
  const { removeNotification } = useNotification();

  const getIcon = (type) => {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[type] || '●';
  };

  return (
    <div
      className={`notification-toast notification-${notification.type}`}
      role="alert"
      aria-live="polite"
    >
      <div className="notification-icon">
        {getIcon(notification.type)}
      </div>

      <div className="notification-content">
        {notification.title && (
          <div className="notification-title">{notification.title}</div>
        )}
        <div className="notification-message">{notification.message}</div>
      </div>

      <button
        className="notification-close"
        onClick={() => removeNotification(notification.id)}
        aria-label="Close notification"
      >
        ×
      </button>

      <div className="notification-progress" />
    </div>
  );
};

export default NotificationToast;
