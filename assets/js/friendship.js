console.log("✅ friendship.js loaded");

class FriendshipManager {
  constructor(buttonElement) {
    this.button = $(buttonElement);
    this.handleClick();
  }

  handleClick() {
    // make sure we don't double-bind handlers
    this.button.off('click').on('click', (e) => {
      e.preventDefault();

      console.log("✅ Friend button clicked!");
      const action = this.button.attr('data-action');
      const userId = this.button.attr('data-user-id');
      console.log("🧠 Action:", action, "UserId:", userId);

      if (!action || !userId || action === 'none') {
        console.warn("⚠️ Missing/none action or userId — nothing to do.");
        return;
      }

      let url;
      if (action === 'add') url = `/friendships/add-friend/${userId}`;
      else if (action === 'accept') url = `/friendships/accept-request/${userId}`;
      else if (action === 'decline') url = `/friendships/decline-request/${userId}`;
      else if (action === 'remove') url = `/friendships/remove-friend/${userId}`;
      else {
        console.warn("Unknown action:", action);
        return;
      }

      $.ajax({
        type: 'GET',
        url: url
      })
      .done((data) => {
        console.log("✅ AJAX success:", data);

        new Noty({
          theme: 'relax',
          text: data.message || 'Action completed',
          type: 'success',
          layout: 'topRight',
          timeout: 1000
        }).show();

        this.updateButton(action, userId);
      })
      .fail((errData) => {
        console.error('❌ Error handling friendship: ', errData);
        new Noty({
          theme: 'relax',
          text: 'Something went wrong!',
          type: 'error',
          layout: 'topRight',
          timeout: 1500
        }).show();
      });
    });
  }

  // 🧠 Change the button(s) instantly without refresh
  updateButton(action, userId) {
    const container = $('#user-profile-container');

    // REMOVE all friend buttons inside the container so Accept+Decline both vanish
    container.find('.friend-btn').remove();

    let newButton;

    if (action === 'add') {
      newButton = $('<button>')
        .addClass('friend-btn pending')
        .text('Request Sent ⏳')
        .attr('disabled', true)
        .attr('data-user-id', userId)
        .attr('data-action', 'none');

    } else if (action === 'accept') {
      newButton = $('<button>')
        .addClass('friend-btn')
        .text('Remove Friend ❌')
        .attr('data-user-id', userId)
        .attr('data-action', 'remove');

    } else if (action === 'decline' || action === 'remove') {
      newButton = $('<button>')
        .addClass('friend-btn')
        .text('Add Friend 🤝')
        .attr('data-user-id', userId)
        .attr('data-action', 'add');
    }

    if (newButton) {
      container.append(newButton);
      // re-bind handler to the newly added button
      new FriendshipManager(newButton);
    }
  }
}

// Initialize automatically
$(document).ready(() => {
  $('.friend-btn').each(function () {
    new FriendshipManager(this);
  });
});
