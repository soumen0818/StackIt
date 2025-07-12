const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    const notifications = await Notification.find({ user: userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const notification = await Notification.findById(notificationId);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    notification.isRead = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNotifications, markAsRead };
