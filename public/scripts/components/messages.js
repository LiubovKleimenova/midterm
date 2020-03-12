

const rendermessages = function(messages) {
  console.log(messages);
    for (const message of messages) {
      let $message = window.Meowza.createMessage(message);
      $(".messages-section").prepend($message);
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
    <article class= "message-card">
    <div class = "message-content>
        <div class= message-header>
          <h3 class= "sender">From:${message.sender_name}</h3>
          <h3 class= "reciever">To:${message.receiver_name}</h3>
        </div>
        <div class= message-body>
          Message: ${message.message}
        </div>
        <div class= reply-form>
          <form>
            <textarea class="message" placeholder="Your reply goes here :)"></textarea>
          </form>
        </div>
    </div>
    <div class= "reply-button">
      <button data-receiverId="${message.receiver_id}" data-catId="${message.cat_id}" class="logout-button mdc-button mdc-button--raised">
      <div class="mdc-button__ripple"></div>
      Reply
      </button>
    </div>
    </article>
    `;
  return markup;
};
window.Meowza.createMessage = createMessage

const messagesSection = `
<section class="messages-section">
</section>
`;

window.Meowza.messagesSection = messagesSection



// data-catId="${cat.id}" data-ownerId="${cat.owner_id}"
//  receiver_id cat_id  sender_id  message
