import createCache from '@emotion/cache';

const createEmotionCache = () => {
  return createCache({ key: 'test--key', prepend: true });
};

export default createEmotionCache;