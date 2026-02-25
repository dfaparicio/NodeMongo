import { Notify } from "quasar";

export function useNotifications() {
  const baseConfig = {
    position: "top",
    color: "dark",
    progress: true,
    html: true,
  };

  const success = (message, caption = "") => {
    Notify.create({
      ...baseConfig,
      message: message,
      caption: caption,
      timeout: 3000,
      icon: "auto_awesome",
      textColor: "amber-4",
      iconColor: "amber-4",
      classes: "numerology-notify notify-success",
      actions: [
        {
          icon: "close",
          color: "amber-4",
          flat: true,
          round: true,
        },
      ],
    });
  };

  const error = (message, caption = "") => {
    Notify.create({
      ...baseConfig,
      message: message,
      caption: caption,
      timeout: 4500,
      icon: "flash_on",
      textColor: "red-4",
      iconColor: "red-4",
      classes: "numerology-notify notify-error",
      actions: [
        {
          icon: "close",
          color: "red-4",
          flat: true,
          round: true,
        },
      ],
    });
  };

  const warning = (message, caption = "") => {
    Notify.create({
      ...baseConfig,
      message: message,
      caption: caption,
      timeout: 4000,
      icon: "report_problem",
      textColor: "orange-4",
      iconColor: "orange-4",
      classes: "numerology-notify notify-warning",
      actions: [
        {
          icon: "close",
          color: "orange-4",
          flat: true,
          round: true,
        },
      ],
    });
  };

  const info = (message, caption = "") => {
    Notify.create({
      ...baseConfig,
      message: message,
      caption: caption,
      timeout: 3500,
      icon: "insights",
      textColor: "deep-purple-3",
      iconColor: "deep-purple-3",
      classes: "numerology-notify notify-info",
      actions: [
        {
          icon: "close",
          color: "deep-purple-3",
          flat: true,
          round: true,
        },
      ],
    });
  };

  return { success, error, warning, info };
}
