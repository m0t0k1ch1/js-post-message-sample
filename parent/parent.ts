import 'regenerator-runtime/runtime';

const childURI = 'http://localhost:1234';

const btn = <HTMLButtonElement>document.getElementById('btn');

const child = <HTMLIFrameElement>document.getElementById('child');
child.src = childURI;
child.onload = () => {
  btn.onclick = async () => {
    const message = await createSpecialMessage('m0t0k1ch1');
    window.alert(message);
  };
  btn.disabled = false;
};

function createSpecialMessage(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chan = new MessageChannel();
    chan.port1.onmessage = (ev: MessageEvent) => {
      chan.port1.close();
      chan.port2.close();
      if (ev.data.error) {
        reject(ev.data.error);
        return;
      }
      resolve(ev.data.result.message);
    };
    child.contentWindow?.postMessage({
      method: 'createSpecialMessage',
      args: {
        name: name,
      },
    }, childURI, [chan.port2]);
  });
}
