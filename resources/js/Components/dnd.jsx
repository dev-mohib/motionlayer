import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setExpandedLayerIndex, setUtilLayers, updateUtilLayers } from "@/state/store";
import { GridIcon, RotateIcon, TransformIcon, FlipIcon } from './icons'

const reOrder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


function Layer({ list, index }) {
  const { bgColor, shadow } = useAppSelector(s => s.editorReducer)
  const { expandedLayerIndex } = useAppSelector(s => s.utilReducer)

  const dispatch = useAppDispatch()
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div className={`bg-gray-800 ${expandedLayerIndex != index && 'hover:bg-gray-700'} cursor-pointer border-2 border-gray-600  rounded my-1`}>
            <div
                className="flex flex-row justify-between w-full h-12  rounded items-center cursor-pointer"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => {
                  if(expandedLayerIndex == index)
                  dispatch(setExpandedLayerIndex(null))
                  else
                  dispatch(setExpandedLayerIndex(index))
                }}
                >
                <div className='w-12 h-12' style={{backgroundColor : bgColor}}>
                    <img className="h-full w-full" src={list.url} />
                </div>
                <div className='h-12 w-2/4 flex items-center pl-3'>{list.name}</div>
                <div className='h-12 w-1/4 flex items-center justify-end pr-2'>
                    <GridIcon className='hover:text-gray-600 cursor-grabbing' size={20} />
                </div>
            </div>
            <div className="rounded-bl-xl rounded-br-xl shadow-xl transition-all" style={{height : expandedLayerIndex == index ? '100px' : '0px'}}>
            {expandedLayerIndex == index &&
              <div className="py-1 px-2">
                {shadow.enabled&&<div ><label htmlFor="speed-range" className="block mb-0.5 text-sm font-medium text-white dark:text-gray-300 flex-row-between pr-3">Shadow <span>{list.shadow}</span></label>
                  <input value={list.shadow} 
                      onChange={e => dispatch(updateUtilLayers({index, data : {shadow : parseFloat(e.target.value)}}))} 
                      className="w-full h-0.5 bg-gradient-to-tl from-gray-700 to-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                      step={0.1} min={0} max={1} type="range"  
                  />
                </div>}
                <div>
                  <label htmlFor="speed-range" className="block mb-0.5 text-sm font-medium text-white dark:text-gray-300 flex-row-between pr-3">Opacity <span>{list.opacity}</span></label>
                  <input value={list.opacity} 
                    onChange={e => dispatch(updateUtilLayers({index, data : {opacity : parseFloat(e.target.value)}}))} 
                    step={0.1} min={0.1} max={1} type="range"  
                    className="w-full h-0.5 bg-gradient-to-tl from-gray-700 to-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                  />
                </div>

                <div className='flex flex-row justify-between mt-2'>
                  <span>Animate</span>
                  <label className="switch-2">
                    <input type="checkbox" checked={list.animate} onChange={e => dispatch(updateUtilLayers({index, data : {...list, animate : e.target.checked}}))} />
                  </label>
                </div>

                {/* <div className='flex flex-row justify-between mt-2'>
                  <span>Stretch</span>
                  <label className="switch-2">
                    <input type="checkbox" checked={list.stretch} onChange={e => dispatch(updateUtilLayers({index, data : {...list, stretch : e.target.checked}}))} />
                  </label>
                </div> */}
              </div>
            }
            </div>
        </div>
      )}
    </Draggable>
  );
}

const LayersList = React.memo(function LayersList({ layers }) {
  return layers.map((layer, index) => (
    <Layer list={layer} index={index} key={layer.id} />
  ));
});

function LayerDnd() {
  const dispatch = useAppDispatch()
  const { layers } = useAppSelector(s => s.utilReducer)

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const _layers = reOrder(
      layers,
      result.source.index,
      result.destination.index
    );

    dispatch(setUtilLayers(_layers))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div className="w-52" ref={provided.innerRef} {...provided.droppableProps}>
            <LayersList layers={layers} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default LayerDnd