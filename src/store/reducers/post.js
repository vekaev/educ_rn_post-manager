import { ADD_POSTS, LOAD_POSTS, REMOVE_POSTS, TOGGLE_BOOKED } from '../types';

const initialState = {
  allPosts: [],
  bookedPosts: [],
  loading: true,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        bookedPosts: action.payload.filter(post => post.booked),
        loading: false,
      };
    case REMOVE_POSTS:
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post.id !== action.payload),
        bookedPosts: state.bookedPosts.filter(post => post.booked && post.id !== action.payload),
      };
    case ADD_POSTS:
      return {
        ...state,
        allPosts: [{ ...action.payload }, ...state.allPosts],
      };
    case TOGGLE_BOOKED:
      const allPosts = state.allPosts.map(post => {
        if (post.id === action.payload) {
          post.booked = !post.booked;
        }
        return post;
      });
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter(post => post.booked),
      };
    default:
      return state;
  }

};