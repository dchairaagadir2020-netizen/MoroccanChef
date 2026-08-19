// Web Audio API Bell Synthesizer (for cooking timer & step completion)
export function playKitchenChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Play a dual harmonious chime (880Hz & 1320Hz)
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.4);

    osc2.frequency.setValueAtTime(1320, now); // E6
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.8);

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  } catch (e) {
    console.error('Audio chime error:', e);
  }
}

// Text-to-Speech Reader for Arabic, French, and English
export function speakRecipeText(
  text: string,
  onEnd?: () => void,
  lang: 'ar' | 'fr' | 'en' = 'ar'
) {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser environment');
    if (onEnd) onEnd();
    return null;
  }

  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/[#*_`]/g, '')
    .replace(/(\r\n|\n|\r)/gm, ' ');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  
  if (lang === 'fr') {
    const frVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.includes('FR'));
    if (frVoice) utterance.voice = frVoice;
    utterance.lang = 'fr-FR';
  } else if (lang === 'en') {
    const enVoice = voices.find(v => v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB'));
    if (enVoice) utterance.voice = enVoice;
    utterance.lang = 'en-US';
  } else {
    // Arabic
    const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.includes('AR'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
      utterance.lang = arabicVoice.lang;
    } else {
      utterance.lang = 'ar-SA';
    }
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
