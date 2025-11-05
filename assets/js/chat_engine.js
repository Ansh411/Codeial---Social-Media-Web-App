class ChatEngine{
    constructor(chatBoxId, userEmail, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;
        
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');

        self.socket.emit('join_room', {
            user_email: self.userEmail,
            user_name: self.userName,
            chatroom: 'Codeial'
        });

        self.socket.on('user_joined', function(data){
            console.log('A user joined: ', data);
        });

        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val().trim();

            if(msg !== ""){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'Codeial'
                });
                $('#chat-message-input').val("");
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('Message received: ', data.message);
            
            let newMessage = $('<li>').addClass('message');

            let messageType = (data.user_email === self.userEmail) ? "self" : "other";
            newMessage.addClass(messageType);

            newMessage.append($('<span>', {
                class: 'bubble',
                html: data.message
            }));

            const senderLabel = data.user_email === self.userEmail ? "You" : data.user_name;
            
            newMessage.append($('<sub>', {
                class: "sender-label",
                html: senderLabel,
            }));

            $('#chat-messages-list').append(newMessage);

            let messageList = $('#chat-messages-list');
            messageList.scrollTop(messageList[0].scrollHeight);
        });
    }
}

// close / reopen handlers (run after DOM ready)
$(document).ready(function(){
  // close button
  $(document).on('click', '#close-chat', function(){
    $('#user-chat-box').addClass('hidden');
    $('#open-chat-bubble').fadeIn(180);
  });

  // open bubble
  $(document).on('click', '#open-chat-bubble', function(){
    $('#open-chat-bubble').fadeOut(120);
    $('#user-chat-box').removeClass('hidden');
  });
});

