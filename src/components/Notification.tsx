type NotificationProps = {
  message: string | null;
}
const Notification = ({ message }: NotificationProps) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default Notification;
