// Basic Tone.js mixer demo
// Uses Tone.js from CDN (loaded in mixer.html)
(async function(){
  console.log('mixer.js loaded')
  if(!window.Tone) {
    console.warn('Tone.js not found')
    return
  }

  const startBtn = document.getElementById('startAudio')
  const playSample = document.getElementById('playSample')
  const oscType = document.getElementById('oscType')
  const freq = document.getElementById('freq')
  const gain = document.getElementById('gain')
  const filter = document.getElementById('filter')
  const freqVal = document.getElementById('freqVal')
  const gainVal = document.getElementById('gainVal')
  const filterVal = document.getElementById('filterVal')

  // create tone nodes
  const synth = new Tone.Oscillator({frequency: 440, type: 'sawtooth'}).start();
  const vol = new Tone.Gain(0.5)
  const filt = new Tone.Filter(1000, 'lowpass')
  const analyser = new Tone.Analyser('waveform', 1024)

  synth.connect(filt)
  filt.connect(vol)
  vol.connect(analyser)
  vol.toDestination()

  // visualization
  const canvas = document.getElementById('viz')
  const ctx = canvas.getContext('2d')

  function draw(){
    requestAnimationFrame(draw)
    const values = analyser.getValue()
    ctx.fillStyle = '#101010'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle = '#00ffbf'
    ctx.beginPath()
    const slice = canvas.width / values.length
    for(let i=0;i<values.length;i++){
      const v = (values[i] + 1) / 2
      const y = v * canvas.height
      if (i === 0) {
        ctx.moveTo(0, y)
      } else {
        ctx.lineTo(i * slice, y)
      }
    }
    ctx.stroke()
  }
  draw()

  startBtn.addEventListener('click', async ()=>{
    await Tone.start()
    startBtn.disabled = true
    playSample.disabled = false
    console.log('AudioContext started')
  })

  playSample.addEventListener('click', async ()=>{
    // simple player: replace path with your sample
    const url = 'samples/sample.wav'
    try {
      const player = new Tone.Player(url).connect(filt)
      player.autostart = true
    } catch(e) {
      console.error(e)
      alert('Could not play sample ' + url)
    }
  })

  oscType.addEventListener('change', e => {
    const t = e.target.value
    synth.type = t
  })
  freq.addEventListener('input', e => {
    const v = Number(e.target.value)
    freqVal.textContent = v
    synth.frequency.value = v
  })
  gain.addEventListener('input', e => {
    const v = Number(e.target.value)
    gainVal.textContent = v.toFixed(2)
    vol.gain.value = v
  })
  filter.addEventListener('input', e => {
    const v = Number(e.target.value)
    filterVal.textContent = v
    filt.frequency.value = v
  })
})();