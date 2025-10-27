import { FlatList, Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { routerList } from './basicList';

export default function HomeScreen() {
  const Card = ({ title, image, link }) => {
    return (
      <Pressable onPress={() => Linking.openURL(link)}>
        <View style={styles.card}>
          {/* <Image source={image} resizeMode="contain" style={styles.image} /> */}
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key="basic-tab"
        data={routerList}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={item => item.link}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  listContainer: {
    margin: 12,
    alignContent: 'space-between',
  },
  card: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  image: {
    height: 100,
    width: 200,
  },
  title: {
    flex: 1,
    padding: 20,
  },
});
