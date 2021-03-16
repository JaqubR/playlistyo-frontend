import { createState } from '@hookstate/core';

const currentSectionState = createState('Authentication');
const searchTermState = createState('');
const isAuthenticatedState = createState(false);
const favouriteAlbumsState = createState([]);
const favouriteArtistsState = createState([]);

export { currentSectionState, searchTermState, isAuthenticatedState, favouriteAlbumsState, favouriteArtistsState };