import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image as FastImage} from 'react-native';

import Loading from './Loading';
const defaultImage = require('../assets/sem-imagem-avatar.png');
import PencilIcon from '../assets/imgs/pencilIcon.svg';
import {catchError} from '../helpers/errors';

export default ({
  editIcon,
  height,
  loading = false,
  photoURL,
  style,
  width,
}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [image, setImage] = useState(photoURL);

  useEffect(() => {
    const srcImage = photoURL
      ? {uri: photoURL, cache: 'force-cache'}
      : defaultImage;

    setImage(srcImage);
  }, [photoURL]);

  const onErrorOnLoadingImage = e => {
    setImage(defaultImage);
    catchError(e);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', ...style}}>
      <View style={{position: 'absolute'}}>
        {(loading || loadingImage) && <Loading />}
      </View>
      {editIcon && (
        <View style={styles.editIcon}>
          <PencilIcon />
        </View>
      )}
      <View style={{position: 'relative'}}>
        <FastImage
          onError={onErrorOnLoadingImage}
          onLoadStart={() => setLoadingImage(true)}
          onLoadEnd={() => setLoadingImage(false)}
          loadingIndicatorSource={require('../assets/sem-imagem-avatar.png')}
          opacity={loading ? 0.3 : 1}
          style={{width: width || 40, height: height || 40, borderRadius: 1000}}
          source={image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editIcon: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'flex-end',
    top: 10,
    right: -5,
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
