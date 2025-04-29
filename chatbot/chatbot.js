// === Chatbot Script (Handle Toggling, Messaging, and Gemini API) ===

document.addEventListener("DOMContentLoaded", () => {
  
  // === DOM Elements ===
  const chatbotToggler = document.querySelector("#chatbot-toggler");  // Floating open/close button
  const closeChat = document.querySelector("#close-chatbot");         // Close chatbot button inside popup
  const form = document.querySelector(".chat-form");                  // Chat form
  const textarea = document.querySelector(".message-input");          // Textarea for typing messages
  const chatbotBody = document.querySelector(".chatbot-body");        // Message area
  
  // === Toggle Chatbot Popup ===
  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");  // Toggle show/hide popup
  });

  closeChat.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");  // Force close popup
  });

  // === Auto-Resize Textarea as User Types ===
  function autoResizeTextarea() {
    textarea.style.height = "auto";                  // Reset height
    textarea.style.height = textarea.scrollHeight + "px"; // Set new height based on content
  }

  textarea.addEventListener("input", autoResizeTextarea);

  // === Handle Enter Key Behavior ===
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      if (window.innerWidth <= 768) {
        // 🌟 Allow line breaks on mobile devices
        return;
      }
      event.preventDefault(); 
      form.requestSubmit(); // Submit form manually
    }
  });

  // === Handle Form Submit (Send Message) ===
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const message = textarea.value.trim();

    if (message) {
      addUserMessage(message);              // Add user message to UI
      textarea.value = "";                   // Clear input
      textarea.style.height = "45px";         // Reset height

      const loader = addBotThinking();        // Show thinking dots
      chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll down

      const reply = await callGemini(message); // Call Gemini API
      loader.remove();                        // Remove thinking animation
      addBotMessage(reply || "I’m not trained on that information."); // Show reply
      chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll again
    }
  });

  // === Add User Message to Chatbot Body ===
  function addUserMessage(message) {
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");

    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.textContent = message;

    userMessage.appendChild(messageText);
    chatbotBody.appendChild(userMessage);
  }

  // === Add Bot Thinking Animation (3 Dots) ===
  function addBotThinking() {
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message", "thinking");

    const botIcon = document.createElement("i");
    botIcon.classList.add("fa-solid", "fa-robot");

    const messageText = document.createElement("div");
    messageText.classList.add("message-text");

    const thinkingIndicator = document.createElement("div");
    thinkingIndicator.classList.add("thinking-indicator");

    // Create 3 dots
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      thinkingIndicator.appendChild(dot);
    }

    messageText.appendChild(thinkingIndicator);
    botMessage.appendChild(botIcon);
    botMessage.appendChild(messageText);
    chatbotBody.appendChild(botMessage);

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    return botMessage; // Return loader element to remove it later
  }

  // === Add Bot Final Response ===
  function addBotMessage(message) {
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message");

    const botIcon = document.createElement("i");
    botIcon.classList.add("fa-solid", "fa-robot");

    const messageText = document.createElement("div");
    messageText.classList.add("message-text");

    messageText.innerHTML = message; // Allow HTML formatting in bot replies

    botMessage.appendChild(botIcon);
    botMessage.appendChild(messageText);
    chatbotBody.appendChild(botMessage);
  }

  // === Call Gemini API (Google's Model) ===
  async function callGemini(userInput) {
    const API_KEY = "AIzaSyByscmFIsIPlLx_k_62y2qSPcs2FJpASGM"; // 🔥 Your Gemini API Key
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const systemPrompt = `You are a friendly and knowledgeable AI chatbot trained exclusively on the professional portfolio of Mohammed Shafi.

🎯 Behavior Guidelines:
• If someone says **"hi"**, **"hello"**, or greets you — respond with a friendly greeting.
• If someone says **"thank you"**, **"thanks"**, or shows appreciation — reply warmly and politely (e.g., "You're most welcome!" or "Glad I could help!").
• Only provide answers based strictly on Shafi’s portfolio. Do not add or assume anything not mentioned.
• If someone asks a question unrelated to Shafi’s portfolio, respond with:  
  👉 *"I’m specially trained to provide details about Mohammed Shafi’s work and background. But I can still try to answer your question if you’d like!"* and answer it immediately dont wait for fallback

📌 Your Purpose:
Speak clearly and concisely, as if you are introducing or representing Mohammed Shafi to recruiters, collaborators, or curious visitors. Provide enhanced, well-structured answers.

📂 Portfolio Data You Know:

👤 **Name**: Mohammed Shafi  
🎯 **Role**: Frontend Developer & Graphic Designer (Beginner)  
A passionate learner with solid skills in web technologies and UI/UX design. Focused on building user-centric and visually engaging applications.

🏆 **Experience**:
• **Infidata Technologies** (Aug–Sep 2023): Java web app using Servlets and JSP for resale platform.  
• **TechnoSoft** (Mar–May 2024): Python + Django with Attribute-Based Encryption for data privacy.

🎓 **Education**:
• B.E. in Computer Science – Govt. Engineering College (VTU) | CGPA: 7.5 | 2020–2024  
• PUC (Science - PCMB) – Shaheen Independent PU College | 80% | 2019–2020

💼 **Projects**:
1. **Islamic Poems Collection Web App** – Toggle language (English/Urdu), category filters, responsive UI, poem display using JSON.  
2. **To-Do List App** – Dark/light mode, interactive tasks with a sleek UI.  
3. **Weather App** – Real-time weather with modern UI via API.  
4. **Responsive Login Page** – Made with only Tailwind CSS.  
5. **Tic-Tac-Toe with AI** – Play with Friend/AI, track score, smart turn logic.

🛠 **Skills**:
• HTML5, CSS3, JavaScript (ES6+)  
• Tailwind CSS, Bootstrap, React.js (basic)  
• Git, GitHub, VS Code  
• Adobe Photoshop, Illustrator, Figma  
• Responsive Web Design

🌐 **Links**:
• Portfolio: [shafi3m.github.io/MyPortfolio](https://shafi3m.github.io/MyPortfolio)  
• GitHub: [github.com/shafi3m](https://github.com/shafi3m)  
• LinkedIn: [linkedin.com/in/mohammed-shafi](https://linkedin.com/in/mohammed-shafi)  
• CodePen: [codepen.io/shafi_3m](https://codepen.io/shafi_3m)  
• Email: tech.shafi2024@gmail.com

🗣 **Languages Spoken**: English, Urdu, Kannada  
🎖 **Certifications**:  
• Git & GitHub (Udemy, 2024)  
• Java & SQL (Jspiders, 2024)  
• Cybersecurity Bootcamp (Udemy, 2024)  

🎨 **Hobbies**: Photography, Photo Editing
.`; // 🌟 Customize if you want to guide the bot's behavior

    const body = {
      contents: [
        {
          parts: [
            { text: systemPrompt },
            { text: userInput }
          ]
        }
      ]
    };

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      
      let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply received.";

      // === Format Response Text ===
      const formattedText = rawText
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
        .replace(/\*(.*?)\*/g, "<em>$1</em>")             // Italic text
        .replace(/\n/g, "<br>")                           // Line breaks
        .replace(/(https?:\/\/[^\s<>,()]+)/g, '<a href="$1" target="_blank" style="color: #4f46e5; text-decoration: underline;">$1</a>');  // Link formatting

      return formattedText;

    } catch (err) {
      return "Error: " + err.message; // Handle error
    }
  }
  
});
