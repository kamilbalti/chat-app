import { Set_Detail, Set_Data, Set_Call, Set_Temp, Set_Sort, Set_Input1, Set_Input2, Set_Num, Set_RealArr, Set_RedoArr,
  Set_UndoArr, Set_User, Set_User2, Set_UserName, Set_UserArr, Set_PictureUrl, Set_Check, Set_UserDetail, Set_Focus, 
  TYPING_STATUS, Set_TempArr, Set_CheckSetting, Set_Edit
} from "./actiontype";

const initialState = {
  realArr: [],
  inputVal: "",
  inputVal2: "",
  num: false,
  undoArr: [],
  redoArr: [],
  sort: false,
  temp: true,
  user: "loading",
  user2: false,
  call: false,
  data: false,
  detail: {},
  userArr: [],
  pictureUrl: "",
  check: false,
  userDetail: {},
  focus: false,
  typingUsers: [],
  tempArr: [],
  checkSetting: false,
  edit: false
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Set_RealArr:
      return {
        ...state,
        realArr: action.payload,
      };
    case Set_Num:
      return {
        ...state,
        num: action.payload,
      };
    case Set_UndoArr:
      return {
        ...state,
        undoArr: action.payload,
      };
    case Set_RedoArr:
      return {
        ...state,
        redoArr: action.payload,
      };
    case Set_Sort:
      return {
        ...state,
        sort: action.payload,
      };
    case Set_Temp:
      return {
        ...state,
        temp: action.payload,
      };
    case Set_Input1:
      return {
        ...state,
        inputVal: action.payload,
      };
    case Set_Input2:
      return {
        ...state,
        inputVal2: action.payload,
      };
    case Set_User:
      return {
        ...state,
        user: action.payload,
      };
    case Set_Focus:
      return {
        ...state,
        focus: action.payload,
      };
    case Set_User2:
      return {
        ...state,
        user2: action.payload,
      };
    case Set_Call:
      return {
        ...state,
        call: action.payload,
      };
    case Set_Data:
      return {
        ...state,
        data: action.payload,
      };

    case Set_UserName:
      return {
        ...state,
        userName: action.payload,
      };
    case Set_UserArr:
      return {
        ...state,
        userArr: action.payload,
      };

    case Set_PictureUrl:
      return {
        ...state,
        pictureUrl: action.payload,
      };

    case Set_Detail:
      return {
        ...state,
        detail: action.payload,
      };

    case Set_Check:
      return {
        ...state,
        check: action.payload,
      };

    case Set_UserDetail:
      return {
        ...state,
        userDetail: action.payload,
      };

      case Set_TempArr:
        return {
          ...state,
          tempArr: action.payload,
        };

    case TYPING_STATUS:
        console.log(action?.payload, "payload")
      return {
        ...state,
        typingUsers: action?.payload,
      };

    case Set_CheckSetting:
        console.log(action?.payload, "payload")
      return {
        ...state,
        checkSetting: action?.payload,
      };

    case Set_Edit:
        console.log(action?.payload, "payload")
      return {
        ...state,
        edit: action?.payload,
      };

    default:
      return state;
  }
};
export default Reducer;
