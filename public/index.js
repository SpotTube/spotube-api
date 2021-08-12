// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('f055e46d659cc0443963', {
  cluster: 'ap1',
});

var channel = pusher.subscribe('chat');
var convosId = '60a8d45f6c6fb505ac3bafdb';
channel.bind(`${convosId}/new-message`, function (data) {
  console.log(`NEW Message: ${convosId}`, data);
});
