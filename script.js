document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Visit counter using localStorage
  let visitCount = localStorage.getItem("visitCount")
  if (visitCount === null) {
    visitCount = 1
  } else {
    visitCount = Number.parseInt(visitCount) + 1
  }
  localStorage.setItem("visitCount", visitCount)

  const visitMessage = `You've visited <span class="count">${visitCount}</span> time${visitCount > 1 ? "s" : ""}.`
  document.getElementById("visit-message").innerHTML = visitMessage

  // Button click handlers
  document.getElementById("f-button").addEventListener("click", () => {
    const outputMessage = document.getElementById("output-message")
    outputMessage.textContent = "Thank you for joining us!"
    outputMessage.style.display = "block"
  })

  document.getElementById("button1").addEventListener("click", () => {
    document.getElementById("message1").textContent = "Welcome! Thank you for joining Interly"
  })

  document.getElementById("button2").addEventListener("click", () => {
    document.getElementById("message2").textContent = "Thank you for signing up."
  })

  document.getElementById("button3").addEventListener("click", () => {
    document.getElementById("message3").textContent = "Your profile has been created."
  })

  document.getElementById("button4").addEventListener("click", () => {
    document.getElementById("message4").textContent = "Thank you for partnering with us."
  })

  // Fixed the missing button5 handler
  document.getElementById("button5").addEventListener("click", (e) => {
    e.preventDefault() // Prevent form submission
    document.getElementById("message5").textContent = "Your message has been submitted."
  })

  // Contact form submission
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault()
    document.getElementById("message5").textContent = "Your message has been submitted."
    this.reset() // Clear the form
  })

  // Accordion functionality
  document.querySelectorAll(".accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement

      // Close all other accordion items
      document.querySelectorAll(".accordion-item").forEach((accordionItem) => {
        if (accordionItem !== item) {
          accordionItem.classList.remove("active")
        }
      })

      // Toggle the clicked item
      item.classList.toggle("active")
    })
  })

  // Chatbot functionality
  const chatForm = document.getElementById("chat-form")
  const chatInput = document.getElementById("chat-input")
  const chatMessages = document.getElementById("chat-messages")

  // Predefined chatbot answers
  const responses = {
    "how do i find internships":
      "Start by narrowing down your interests—tech, marketing, design? Then search on Handshake, LinkedIn, or Internships.com!",
    "do you help with resume": "I can suggest templates, highlight key skills, or even review your resume text.",
    "can you match me to internships":
      "Yes! Tell me your skills, interests, and location preferences, and I'll shortlist some for you.",
    "what is a good cover letter":
      "A good cover letter is tailored to the role, shows personality, and explains why you're a great fit.",
    "where should i apply":
      "Popular platforms include LinkedIn, AngelList, and company websites. I can help identify the best for your industry.",
  }

  // Find the best bot response
  function getBotResponse(message) {
    const lowerMsg = message.toLowerCase()
    for (const key in responses) {
      if (lowerMsg.includes(key)) {
        return responses[key]
      }
    }
    return "Let me find the best answer for you... 🧠 (try rephrasing or asking more about internships!)"
  }

  // Handle chat form submission
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const userMessage = chatInput.value.trim()
    if (!userMessage) return

    // Add user message
    const userElement = document.createElement("p")
    userElement.textContent = `You: ${userMessage}`
    userElement.classList.add("user-message")
    chatMessages.appendChild(userElement)

    // Add bot response
    const botElement = document.createElement("p")
    botElement.textContent = `InternBot: ${getBotResponse(userMessage)}`
    chatMessages.appendChild(botElement)

    // Clear input and scroll to bottom
    chatInput.value = ""
    chatMessages.scrollTop = chatMessages.scrollHeight
  })
})
