import { useEffect, useState } from "react";
import error from "../util/NotificationTemplates";

interface NotificationProps {
  template: string;
  json?: string | undefined;
  isVisible: boolean;
  onClick?: () => void;
}

export default function Notification(props: NotificationProps) {
  const [errorStr, setErrorStr] = useState("{}");

  console.log(props.isVisible);
  console.log(sessionStorage.error);
  console.log(errorStr);
  useEffect(() => {
    sessionStorage.error !== undefined
      ? setErrorStr(sessionStorage.error)
      : setTimeout(() => {
          setErrorStr("{}");
        }, 1000);
  }, [props.isVisible]);

  function notification(template: string) {
    console.log(errorStr);
    switch (template) {
      case "error":
        return error(errorStr, props.isVisible);
      default:
        return <></>;
    }
  }

  return <div className={`${props.isVisible ? "showNotification" : ""} notiContainer`}>{notification(props.template)}</div>;
}
