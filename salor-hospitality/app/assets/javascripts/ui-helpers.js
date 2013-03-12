/*
Copyright (c) 2012 Red (E) Tools Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function toggle_order_booking () {
  if (submit_json.currentview == 'rooms') {
    route('tables');
  } else {
    route('rooms');
  }
}

function open_table_div() {
  if (settings.mobile) {
    $('#tablesselect').show();
  } else {
    $('#tablesselect').slideDown();
  }
}

function close_table_div() {
  if (settings.mobile) {
    $('#tablesselect').hide();
  } else {
    $('#tablesselect').slideUp();
  }
}

function loadify_order_buttons() {
  var submit_button = $('.tables_button');
  var invoice_button = $('.cash_button');
  var move_to_table_button = $('.move-to-table_button');
  var clearbutton = $('#order_clear_button');
  var buttons = [];
  buttons = buttons.concat(submit_button, invoice_button, move_to_table_button, clearbutton);
  $.each(buttons, function(i) {
    var button = $(buttons[i]);
    var loader = create_dom_element('img', {src:'/images/ajax-loader2.gif'}, '');
    loader.css('margin', '7px');
    loader.css('position','absolute');
    $(button).append(loader);
    $(button).css('opacity','0.5');
    var onclick_code = $(button).attr('onclick');
    $(button).attr('onclick', '');
    $(button).attr('onclick_old', onclick_code);
  });
}

function unloadify_order_buttons() {
  var submit_button = $('.tables_button');
  var invoice_button = $('.cash_button');
  var move_to_table_button = $('.move-to-table_button');
  var clearbutton = $('#order_clear_button');
  var buttons = [];
  buttons = buttons.concat(submit_button, invoice_button, move_to_table_button, clearbutton);
  $.each(buttons, function(i) {
    var button = $(buttons[i]);
    $(button).html('');
    $(button).css('opacity',1);
    var onclick_code = $(button).attr('onclick_old');
    $(button).attr('onclick', onclick_code);
    $(button).removeAttr('onclick_old');
  });
}

function highlight_button(element) {
  //$(element).effect("highlight", {}, 300); // this is CPU intensive for some mobile devices and has been disabled.
}

function highlight_border(element) {
  $(element).css('borderColor', 'white');
}

function restore_border(element) {
  $(element).css({ borderColor: '#555555 #222222 #222222 #555555' });
}

function toggle_admin_interface() {
  if ($('#orderform').is(':visible') == false) {
    if ($('#orderform').length == 1) {
      $.ajax({
        type: 'POST',
        url:'/orders/toggle_admin_interface',
        dataType: 'json',
        success: function(result) {
          if (result) {
            $('#admin').show();
            if (! $('#orderform').is(':visible')) {
              $('#drag_and_drop_toggle_view_button').show();
            }
            $('#items_notifications_static').hide();
          } else {
            $('#admin').hide();
            $('#drag_and_drop_toggle_view_button').hide();
            $('#items_notifications_static').show();
            settings.mobile_drag_and_drop = false;
            $('#areas').hide();
          }
          $('#drag_and_drop_toggle_view_button').html(i18n.mobile_view);
          settings.admin_interface = result;
          render_tables();
        }
      });
    } else if (!$('#orderform').is(':visible')) {
      $('#admin').show();
    }
  }
}

function toggle_all_option_checkboxes(source) {
  if ($(source).attr('checked') == 'checked') {
    $('input.category_checkbox:checkbox').attr('checked',true);
  } else {
    $('input.category_checkbox:checkbox').attr('checked',false);
  }
}