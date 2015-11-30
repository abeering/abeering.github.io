$(document).ready(initForm);

function initForm(){
  $('.update-button').click(function(){
    event.preventDefault();
    stopAutoglitch();
    replaceImage();
  });
}

function stopAutoglitch(){
  window.clearTimeout(autoglitch.timeout());
  $('canvas').remove();
}

function replaceImage(){
  var image_input = document.getElementById('image-upload');
  var image_file = image_input.files[0];
  var url = window.URL.createObjectURL(image_file);
  if(url){
    $('.autoglitch').remove();
    var image = $('<img class="autoglitch"/>')
    image.attr('src',url);
    $('.image-bucket').append(image);
    image.load(function(){
      setImageOptions($(this));
    });
  } else {
    setImageOptions($('.autoglitch'));
  }
}

function setImageOptions(image_element){
  $('.option-value').each(function(idx,el){
    if(el.value){
      option_name = $(el).data('option-name');
      option_name = 'data-' + option_name;
      image_element.attr(option_name,el.value);
    }
  });
  restartAutoglitch();
}

function restartAutoglitch(){
  autoglitch.init();
}
