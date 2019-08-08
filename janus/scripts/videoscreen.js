room.registerElement('videoscreen', {
  video_id: null,
  light_intensity: 8,
  light_range: 30,
  light_shadow: true,
  framenum: 0,
  frameskip: 5,

  create() {
    this.video = this.createObject('video', {
      id: this.id,
      video_id: this.video_id,
      lighting: false
    });
    this.light = this.createObject('light', {
      col: V(0,1,0),
      light_intensity: this.light_intensity,
      light_range: this.light_range,
      light_shadow: this.light_shadow,
      pos: V(0,0,8),
    });
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1;
    this.canvas.height = 1;
    this.ctx = this.canvas.getContext('2d');

  },
  update(dt) {
    if (this.framenum % this.frameskip == 0) {
      if (this.video && this.video.texture) {
        this.ctx.drawImage(this.video.texture.image, 0, 0, 1, 1);
        var pix = this.ctx.getImageData(0,0,1,1);
        this.light.col = V(pix.data[0] / 255, pix.data[1] / 255, pix.data[2] / 255);
      }
    }
    this.framenum++;
  }
});
