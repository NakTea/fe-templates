// components/VideoPlayer.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  const videoUrl = 'https://hojo-website-prod.oss-cn-shanghai.aliyuncs.com/videos/smart.mp4';

  const onLoad = data => {
    setDuration(data.duration);
    setLoading(false);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onError = error => {
    console.log('Video Error: ', error);
    Alert.alert('错误', '视频加载失败');
    setLoading(false);
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  const playPause = () => {
    setPaused(!paused);
  };

  const seekTo = time => {
    if (videoRef.current) {
      videoRef.current.seek(time);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>视频播放器</Text>

      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          paused={paused}
          resizeMode="contain"
          onLoad={onLoad}
          onProgress={onProgress}
          onError={onError}
          onLoadStart={onLoadStart}
          controls={false} // 我们自定义控制器
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>加载中...</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={[styles.button, styles.playButton]} onPress={playPause}>
          <Text style={styles.buttonText}>{paused ? '播放' : '暂停'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.seekButton]} onPress={() => seekTo(0)}>
          <Text style={styles.buttonText}>重播</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>

      {/* 简单的进度条 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }]} />
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
  videoContainer: {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: width - 60,
    height: 200,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
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
  seekButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    marginTop: 10,
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
});

export default VideoPlayer;
