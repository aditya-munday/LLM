const BYTEZ_BASE_URL = "https://api.bytez.com/v1"

const API = {
  async request(endpoint, body, isFormData = false) {
    const headers = {
      Authorization: `Bearer ${API_KEYS.bytez}`
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json"
    }

    const res = await fetch(BYTEZ_BASE_URL + endpoint, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body)
    })

    if (!res.ok) {
      throw new Error(await res.text())
    }

    return res.json()
  },

  async generateText(prompt) {
    return this.request("/text/generate", {
      model: State.model,
      prompt
    }).then(r => r.output || r.response)
  },

  async generateImage(prompt) {
    return this.request("/image/generate", {
      model: State.model,
      prompt
    }).then(r => r.images || [])
  },

  async analyzeImage(imageFile) {
    const form = new FormData()
    form.append("model", State.model)
    form.append("image", imageFile)

    return this.request("/vision/analyze", form, true).then(r => r.text)
  },

  async editImage(prompt, imageFile) {
    const form = new FormData()
    form.append("model", State.model)
    form.append("prompt", prompt)
    form.append("image", imageFile)

    return this.request("/image/edit", form, true).then(r => r.images || [])
  }
}