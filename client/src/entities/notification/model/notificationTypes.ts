export type NotificationState = {
  modal: {
    open: boolean;
    text: string;
  };
  toasts: ToastT[];
};

export type ToastT = {
  id: number;
  show: boolean;
  text: string;
  type: ClassVariant;
};

export type ClassVariant = 'info' | 'danger' | 'success' | 'warning';
