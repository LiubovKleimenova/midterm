

const rendermessages = function(messages) {
    for (const message of messages) {
      let $message = window.Meowza.createMessage(message);
      messagesSection.prepend($message);
    }
};

window.Meowza.rendermessages = rendermessages

// const showMessages = function () {
//   toggle.click(function() {
//     messagesSection.slideToggle()
// })
// }

// window.Meowza.showMessages = showMessages

const createMessage = function(message) {
  const markup = `
    <article>
      <div class= message-header>
        <h3 class= "sender">From:${message.sender_name}</h3>
        <h3 class= "reciever">To:${message.receiver_name}</h3>
      </div>
      <div class= message-body>
      ${message.message}
      </div>
    </article>
    `;
  return markup;
};


const messagesSection = `
<section class="messages-section">
</section>
`;

window.Meowza.messagesSection = messagesSection






