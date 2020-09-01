const socket = io();

$(() => {
  $('#send-button').click((event) => {
    event.stopPropagation();

    const mC = document.createElement('canvas');
    const mImg = document.getElementById('my-img');
    const ctx = mC.getContext('2d');

    mC.height = mImg.naturalHeight;
    mC.width = mImg.naturalWidth;
    ctx.drawImage(mImg, 0, 0, mC.width, mC.height);

    const mImg64 = mC.toDataURL('image/jpeg') || 'noimage';

    console.log('POST-ing');

    const mBody = {
      picture: mImg64
    };

    $.post(`${window.location.origin}/`, mBody, (data) => console.log(data));
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
