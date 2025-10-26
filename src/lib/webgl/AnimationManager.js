// src/lib/webgl/AnimationManager.js
class AnimationManager {
  constructor() {
    this.instances = new Set();
    this.scrollData = {
      target: 0,
      current: 0,
      velocity: 0,
      lastTime: 0,
      previousTarget: 0
    };
    this.isRunning = false;
    this.bindEvents();
  }

  addInstance(instance) {
    this.instances.add(instance);
    if (!this.isRunning) {
      this.start();
    }
  }

  removeInstance(instance) {
    this.instances.delete(instance);
    if (this.instances.size === 0) {
      this.stop();
    }
  }

  updateScroll = () => {
    this.scrollData.target = window.scrollY;
  };

  smoothScroll() {
    const now = performance.now();
    const dt = this.scrollData.lastTime ? (now - this.scrollData.lastTime) / 1000 : 0.016;
    this.scrollData.lastTime = now;
    this.scrollData.velocity = (this.scrollData.target - this.scrollData.previousTarget) / dt;
    this.scrollData.previousTarget = this.scrollData.target;
    const diff = this.scrollData.target - this.scrollData.current;
    this.scrollData.current += diff * 0.08;
  }

  animate = () => {
    if (!this.isRunning) return;

    this.smoothScroll();

    // Update ALL instances with the same scroll data simultaneously
    this.instances.forEach(instance => {
      if (instance.update && instance.isInitialized) {
        instance.update(
          this.scrollData.target,
          this.scrollData.current,
          this.scrollData.velocity
        );
      }
    });

    requestAnimationFrame(this.animate);
  };

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  bindEvents() {
    window.addEventListener('scroll', this.updateScroll, { passive: true });
  }
}

// Singleton instance
const animationManager = new AnimationManager();
export default animationManager;
