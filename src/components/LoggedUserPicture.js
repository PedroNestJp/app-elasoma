import React from 'react';
import {useSelector} from 'react-redux';
import UserPicture from './UserPicture';

export default ({width, height, loading = false, editIcon}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <UserPicture
      loading={loading}
      editIcon={editIcon}
      width={width}
      height={height}
      photoURL={user.photoURL}
    />
  );
};
