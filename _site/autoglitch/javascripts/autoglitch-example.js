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
  var tag_options_string = '';
  $('.option-value').each(function(idx,el){
    if(el.value){
      if($(el).hasClass('validate')){
        if(parseInt(el.value) < 0 || parseInt(el.value) > 99){
          $(el).val('');
          return false;
        }
      }
      option_name = $(el).data('option-name');
      option_name = 'data-' + option_name;
      tag_options_string = tag_options_string + ' ' + option_name + '="' + el.value + '"';
      image_element.attr(option_name,el.value);
    }
  });
  updateExampleTag(tag_options_string);
  restartAutoglitch();
}

function updateExampleTag(tag_options_string){
  example_tag = '<img src="foo.jpg" class="autoglitch"' + tag_options_string + ' />';
  $('.image-tag').text(example_tag);
}

function restartAutoglitch(){
  autoglitch.init();
}
