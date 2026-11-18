import { SupportedLanguage } from '../data/mockData';

export interface SpeechResult {
  supported: boolean;
  speaking: boolean;
  error?: string;
}

export function speakText(
  text: string,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (msg: string) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any active utterance

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice BCP-47 tag
    let langCode = 'en-IN';
    if (lang === 'hi') langCode = 'hi-IN';
    if (lang === 'te') langCode = 'te-IN';
    utterance.lang = langCode;

    // Check voice availability for target language
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()) || v.lang.toLowerCase().startsWith(lang));

    if (lang !== 'en' && !matchingVoice && voices.length > 0) {
      // Voice not available for this language on device
      if (onError) {
        const langName = lang === 'hi' ? 'Hindi (हिन्दी)' : 'Telugu (తెలుగు)';
        onError(`Notice: Your device has no native ${langName} voice pack installed. You can read the transcribed rate on the card.`);
      }
      return false;
    }

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 0.92; // Slightly measured pace for utmost clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        if (onError) onError('Speech synthesis encountered an error.');
      }
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    if (onError) onError('Unable to activate speech audio.');
    return false;
  }
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
