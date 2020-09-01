const socket = io();

$(() => {
  $('#send-button').click((event) => {
    event.stopPropagation();
    console.log('SEND');
    $.post(`${window.location.origin}/`, 'message', (data) => console.log(data));
  });
});

socket.on('image', (msg) => {
  console.log('got image message');
  console.log(msg);
});

socket.on('iologs', (msg) => {
  console.log('got iologs message');
  console.log(msg);
});
