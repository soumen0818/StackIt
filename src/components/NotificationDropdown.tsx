import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, MessageSquare, TrendingUp, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: number;
  type: 'answer' | 'comment' | 'mention' | 'vote';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  questionId?: number;
  answerId?: number;
}

export const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const currentUserId = 1; // Replace with actual current user ID

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications', { params: { userId: currentUserId } });
      setNotifications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      const response = await axios.post('/api/notifications/read', { notificationId });
      console.log(response.data);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return <MessageSquare className="h-4 w-4 text-blue-400" />;
      case 'vote':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'mention':
        return <User className="h-4 w-4 text-purple-400" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-orange-400" />;
      default:
        return <Bell className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 min-w-[20px]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-slate-800/95 border-slate-700 backdrop-blur-sm p-0" align="end">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${!notification.isRead ? 'bg-slate-700/20' : ''
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-white truncate">
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-slate-300 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-slate-400 hover:text-white h-6 w-6 p-0"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="text-slate-400 hover:text-red-400 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-slate-700">
            <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300">
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};