const UI = {
  updateMode(mode) {
    document.querySelectorAll(".mode-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.mode === mode)
    })

    const upload = document.getElementById("imageUploadLabel")
    const needsImage = mode === "image-text" || mode === "image-image"
    upload.classList.toggle("hidden", !needsImage)

    if (!needsImage) {
      State.clearImage()
      document.getElementById("imagePreview").classList.add("hidden")
    }

    this.renderModels()
  },

  renderModels() {
    const list = document.getElementById("modelList")
    list.innerHTML = ""

    MODELS.filter(m => m.type === State.mode).forEach(m => {
      const btn = document.createElement("button")
      btn.className = "model-btn"
      btn.innerText = m.name
      btn.onclick = () => {
        State.setModel(m.id)
        this.highlightModel(m.id)
      }
      list.appendChild(btn)
    })

    if (!State.model && MODELS.length) {
      State.setModel(MODELS[0].id)
    }

    this.highlightModel(State.model)
  },

  highlightModel(id) {
    document.querySelectorAll(".model-btn").forEach(b => {
      b.classList.toggle("active", b.innerText === MODELS.find(m => m.id === id)?.name)
    })
  },

  addUserMessage(text) {
    if (!text) return
    const c = document.getElementById("conversation")
    const d = document.createElement("div")
    d.className = "message user"
    d.innerText = text
    c.appendChild(d)
    c.scrollTop = c.scrollHeight
  },

  addAIMessage(text) {
    const c = document.getElementById("conversation")
    const d = document.createElement("div")
    d.className = "message ai"
    d.innerText = text
    c.appendChild(d)
    c.scrollTop = c.scrollHeight
  },

  showImages(images) {
    const p = document.getElementById("imagePreview")
    p.innerHTML = ""
    p.classList.remove("hidden")
    images.forEach(src => {
      const i = document.createElement("img")
      i.src = src
      p.appendChild(i)
    })
  },

  setLoading(v) {
    document.getElementById("connectionStatus").innerText = v ? "Generating" : "Ready"
  },

  showError(t) {
    document.getElementById("connectionStatus").innerText = t
  }
}