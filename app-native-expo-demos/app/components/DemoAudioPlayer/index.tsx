// components/VideoAudioPlayer.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Video from 'react-native-video';

const VideoAudioPlayer = () => {
  const audioRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioUrl =
    'https://hojo-website-prod.oss-cn-shanghai.aliyuncs.com/hojo-static/assets/audio/homepage/98598f8964820e6d942844c3b737e590.wav';

  const onLoad = data => {
    setDuration(data.duration);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onError = error => {
    console.log('Audio Error: ', error);
    Alert.alert('错误', '音频加载失败');
  };

  const playPause = () => {
    setPaused(!paused);
  };

  const stop = () => {
    setPaused(true);
    if (audioRef.current) {
      audioRef.current.seek(0);
    }
    setCurrentTime(0);
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>音频播放器 (使用 Video 组件)</Text>

      {/* 隐藏的音频播放器 */}
      <Video
        ref={audioRef}
        source={{ uri: audioUrl }}
        paused={paused}
        onLoad={onLoad}
        onProgress={onProgress}
        onError={onError}
        style={{ height: 0, width: 0 }} // 隐藏视频组件
        playInBackground={true}
        playWhenInactive={true}
      />

      <View style={styles.playerContainer}>
        <Text style={styles.audioInfo}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }]} />
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={[styles.button, styles.playButton]} onPress={playPause}>
            <Text style={styles.buttonText}>{paused ? '播放' : '暂停'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stop}>
            <Text style={styles.buttonText}>停止</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  playerContainer: {
    alignItems: 'center',
  },
  audioInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#007bff',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VideoAudioPlayer;
