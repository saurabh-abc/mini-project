const socket = io()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})
function sendMessage() {
  if (messageInput.value === '') return
  const data = {
    message: messageInput.value,
  }
  socket.emit('message', data)
  addMessageToUI(true, data)
  messageInput.value = ''
}
socket.on('chat-message', (data) => {
  addMessageToUI(false, data)
})
function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
  const element = `
      <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
            ${data.message}
        </li>
        `
  messageContainer.innerHTML += element
  scrollToBottom()
}
function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}
function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}
