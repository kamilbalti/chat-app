import { Set_Detail, Set_UserArr, Set_Input1, Set_Call, Set_Input2, Set_Num,
    Set_RealArr, Set_RedoArr, Set_Sort, Set_Temp, Set_UndoArr, Set_User,
    Set_User2, Set_Data, Set_UserName, Set_PictureUrl, Set_Check, Set_UserDetail, Set_Focus, TYPING_STATUS, Set_TempArr, Set_CheckSetting, Set_Edit, Set_DownloadingUrl, Set_SendPicture, Set_TempArr2 } from "./actiontype";

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

export const setFocus = (payload) => ({
    type: Set_Focus,
    payload,
})

export const setTypingUsers = (payload) => ({
    type: TYPING_STATUS,
    payload,
})

export const setTempArr = (payload) => ({
    type: Set_TempArr,
    payload,
})

export const setTempArr2 = (payload) => ({
    type: Set_TempArr2,
    payload,
})

export const setCheckSetting = (payload) => ({
    type: Set_CheckSetting,
    payload,
})

export const setEdit = (payload) => ({
    type: Set_Edit,
    payload,
})

export const setDownloadingUrl = (payload) => ({
    type: Set_DownloadingUrl,
    payload,
})

export const setSendPicture = (payload) => ({
    type: Set_SendPicture,
    payload,
})