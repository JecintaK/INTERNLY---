document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const themeIcon = document.querySelector(".theme-icon")
  const body = document.body

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  // Update icon based on current theme
  updateThemeIcon(currentTheme)

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙"
  }

  // Carousel Functionality
  const carousel = document.getElementById("products-carousel")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const indicators = document.querySelectorAll(".indicator")

  let currentSlide = 0
  const totalSlides = document.querySelectorAll(".carousel-item").length
  let autoSlideInterval

  // Initialize carousel
  updateCarousel()
  startAutoSlide()

  // Previous button
  prevBtn.addEventListener("click", () => {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
    updateCarousel()
    resetAutoSlide()
  })

  // Next button
  nextBtn.addEventListener("click", () => {
    currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
    updateCarousel()
    resetAutoSlide()
  })

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index
      updateCarousel()
      resetAutoSlide()
    })
  })

  function updateCarousel() {
    // Move carousel
    const translateX = -currentSlide * 100
    carousel.style.transform = `translateX(${translateX}%)`

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide)
    })

    // Update button states
    prevBtn.disabled = false
    nextBtn.disabled = false
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
      updateCarousel()
    }, 4000) // Change slide every 4 seconds
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval)
    startAutoSlide()
  }

  // Pause auto-slide on hover
  const carouselContainer = document.querySelector(".carousel-container")
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval)
  })

  carouselContainer.addEventListener("mouseleave", () => {
    startAutoSlide()
  })

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

  // New carousel button handlers
  document.getElementById("button-extra1").addEventListener("click", () => {
    document.getElementById("message-extra1").textContent = "Exploring smart matching features..."
  })

  document.getElementById("button-extra2").addEventListener("click", () => {
    document.getElementById("message-extra2").textContent = "Loading your analytics dashboard..."
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
    "what is smart matching":
      "Our AI analyzes your skills, preferences, and career goals to suggest the most relevant internship opportunities.",
    "how do analytics help":
      "Analytics show your application success rate, popular skills in your field, and tips to improve your profile.",
    "is internly free":
      "Yes! Internly is completely free for students. We make money through partnerships with companies.",
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

    // Add bot response with a slight delay for realism
    setTimeout(() => {
      const botElement = document.createElement("p")
      botElement.textContent = `InternBot: ${getBotResponse(userMessage)}`
      chatMessages.appendChild(botElement)

      // Clear input and scroll to bottom
      chatInput.value = ""
      chatMessages.scrollTop = chatMessages.scrollHeight
    }, 500)

    // Scroll to bottom immediately for user message
    chatMessages.scrollTop = chatMessages.scrollHeight
  })

  // Keyboard navigation for carousel
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevBtn.click()
    } else if (e.key === "ArrowRight") {
      nextBtn.click()
    }
  })

  // Add smooth entrance animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".item, .testimonial, .member").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})