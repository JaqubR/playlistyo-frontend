import { createState } from '@hookstate/core';

const currentSectionState = createState('Authentication');
const searchTermState = createState('');
const isAuthenticatedState = createState(false);
const favouriteAlbumsState = createState([]);
const favouriteArtistsState = createState([]);
const playlistState = createState([]);
const isOverlayShownState = createState(false);
const overlayInfoState = createState({});

export { currentSectionState, searchTermState, isAuthenticatedState, favouriteAlbumsState, favouriteArtistsState, playlistState, isOverlayShownState, overlayInfoState };