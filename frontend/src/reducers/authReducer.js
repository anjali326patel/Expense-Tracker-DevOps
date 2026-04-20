const initialState = {
  loginSuccess: null,
  loginLoading: false,
  registerLoading: false,
  updateBudgetLoading: false,
  updateBudgetSuccess: false,
  loginError: null,
  registerError: null,
  updateBudgetError: null,
  registerSuccess: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loginLoading: true,
        loginError: null,
      };
    case "REGISTER_REQUEST":
      return {
        ...state,
        registerLoading: true,
        registerError: null,
      };
    case "UPDATE_BUDGET_REQUEST":
      return {
        ...state,
        updateBudgetLoading: true,
        updateBudgetError: null,
      };
    case "BUDGET_STATE_RESET":
      return {
        ...state,
        updateBudgetLoading: false,
        updateBudgetError: null,
        updateBudgetSuccess: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        budget: action.payload.budget,
        loginSuccess: true,
        loginLoading: false,
        loginError: null,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        registerSuccess: action.payload,
        registerLoading: false,
        registerError: null,
      };

    case "UPDATE_BUDGET_SUCCESS":
      return {
    	...state,
    	budget: action.payload.budget, // ✅ FIX
    	updateBudgetLoading: false,
    	updateBudgetError: null,
    	updateBudgetSuccess: true,
    };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload,
      };

    case "REGISTER_ERROR":
      return {
        ...state,
        registerLoading: false,
        registerError: action.payload,
      };

    case "UPDATE_BUDGET_ERROR":
      return {
        ...state,
        updateBudgetLoading: false,
        updateBudgetError: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        loginError: null,
        loginSuccess: null,
        registerError: null,
      };
    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
