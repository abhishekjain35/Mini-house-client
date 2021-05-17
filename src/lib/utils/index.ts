import { message, notification } from "antd";

export const iconColor = "#1890ff";

export const roundListingPrice = (price: number, round = true) => {
  const roundedListingPrice = round ? Math.round(price) : price;
  return `₹${roundedListingPrice}`;
};

export const displaySuccessNotification = (
  message: string,
  description?: string
) => {
  return notification["success"]({
    message,
    description,
    placement: "topLeft",
    style: {
      marginTop: 50,
    },
  });
};

export const displayErrorMessage = (error: string) => {
  return message.error(error);
};
