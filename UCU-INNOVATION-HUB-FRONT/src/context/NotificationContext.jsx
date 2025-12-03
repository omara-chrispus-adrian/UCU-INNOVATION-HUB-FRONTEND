import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      type: 'info', // 'info', 'success', 'warning', 'error'
      title: '',
      message: '',
      duration: 5000,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-dismiss if duration is set
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (message, title = 'Success') =>
      addNotification({
        type: 'success',
        title,
        message,
        duration: 5000,
      }),
    [addNotification]
  );

  const error = useCallback(
    (message, title = 'Error') =>
      addNotification({
        type: 'error',
        title,
        message,
        duration: 6000,
      }),
    [addNotification]
  );

  const info = useCallback(
    (message, title = 'Info') =>
      addNotification({
        type: 'info',
        title,
        message,
        duration: 4000,
      }),
    [addNotification]
  );

  const warning = useCallback(
    (message, title = 'Warning') =>
      addNotification({
        type: 'warning',
        title,
        message,
        duration: 5000,
      }),
    [addNotification]
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
