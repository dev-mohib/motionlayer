import {
  configureStore,
} from "@reduxjs/toolkit";
import { editorSlice } from "./slices/editor_slice";
import { utilSlice } from './slices/util_slice'

export const store = configureStore({
    reducer : {
        editorReducer : editorSlice.reducer,
        utilReducer : utilSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { actions : editorActions } = editorSlice
export const { actions : utilActions } = utilSlice

export const { addMediaChunks,setMediaRecorder, setFabImages,addFabImage, setTempLayers,updateTempLayer, setUtilLayers,updateUtilLayers,setExpandedLayerIndex,setDesktop } = utilSlice.actions
