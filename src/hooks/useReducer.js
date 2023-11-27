import { disliked, liked } from "@/src/utlis/liked";


export const initialState = {
  logintoggle: false,
  signuptoggle: false,
  forgettoggle: false,
  logout: true,
  formSubmission:false,
  wishlist: [],
  sliderArrow: "",
  userdata: null,
  customSelection: {},
  filterData: {},
  editcustomSelection:{}

}

export function reducer(state, action) {
  const { type, payload } = action
  switch (type) {

    case 'togglelogin': {
      return {
        ...state,
        logintoggle: payload
      };
    }
    case 'forgettoggle': {
      return {
        ...state,
        forgettoggle: payload
      };
    }
    case 'togglesignup': {
      return {
        ...state,
        signuptoggle: payload
      };
    }
    case 'formSubmission': {
      return {
        ...state,
        formSubmission: payload
      };
    }
    case 'setuserdata': {
      return { ...state, userdata: payload }

    }
    case 'logout': {

      return { ...state, logout: payload }

    }
    case 'Wishlist': {
      if (!state.wishlist.includes(payload)) {

        liked({ products: payload, users: state.userdata.id })
        const newstate = [...state.wishlist]
        newstate.push(payload)
        return { ...state, wishlist: newstate }
      } else {
        disliked(state.userdata.id, payload)
        let newstate = [...state.wishlist]
        newstate = newstate.filter(item => item !== payload)
        return { ...state, wishlist: newstate }

      }

    }
    case 'GetWishlist': {
      return { ...state, wishlist: payload }
    }
    case 'addcustomSelection': {
      if (!state?.customSelection[Object.keys(payload)[0]]) {
        const newstate = {...state.customSelection,...payload}
        return { ...state, customSelection: newstate }
      } else {
        const newstate = {...state.customSelection}
        newstate[Object.keys(payload)[0]] = Object.values(payload)[0]
         return  { ...state, customSelection: newstate }
      }
    }
    case 'editcustomSelection': {
      if (!state?.editcustomSelection[Object.keys(payload)[0]]) {
        const newstate = {...state.editcustomSelection,...payload}
        return { ...state, editcustomSelection: newstate }
      } else {
        const newstate = {...state.editcustomSelection}
        newstate[Object.keys(payload)[0]] = Object.values(payload)[0]
         return  { ...state, editcustomSelection: newstate }
      }
    }
    case 'clearCustomeSelection': {

      return { ...state, customSelection: {} }

    }
    case 'clearEditCustomeSelection': {

      return { ...state, editcustomSelection: {} }

    }
    case 'FilterData': {
   
        return { ...state, filterData:payload }
      }  
    

  }
  throw Error('Unknown action: ' + action.type);
}
