const parentURI = 'http://localhost:4321';

window.addEventListener('message', (ev: MessageEvent) => {
  if (ev.origin !== parentURI) return;
  const { method, args } = ev.data;
  switch (method) {
    case 'createSpecialMessage':
      try {
        ev.ports[0].postMessage({
          result: {
            message: `Hello, ${args.name}!`,
          },
        });
      } catch (e) {
        ev.ports[0].postMessage({
          error: e,
        });
      }
      break;
    default:
      console.error('unknown method:', method);
      break;
  }
});
