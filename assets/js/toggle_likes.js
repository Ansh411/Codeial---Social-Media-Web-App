class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: 'POST',
        url: $(self).attr('href')
      })
      .done(function (data) {
        let likesCount = parseInt($(self).attr('data-likes'));
        if (data.data.deleted) {
          likesCount -= 1;
          $(self).removeClass('liked');
        } else {
          likesCount += 1;
          $(self).addClass('liked');
        }
        $(self).attr('data-likes', likesCount);
        $('span', self).text(likesCount);
      })
      .fail(function (errData) {
        console.log('Error in completing the request');
      });
    });
  }
}
