export { default as reducer } from './reducer';
export { IState, IAction, ISearchProfilesByFullNameInput, IFriendSuggestionData } from './Types';
export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IFriendData,
	IRemoveFriendInput,
	IFindFriendsSuggestionsInput,
	IUpdateProfileInput,
	IPostArrayData,
} from '@socialx/api-data';
export { searchProfilesByFullName, findFriendsSuggestions } from './actions';
