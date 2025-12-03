import { useNotification } from '../context/NotificationContext';
import NotificationToast from './NotificationToast';
import '../styles/NotificationCenter.css';

const NotificationCenter = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-center">
      <div className="notification-container">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
