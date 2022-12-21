import React from 'react';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import NewForumPostNotificationHandler from '../../containers/notifications/NewForumPostNotificationHandler';
import EventsNotificationHandler from '../../containers/notifications/EventsNotificationHandler';
import EventsRemiderNotificationHandler from '../../containers/notifications/EventsRemiderNotificationHandler';
import SubscribeNewsletterHandler from '../../containers/notifications/SubscribeNewsletterHandler';
import FutureEventsReminderNotificationHandler from '../../containers/notifications/FutureEventsReminderNotificationHandler';

export default () => {
  return (
    <ScrollContainer canGoBack>
      <EventsNotificationHandler />
      <NewForumPostNotificationHandler />
      <SubscribeNewsletterHandler />
      <EventsRemiderNotificationHandler />
      <FutureEventsReminderNotificationHandler />
    </ScrollContainer>
  );
};
