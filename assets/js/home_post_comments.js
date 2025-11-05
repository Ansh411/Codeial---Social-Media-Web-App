// assets/js/home_post_comments.js

class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.bindCreateComment();
    this.bindDeleteButtons();
    this.bindLikeButtons();
  }

  // ----------------- CREATE COMMENT -----------------
  bindCreateComment() {
    let self = this;

    this.newCommentForm.off('submit').on('submit', function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: $(this).serialize(),
        success: function (data) {
          let newComment = self.newCommentDom(data.data.comment);

          $(`#post-comments-${self.postId}`).prepend(newComment);

          self.bindDeleteButtons();
          new ToggleLike($('.toggle-like-button', newComment));

          self.newCommentForm[0].reset();

          new Noty({
            theme: 'relax',
            text: 'Comment Published!',
            type: 'success',
            layout: 'topRight',
            timeout: 1200
          }).show();
        },
        error: function (error) {
          console.error('Error creating comment:', error.responseText);
        }
      });
    });
  }

  // ----------------- CREATE COMMENT DOM -----------------
  newCommentDom(comment) {
    const likeCount = comment.likes ? comment.likes.length : 0;

    return $(`
      <li id="comment-${comment._id}" class="comment-card">
        <p>
          <small>
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">❌</a>
          </small>
          ${comment.content}
          <br>
          <small>${comment.user.name}</small>
          <small>
            <a href="/likes/toggle/?id=${comment._id}&type=Comment"
               class="toggle-like-button heart ${likeCount > 0 ? 'liked' : ''}"
               data-likes="${likeCount}">
               ❤️ <span>${likeCount}</span>
            </a>
          </small>
        </p>
      </li>
    `);
  }

  // ----------------- DELETE COMMENT -----------------
  bindDeleteButtons() {
    let self = this;
    this.postContainer.find('.delete-comment-button').off('click').on('click', function (e) {
      e.preventDefault();
      let deleteLink = $(this);

      $.ajax({
        type: 'get',
        url: deleteLink.prop('href'),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: 'relax',
            text: 'Comment Deleted!',
            type: 'success',
            layout: 'topRight',
            timeout: 1200
          }).show();
        },
        error: function (error) {
          console.error('Error deleting comment:', error.responseText);
        }
      });
    });
  }

  // ----------------- LIKE HANDLERS -----------------
  bindLikeButtons() {
    this.postContainer.find('.toggle-like-button').each(function () {
      new ToggleLike(this);
    });
  }
}
