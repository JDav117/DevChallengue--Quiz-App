let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.2,
): void {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {
    // AudioContext no disponible (entorno de pruebas, etc.)
  }
}

/** Sonido de respuesta correcta — tono ascendente agradable */
export function playCorrectSound(): void {
  playTone(880, 0.12, 'sine', 0.2)
  setTimeout(() => playTone(1100, 0.18, 'sine', 0.15), 100)
}

/** Sonido de respuesta incorrecta — tono descendente disonante */
export function playWrongSound(): void {
  playTone(260, 0.18, 'sawtooth', 0.15)
  setTimeout(() => playTone(200, 0.25, 'sawtooth', 0.1), 100)
}
