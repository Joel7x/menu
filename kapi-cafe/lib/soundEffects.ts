"use client";

class SoundManager {
  toggle() {
    return false;
  }

  isEnabled() {
    return false;
  }

  playTick() {}
  playChime() {}
  playWhoosh() {}
  playDown() {}
}

export const sounds = new SoundManager();
