document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("access")) {
    window.location.href = "auth.html"
    return
  }

  App.init()
})

const App = {
  init() {
    this.cache()
    this.bind()
    UI.renderModels()
    UI.updateMode(State.mode)
  },

  cache() {
    this.promptInput = document.getElementById("promptInput")
    this.sendBtn = document.getElementById("sendBtn")
    this.modeButtons = document.querySelectorAll(".mode-btn")
  },

  bind() {
    this.modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        State.setMode(btn.dataset.mode)
        UI.updateMode(btn.dataset.mode)
      })
    })

    this.sendBtn.addEventListener("click", () => this.send())

    this.promptInput.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        this.send()
      }
    })
  },

  async send() {
    const prompt = this.promptInput.value.trim()
    if (!prompt && State.mode !== "image-text" && State.mode !== "image-image") return

    UI.addUserMessage(prompt)
    this.promptInput.value = ""
    UI.setLoading(true)

    try {
      let result

      if (State.mode === "text-text") {
        result = await API.generateText(prompt)
        UI.addAIMessage(result)
      }

      if (State.mode === "text-image") {
        result = await API.generateImage(prompt)
        UI.showImages(result)
      }

      if (State.mode === "image-text") {
        result = await API.analyzeImage(State.image)
        UI.addAIMessage(result)
      }

      if (State.mode === "image-image") {
        result = await API.editImage(prompt, State.image)
        UI.showImages(result)
      }
    } catch (e) {
      UI.showError(e.message)
    }

    UI.setLoading(false)
  }
}