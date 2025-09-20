export interface CulturalContext {
  code: string;
  name: string;
  traditions: string[];
  proverbs: string[];
  communicationStyle: 'direct' | 'indirect' | 'contextual';
  familyStructure: 'nuclear' | 'extended' | 'community';
  relationshipValues: string[];
}

const culturalContexts: Record<string, CulturalContext> = {
  nigeria: {
    code: 'nigeria',
    name: 'Nigeria',
    traditions: ['Yoruba Proverbs', 'Durbar Festival', 'Extended Family Values'],
    proverbs: [
      'Eniyan ni aṣọ mi - People are my clothing',
      'Bi a ba n gun igi ti o ga, a o gbọdọ gbagbe pe kaakiri lo de ori - When we climb a tall tree, we must not forget that we reached the top with the help of the ground',
      'Agbon ti o ba ti wo inu agbon eran, a o le mo iye eran ti o wa ninu - The coconut that has not looked inside another coconut cannot know the amount of milk in it',
    ],
    communicationStyle: 'contextual',
    familyStructure: 'extended',
    relationshipValues: ['respect for elders', 'community harmony', 'collective responsibility'],
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    traditions: ['Afternoon Tea', 'Pub Culture', 'Royal Traditions'],
    proverbs: [
      'A cup of tea solves everything',
      'Keep calm and carry on',
      'Good things come to those who wait',
    ],
    communicationStyle: 'indirect',
    familyStructure: 'nuclear',
    relationshipValues: ['politeness', 'understatement', 'privacy'],
  },
  us: {
    code: 'us',
    name: 'United States',
    traditions: ['Thanksgiving', 'Independence Day', 'Regional Customs'],
    proverbs: [
      'Actions speak louder than words',
      'The early bird catches the worm',
      'When life gives you lemons, make lemonade',
    ],
    communicationStyle: 'direct',
    familyStructure: 'nuclear',
    relationshipValues: ['individual expression', 'equality', 'personal achievement'],
  },
};

export class CulturalPersonalization {
  static getContext(culture: string): CulturalContext | null {
    return culturalContexts[culture] || null;
  }

  static getRandomProverb(culture: string): string {
    const context = this.getContext(culture);
    if (!context || context.proverbs.length === 0) {
      return 'Small gestures create strong bonds.';
    }
    
    const randomIndex = Math.floor(Math.random() * context.proverbs.length);
    return context.proverbs[randomIndex];
  }

  static adaptMessage(baseMessage: string, culture: string): string {
    const context = this.getContext(culture);
    if (!context) return baseMessage;

    // Adapt based on communication style
    switch (context.communicationStyle) {
      case 'direct':
        return baseMessage;
      case 'indirect':
        return `Perhaps you might consider... ${baseMessage.toLowerCase()}`;
      case 'contextual':
        return `In the spirit of ubuntu... ${baseMessage.toLowerCase()}`;
      default:
        return baseMessage;
    }
  }

  static getRelationshipInsight(culture: string, relationshipType: string): string {
    const context = this.getContext(culture);
    
    if (culture === 'nigeria') {
      switch (relationshipType) {
        case 'romantic':
          return "In Yoruba tradition, 'Ife l'agbon, ife l'eso' - Love is wisdom, love is fruit. Take time to understand each other deeply.";
        case 'family':
          return "Family bonds are sacred in Nigerian culture. Consider calling an elder or sharing a meal together.";
        case 'friend':
          return "True friendship, like palm wine, gets better with time. Invest in your friendships consistently.";
        default:
          return "As they say, 'Eniyan ni aṣọ mi' - surround yourself with good people.";
      }
    }

    // Default insights for other cultures
    switch (relationshipType) {
      case 'romantic':
        return "Strong relationships are built on daily small acts of kindness and understanding.";
      case 'family':
        return "Family connections thrive when we make time for regular, meaningful conversations.";
      case 'friend':
        return "The best friendships are nurtured through consistent care and genuine interest.";
      default:
        return "Every relationship benefits from intentional care and thoughtful communication.";
    }
  }

  static getCulturalGifts(culture: string): Array<{ name: string; description: string; affiliate?: string }> {
    const giftsByculture = {
      nigeria: [
        { name: 'Ankara Fabric Items', description: 'Beautiful traditional patterns for personal items' },
        { name: 'Nigerian Music Playlist', description: 'Curated Afrobeats and traditional songs' },
        { name: 'Jollof Rice Kit', description: 'Ingredients to cook together' },
        { name: 'Yoruba Poetry Book', description: 'Traditional wisdom and modern interpretations' },
      ],
      uk: [
        { name: 'Premium Tea Selection', description: 'Artisanal blends for afternoon tea' },
        { name: 'British Literature', description: 'Classic and contemporary authors' },
        { name: 'Cozy Home Items', description: 'Blankets and candles for hygge moments' },
      ],
      us: [
        { name: 'Local Experience Vouchers', description: 'Activities in your city' },
        { name: 'Artisanal Coffee', description: 'Small batch roasters' },
        { name: 'Outdoor Gear', description: 'For hiking and adventures' },
      ],
    };

    return giftsByculture[culture as keyof typeof giftsByculture] || [
      { name: 'Thoughtful Care Package', description: 'Curated items for self-care' },
      { name: 'Personalized Photo Album', description: 'Memories you\'ve shared together' },
      { name: 'Handwritten Letter', description: 'Express your feelings authentically' },
    ];
  }
}