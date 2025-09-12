import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatHistory } from '@/context/chat-history-context';
import { useWebSocket, HistoryInfo } from '@/context/websocket-context';
import { toaster } from '@/components/ui/toaster';
import { useInterrupt } from '@/components/canvas/live2d';

export const useHistoryDrawer = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    historyList,
    currentHistoryUid,
    setCurrentHistoryUid,
    setHistoryList,
    messages,
    updateHistoryList,
  } = useChatHistory();
  const { sendMessage } = useWebSocket();
  const { interrupt } = useInterrupt();

  const fetchAndSetHistory = (uid: string) => {
    if (!uid || uid === currentHistoryUid) return;

    if (currentHistoryUid && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      updateHistoryList(currentHistoryUid, latestMessage);
    }

    // 🔧 FIX: Add interrupt call to stop TTS when switching to old chat
    interrupt();

    setCurrentHistoryUid(uid);
    sendMessage({
      type: 'fetch-and-set-history',
      history_uid: uid,
    });
  };

  const deleteHistory = (uid: string) => {
    if (uid === currentHistoryUid) {
      toaster.create({
        title: t('error.cannotDeleteCurrentHistory'),
        type: 'warning',
        duration: 2000,
      });
      return;
    }

    sendMessage({
      type: 'delete-history',
      history_uid: uid,
    });
    setHistoryList(historyList.filter((history) => history.uid !== uid));
  };

  const getLatestMessageContent = (history: HistoryInfo) => {
    if (history.uid === currentHistoryUid && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      return {
        content: latestMessage.content,
        timestamp: latestMessage.timestamp,
      };
    }
    return {
      content: history.latest_message?.content || '',
      timestamp: history.timestamp,
    };
  };

  return {
    open,
    setOpen,
    historyList,
    currentHistoryUid,
    fetchAndSetHistory,
    deleteHistory,
    getLatestMessageContent,
  };
};
