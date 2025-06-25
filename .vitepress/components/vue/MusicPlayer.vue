<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const audioPlayer = ref(null)
const isPlaying = ref(false)
const progress = ref(0)
const isMobile = ref(false)

// 示例歌曲列表
const playlist = [
  {
    title: 'Inspire - Capo Productions',
    url: 'https://image.newarea.site/Inspire%20-%20Capo%20Productions.mp3',
  },
]

const currentSong = ref(playlist[0])

// 切换播放状态
function togglePlay() {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  }
  else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// 更新进度条
function onTimeUpdate() {
  const current = audioPlayer.value.currentTime
  const total = audioPlayer.value.duration
  progress.value = (current / total) * 100
}

// 拖动进度条
function seek(event) {
  const bounds = event.currentTarget.getBoundingClientRect()
  const percent = (event.clientX - bounds.left) / bounds.width
  audioPlayer.value.currentTime = audioPlayer.value.duration * percent
}

// 歌曲结束
function onSongEnd() {
  isPlaying.value = false
  progress.value = 0
}

if (typeof window !== 'undefined') {
  isMobile.value = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
}
</script>

<template>
  <div class="music-player">
    <audio ref="audioPlayer" :src="currentSong.url" @timeupdate="onTimeUpdate" @ended="onSongEnd" />
    <div class="player-controls">
      <button class="control-btn" @click="togglePlay">
        <Icon v-if="!isPlaying" icon="ant-design:play-circle-outlined" />
        <Icon v-else icon="ant-design:pause-circle-outlined" />
      </button>
      <div v-if="!isMobile" class="song-info">
        <span class="song-title">{{ currentSong.title }}</span>
        <div class="progress-bar" @click="seek">
          <div class="progress" :style="{ width: `${progress}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-player {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.player-controls {
  display: flex;
  align-items: center;
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 5px;
}

.song-info {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.song-title {
  font-size: 0.9em;
  margin-bottom: 4px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress {
  height: 100%;
  background-color: #000;
  border-radius: 2px;
  transition: width 0.1s linear;
}

@media (max-width: 1280px) {
  .song-info {
    display: none;
  }
}
</style>
