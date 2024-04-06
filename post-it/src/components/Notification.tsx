import error from "../util/NotificationTemplates";

interface NotificationProps {
  template: string;
  json: string | undefined;
  isVisible: boolean;
  onClick?: () => void;
}

export default function Notification(props: NotificationProps) {
  function notification(template: string) {
    switch (template) {
      case "error":
        return error(props.json || "");
      default:
        return <></>;
    }
  }

  return <div className={`${props.isVisible ? "" : "isHidden"}`}>{notification(props.template)}</div>;
}
