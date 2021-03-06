import { Set_Detail, Set_UserArr, Set_Input1, Set_Call, Set_Input2, Set_Num,
    Set_RealArr, Set_RedoArr, Set_Sort, Set_Temp, Set_UndoArr, Set_User,
    Set_User2, Set_Data, Set_UserName, Set_PictureUrl, Set_Check, Set_UserDetail } from "./actiontype";

export const setInput1 = (payload) => ({
    type: Set_Input1,
    payload,
})

export const setInput2 = (payload) => ({
    type: Set_Input2,
    payload,
})

export const setNum = (payload) => ({
    type: Set_Num,
    payload,
})

export const setRealArr = (payload) => ({
    type: Set_RealArr,
    payload,
})

export const setUndoArr = (payload) => ({
    type: Set_UndoArr,
    payload,
})

export const setRedoArr = (payload) => ({
    type: Set_RedoArr,
    payload,
})

export const setSort = (payload) => ({
    type: Set_Sort,
    payload,
})

export const setTemp = (payload) => ({
    type: Set_Temp,
    payload,
})

export const setUser = (payload) => ({
    type: Set_User,
    payload,
})

export const setUser2 = (payload) => ({
    type: Set_User2,
    payload,
})

export const setCall = (payload) => ({
    type: Set_Call,
    payload,
})

export const setData = (payload) => ({
    type: Set_Data,
    payload,
})

export const setUserName = (payload) => ({
    type: Set_UserName,
    payload,
})

export const setUserArr = (payload) => ({
    type: Set_UserArr,
    payload,
})

export const setPictureUrl = (payload) => ({
    type: Set_PictureUrl,
    payload,
})

export const setDetail = (payload) => ({
    type: Set_Detail,
    payload,
})

export const setCheck = (payload) => ({
    type: Set_Check,
    payload,
})

export const setUserDetail = (payload) => ({
    type: Set_UserDetail,
    payload,
})