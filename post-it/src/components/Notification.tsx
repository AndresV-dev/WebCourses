import { useEffect, useState } from "react";
import { error, loggedOut, welcome } from "../util/NotificationTemplates";

interface NotificationProps {
  template: string;
  json?: string | undefined;
  isVisible: boolean;
  classNames?: string;
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
        return error(infoNoti);
      case "loggedout":
        return loggedOut();
      case "welcome":
        return welcome(infoNoti);
      default:
        return <></>;
    }
  }

  return <div className={`${props.isVisible ? "showNotification" : ""} notiContainer ${props.classNames}`}>{notification(props.template)}</div>;
}
