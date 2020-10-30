const MANIFEST_JSON = "manifest.json";
const localHost = ['127.0.0.1', 'localhost'];

async function main() {
    const isLocal = !!~localHost.indexOf(window.location.hostname);
    const manifestJSON = await (await fetch(MANIFEST_JSON)).json();
    
    const host = isLocal ? manifestJSON.localHost : manifestJSON.productionHost;
    const videoComponent = new VideoComponent();

    const network = new Network({ host });

    const videoPlayer = new VideoMediaPlayer({
        manifestJSON,
        network,
        videoComponent
    })

    videoPlayer.initializeCodec();
    videoComponent.inializePlayer();

    window.nextChunk = (data) => videoPlayer.nextChunk(data);

}

window.onload = main