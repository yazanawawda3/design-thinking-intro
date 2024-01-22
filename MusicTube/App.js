import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube';
import Video from 'react-native-video';

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const searchSongs = async () => {
    try {
      const response = await YouTube.searchVideos('music');
      setCurrentSong(response.items[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Button title="Search for Music" onPress={searchSongs} />
      {currentSong && (
        <View style={styles.songContainer}>
          <Text style={styles.songTitle}>{currentSong.snippet.title}</Text>
          <Video
            source={{ uri: `https://www.youtube.com/watch?v=${currentSong.id.videoId}` }}
            style={styles.songPlayer}
            paused={!isPlaying}
          />
          <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  songTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  songPlayer: {
    width: '100%',
    height: 200,
  },
});

export default MusicPlayer;
