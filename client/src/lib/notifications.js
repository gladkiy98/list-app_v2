import { NotificationManager } from 'react-notifications';

class Notifications {
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'success':
          NotificationManager.success('Succesfully created');
          break;
        case 'delete':
          NotificationManager.success('Succesfully deleted');
          break;
        case 'edit':
          NotificationManager.success('Succesfully updated');
          break;
        default:
          break;
      }
    };
  };
}

export default new Notifications();
