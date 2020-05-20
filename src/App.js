import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []); 

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);
    const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    const repositoriesUpdated = repositories;

    repositoriesUpdated[repositoryIndex] = response.data;
    setRepositories([...repositoriesUpdated]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
        style={styles.repositoryContainer}
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({ item }) => (
          <>
            <Text style={styles.repository}>{item.title}</Text>
              <View style={styles.techsContainer}>
                <Text style={styles.tech}>{item.techs}</Text>
              </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${item.id}`}
                key={`repository-likes-${item.id}`}
              >
                {item.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(item.id)}
              testID={`like-button-${item.id}`}
              key={`like-button-${item.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </>
        )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFE0",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,

  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#000",
    backgroundColor: "#DCDCDC",
    padding: 15,
  },
});