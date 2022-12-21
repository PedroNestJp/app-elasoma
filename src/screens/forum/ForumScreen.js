import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import ViewContainer from '../../components/Containers/ViewContainer';
import Header from '../../containers/Header';
import ForumCard from '../../containers/forum/ForumCard';
import TextButton from '../../components/Buttons/TextButton';
import {Screens} from '../../contants/screens';
import StateSelector from '../../containers/forms/StateSelector';
import {getUserFromStore} from '../../helpers/store';
import ForumActiveCategoriesByStateList from '../../containers/forum/ForumActiveCategoriesByStateList';
import {getActiveForumPostsByCategoryService} from '../../services/forum/forum';
import Loading from '../../components/Loading';

export default ({navigation}) => {
  const user = getUserFromStore();

  const [activeCategory, setActiveCategory] = useState({});
  const [selectedState, setSelectedState] = useState(user.state);
  const [loadingPosts, isLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getActiveForumPostsByCategoryAndState();
  }, [activeCategory]);

  const getActiveForumPostsByCategoryAndState = async () => {
    try {
      isLoadingPosts(true);
      const posts = await getActiveForumPostsByCategoryService(
        activeCategory.id,
        selectedState,
      );
      setPosts(posts);
      isLoadingPosts(false);
    } catch (e) {
      isLoadingPosts(false);
    }
  };

  const goToCreateForumPost = () => {
    navigation.navigate(Screens.FORUM.navigator, {
      screen: Screens.FORUM.FORUM_CREATE_POST_SCREEN,
    });
  };

  const CreatePostButton = () => (
    <View
      style={{
        flexGrow: 3,
        marginHorizontal: 24,
      }}>
      <TextButton
        style={{
          paddingBottom: 8,
          borderBottomWidth: 1,
        }}
        text="Enviar uma ideia"
        onPress={goToCreateForumPost}
      />
    </View>
  );

  const FiltersSelector = () => (
    <View
      style={{
        paddingTop: 12,
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          marginLeft: 24,
          minWidth: Dimensions.get('window').width / 3 - 10,
        }}>
        <StateSelector
          onValueChange={selected => {
            setPosts([]);
            setSelectedState(selected);
          }}
          selected={selectedState}
        />
      </View>
      <CreatePostButton />
    </View>
  );

  return (
    <>
      <Header />
      <ViewContainer noPaddingHorizontal>
        <ViewContainer noPaddingHorizontal>
          <FlatList
            ListHeaderComponent={
              <View>
                <FiltersSelector />
                <View style={{marginVertical: 12}}>
                  <ForumActiveCategoriesByStateList
                    stateId={selectedState}
                    onSelectCategory={category => setActiveCategory(category)}
                    selectedCategoryId={activeCategory && activeCategory.id}
                  />
                </View>
                {loadingPosts && <Loading />}
              </View>
            }
            keyExtractor={item => item.id}
            data={posts}
            renderItem={({item}) => <ForumCard post={item} />}
          />
        </ViewContainer>
      </ViewContainer>
    </>
  );
};
