import { AnyAction } from 'redux';

import {
	signInFailed,
	signUpFailed,
	signOutFailed,
	signOutSuccess,
	signInSuccess,
} from './user.action';

import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signInFailed.match(action) ||
		signUpFailed.match(action) ||
		signOutFailed.match(action)
	) {
		if (action.payload.message.includes('auth/user-not-found')) {
			alert('no user associated with this email');
		}

		if (action.payload.message.includes('auth/wrong-password')) {
			alert('incorrect password for email');
		}

		if (action.payload.message.includes('auth/email-already-in-use')) {
			alert('Cannot create user, email already in use');
		}

		return { ...state, error: action.payload };
	}

	return state;
};
