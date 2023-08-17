import {
  configureStore,
} from "@reduxjs/toolkit";
import { editorSlice } from "./slices/editor_slice";
import { counterSlice } from './slices/counter_slice'
import { utilSlice } from './slices/util_slice'

export const store = configureStore({
    reducer : {
        counterReducer : counterSlice.reducer,
        editorReducer : editorSlice.reducer,
        utilReducer : utilSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Actions 
export const { 
  hideMenu, showMenu, addLayer, 
  editLayer, removeLayer, disableAutoplay,
  disableEditing, enableAutoplay, 
  enableEditing, updateAnimation,
  updateName, setBgColor,
  disableAnimating,enableAnimating,setAnimationName,
  disableRecording,enableRecording,
  setEaseType,setLayersIndex,setAnimationDelta,
  setAnimationDuration,setVideoLength,setShadow,setSkew
} = editorSlice.actions

export const { actions : editorActions } = editorSlice
export const { actions : utilActions } = utilSlice

export const { addMediaChunks,setMediaRecorder, setFabImages,addFabImage, setTempLayers,updateTempLayer, setUtilLayers,updateUtilLayers,setExpandedLayerIndex,setDesktop } = utilSlice.actions
