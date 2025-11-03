// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

/*

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${pSelf.postId}`).prepend(newComment);
                    pSelf.deleteComment($('.delete-comment-button', newComment));

                    new ToggleLike($('.toggle-like-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">❌</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <small>

                                <a href="/likes/toggle/?id=${comment._id}&type=Comment" class="toggle-like-button" data-likes= "0">
                                        ${post.likes.length} Likes
                                </a>

                            </small>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Deleted!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}

*/

// assets/js/home_post_comments.js

class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    // Bind AJAX submit handler for creating comment
    this.bindCreateComment();

    // Bind delete to all existing comments in this post
    this.bindDeleteButtons();
  }

  // ----------------- CREATE COMMENT -----------------
  bindCreateComment() {
    let self = this;

    // Avoid multiple bindings if this constructor runs again
    this.newCommentForm.off('submit').on('submit', function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: $(this).serialize(),
        success: function (data) {
          // Build the comment DOM
          let newComment = self.newCommentDom(data.data.comment);

          // Add to DOM instantly
          $(`#post-comments-${self.postId}`).prepend(newComment);

          // Attach delete and like handlers to this comment
          self.bindDeleteButtons();
          new ToggleLike($('.toggle-like-button', newComment));

          // Reset input box
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
    return $(`
      <li id="comment-${comment._id}">
        <p>
          <small>
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">❌</a>
          </small>
          ${comment.content}
          <br>
          <small>${comment.user.name}</small>
          <small>
            <a href="/likes/toggle/?id=${comment._id}&type=Comment"
               class="toggle-like-button"
               data-likes="${comment.likes ? comment.likes.length : 0}">
               ${comment.likes ? comment.likes.length : 0} Likes
            </a>
          </small>
        </p>
      </li>
    `);
  }

  // ----------------- DELETE COMMENT -----------------
  bindDeleteButtons() {
    let self = this;

    // Unbind old events and bind new click event
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
}

