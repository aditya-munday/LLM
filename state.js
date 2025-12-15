const State = {
  mode: localStorage.getItem("mode") || "text-text",
  model: localStorage.getItem("model") || "gpt-4",
  image: null,

  setMode(mode) {
    this.mode = mode
    localStorage.setItem("mode", mode)
  },

  setModel(model) {
    this.model = model
    localStorage.setItem("model", model)
  },

  setImage(file) {
    this.image = file
  },

  clearImage() {
    this.image = null
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("imageUpload")
  if (!upload) return

  upload.addEventListener("change", e => {
    const file = e.target.files[0]
    if (!file) return
    State.setImage(file)
  })
})