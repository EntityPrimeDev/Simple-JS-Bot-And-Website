function isSpam(message) {
    const content = message.content.toLowerCase();
    if(message.author.bot) return;

    if (message.content.match(/^<@!?\d+>+\s*$/)) {
        return false;
    }

    if (/([^\w\s])\1{4,}/.test(content) || /(\b\w+\b)(?=.*?\b\1\b)/gi.test(content)) {
      return true;
    }
    
    if ((content.match(/[A-Z]/g) || []).length >= 10) {
      return true;
    }
  
    // Detects messages containing excessive exclamation marks
    if ((content.match(/!/g) || []).length >= 10) {
      return true;
    }
  
    // Detects messages containing excessive emoji
    const emojiRegex = /(<:[a-zA-Z0-9_]+:[0-9]+>|<a?:[a-zA-Z0-9_]+:[0-9]+>|[\u200D\uFE0F\u{1F3FB}-\u{1F3FF}\u{E0020}-\u{E007F}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}])/gu;
    if ((content.match(emojiRegex) || []).length >= 5) {
      return true;
    }
    
    if (content.length < 5) {
      return false;
    }

    if(content.length > 1000) {
        return true
    }
    
    const now = Date.now();
    const messages = message.channel.messages.cache.filter(m => m.author.id === message.author.id && m.createdTimestamp > now - 10000);
    if (messages.size >= 5) {
      return true;
    }

    
    return false;
}

module.exports = { isSpam }