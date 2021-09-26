import {Screens} from '../../contants/screens';
import {navigateFromRef} from '../app';

export const openForumPostOnNotification = eventData => {
  navigateFromRef(Screens.FORUM.navigator, {
    screen: Screens.FORUM.FORUM_POST_DETAILS_SCREEN,
    params: {post: {id: eventData.postId}},
  });
};
