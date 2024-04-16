import { useEffect, useState } from "react";
import { error, loggedOut } from "../util/NotificationTemplates";

interface NotificationProps {
  template: string;
  json?: string | undefined;
  isVisible: boolean;
  onClick?: () => void;
}

export default function Notification(props: NotificationProps) {
  const [infoNoti, setInfoNoti] = useState("{}");

  useEffect(() => {
    props.json !== undefined
      ? setInfoNoti(props.json)
      : setTimeout(() => {
          setInfoNoti("{}");
        }, 1000);
  }, [props.isVisible]);

  function notification(template: string) {
    switch (template) {
      case "error":
        return error(infoNoti, props.isVisible);
      case "loggedout":
        return loggedOut();
      default:
        return <></>;
    }
  }

  return <div className={`${props.isVisible ? "showNotification" : ""} notiContainer`}>{notification(props.template)}</div>;
}
