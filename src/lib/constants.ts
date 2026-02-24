export const constants = {
    APP_NAME: 'Do IT',
    VERSION: '0.1.0',
    ANIMATION_DURATION: 0.3,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_LOCALES: ['en', 'ar'],
    PLANS: {
        BASIC: {
            id: 'basic',
            price: 0,
            features: ['Personalized Dashboard', 'Standard Workout Plans', 'Water Tracker']
        },
        VIP: {
            id: 'vip',
            price: 19.99,
            features: ['Full Exercise Video Library', 'Custom Diet Plans', '1-on-1 Support', 'Progress Analysis']
        }
    }
};
