import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type UtilState = {
    recordedChunks : any[],
    isDesktop : boolean,
    mediaRecorder : any,
    fabImages : any[],
    tempLayers : TempLayer[],
    layers : any[],
    expandedLayerIndex : number | null
}

export type TempLayer = {
    index : number,
    id : string,
    name : string,
    shadow : number,
    url? : string,
    opacity? : number,
    animate? : boolean,
    stretch? : boolean
}

const initialState : UtilState = {
    recordedChunks : [],
    mediaRecorder : null,
    fabImages : [],
    tempLayers : [],
    layers : [],
    expandedLayerIndex : null,
    isDesktop : true
}

export const utilSlice = createSlice({
    name : "utilSlice",
    initialState,
    reducers : {
        addMediaChunks : (state, action : PayloadAction<any>) => {
            state.recordedChunks = [...state.recordedChunks, action.payload]
        },
        setMediaRecorder : (state, action : PayloadAction<any>) => {
            state.mediaRecorder = action.payload
        },
        setFabImages : (state, action : PayloadAction<any>) => {
            state.fabImages = action.payload
        },
        addFabImage : (state, action : PayloadAction<any>) => {
            state.fabImages = [...state.fabImages, action.payload]
        },
        setTempLayers : (state, action : PayloadAction<TempLayer[]>) => {
            state.tempLayers = action.payload
        },
        updateTempLayer : (state, action : PayloadAction<{index: number, data : number}>) => {
            if(state.tempLayers.length >= action.payload.index)
            state.tempLayers[action.payload.index].shadow = action.payload.data
        },
        setUtilLayers : (state, action : PayloadAction<any[]>) => {
            state.layers = action.payload
        },
        updateUtilLayers : (state, action : PayloadAction<{index: number, data : {shadow? : number, opacity? : number}}>) => {
            if(state.layers.length >= action.payload.index)
            state.layers[action.payload.index] = {
                ...state.layers[action.payload.index],
                ...action.payload.data
            }
        },
        setExpandedLayerIndex : (state, action : PayloadAction<number | null>) => {
            state.expandedLayerIndex = action.payload
        },
        setDesktop : (state, action : PayloadAction<boolean>) => {
            state.isDesktop = action.payload
        }
    }
})