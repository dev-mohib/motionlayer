import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayerType,AnimationType,Shadow,EditorState, Skew } from "@/types/index.d";


  const initialState: EditorState = {
    projectName : "Untitled 123",
    isMenuOpened : false,
    openedMenu : '',
    layers : [],
    isAutoplay : false,
    isEditing : false,
    animation : null,
    isRecording : false,
    countDown : 5,
    bgColor : "#374151",
    isAnimating : false,
    animationName : 'TranslateV',
    easeType : 'easeInOutQuad',
    animationDelta : 30,
    animationDuration : 1500, //ms
    videoLength : 5, // default 5 seconds
    isFullScreen : false,
    shadow : {
      enabled : false,
      blur : 0.6
    },
    skew : {
      enabled : false,
      skewX : 3,
      skewY : 3
    },
    transformControls : false
    // rotation : 0
  };

export const editorSlice = createSlice({
    name : "editorSlice",
    initialState,
    reducers : {
        showMenu : (state, action : PayloadAction<string> ) => {
          state.isMenuOpened = true
          state.openedMenu = action.payload
        },
        hideMenu : (state) => {
          state.isMenuOpened = false
          state.openedMenu = ''
        },
        updateName : (state, action : PayloadAction<string>) => {
          state.projectName = action.payload
        },
        decreaseCountDown : (state) => {
          if(state.countDown >0  )
            state.countDown -= 1
        },
        setCountDown : (state, action:PayloadAction<number>) => {
            state.countDown = action.payload
        },
        enableAutoplay : (state)=> {
          state.isAutoplay = true
        },
        disableAutoplay : (state) => {
          state.isAutoplay = false
        },
        enableEditing : (state) => {
          state.isEditing = true
        },
        disableEditing : state => {
          state.isEditing = false
        },
        setLayersIndex : (state, action : PayloadAction<LayerType[]>) => {
          state.layers = action.payload
        },
        addLayer : (state, action : PayloadAction<LayerType>) => {
          state.layers = [...state.layers, action.payload]
        },
        removeLayer : (state, action : PayloadAction<number>) => {
          state.layers.filter(layer => layer.index !== action.payload)
        },
        editLayer : (state, action : PayloadAction<{index: number, data : any}>) => {
          state.layers.map(layer => layer.index === action.payload.index ? action.payload.data : layer)
        },
        updateAnimation : (state, action : PayloadAction<AnimationType>) => {
          state.animation = {
            ...state.animation,
            ...action.payload
          }
        },
        setBgColor : (state,action : PayloadAction<string>) => {
          state.bgColor = action.payload
        },
        enableAnimating : (state) => {
          state.isAnimating = true
        },
        disableAnimating : (state) => {
          state.isAnimating = false
        },
        setAnimationName : (state, action : PayloadAction<string>) => {
          state.animationName = action.payload
        },
        setEaseType : (state, action : PayloadAction<string>) => {
          state.easeType = action.payload
        },
        enableRecording : (state) => {
          state.isRecording = true
        },
        disableRecording : (state) => {
          state.isRecording = false
        },
        setAnimationDuration : (state, action : PayloadAction<number>) => {
          state.animationDuration = action.payload
        },
        setAnimationDelta : (state, action : PayloadAction<number>) => {
          state.animationDelta = action.payload
        },
        setVideoLength : (state, action : PayloadAction<number>) => {
          state.videoLength = action.payload
          state.countDown = action.payload
        },
        setShadow : (state, action : PayloadAction<Shadow>) => {
          state.shadow = {...state.shadow, ...action.payload}
        },
        setSkew : (state, action : PayloadAction<Skew>) => {
          state.skew = {...state.skew, ...action.payload}
        },
        setTransformControls: (state, action : PayloadAction<boolean>)=> {
          state.transformControls = action.payload
        }
    }
});