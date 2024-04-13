import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';

export default function App() {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true); //Faz a requisição
      const req = await fetch("https://api.b7web.com.br/cinema/");
      const json = await req.json();

      if (json) {
        setMovies(json);
      }

      setLoading(false);
    }

    requestMovies();
  }, []);

  

  return (
    <SafeAreaView style={styles.container}>
      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>

      }
      {!loading &&
        <>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.movieImage}
                  resizeMode="contain"
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }
      <Text style={styles.totalMovieText}>Total de Filmes: {movies.length} </Text>

    </SafeAreaView>
  );
}


