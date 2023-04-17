async function sendPrompt() {
  const prompt = document.getElementById("chat-input-box").value;

  const chat = document.getElementById("chat-history");
  const newMessage = document.createElement('div');
  newMessage.className = 'message sent';
  newMessage.innerHTML = '<p>'+prompt+'</p>';
  
  chat.appendChild(newMessage);
  
  if (!prompt) return;

  try {
    const response = await fetch("/api/sendPrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const completion = await response.json();
     console.log(completion);
     const assistant = document.createElement('div');
     assistant.className = 'message received';
     assistant.innerHTML = '<p>'+completion.content+'</p>';
     chat.appendChild(assistant);
     
    speechSynthesis.speak(new SpeechSynthesisUtterance(completion.content));
  } catch (error) {
    console.error("Error processing the request.", error);
  }
}

