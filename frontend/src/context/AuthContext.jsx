import React, { createContext, useContext, useEffect, useReducer } from 'react';
import api from '../api/api.js';

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
  token: localStorage.getItem('token')
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null, loading: false };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      if (!state.token) return dispatch({ type: 'SET_USER', payload: null });
      try {
        const { data } = await api.get('/auth/me');
        dispatch({ type: 'SET_USER', payload: data.user });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      }
    };
    loadUser();
  }, [state.token]);

  useEffect(() => {
    if (state.token) localStorage.setItem('token', state.token);
    else localStorage.removeItem('token');
  }, [state.token]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  const value = { ...state, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

