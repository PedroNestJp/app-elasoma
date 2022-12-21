import {Screens} from '../../contants/screens';
import {navigateFromRef} from '../app';

export const eventsNotifications = eventData => {
  navigateFromRef(Screens.EVENTS.navigator, {
    screen: Screens.EVENTS.EVENT_DETAILS_SCREEN,
    params: {id: eventData.eventId},
  });
};
