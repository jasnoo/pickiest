export type NotificationProps = {
  message: string | null | undefined;
}
const Notification = ({ message }: NotificationProps) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default Notification;
