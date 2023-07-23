import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function DroppableDraggable() {
  return (
    <Droppable droppableId={String(stage.id)}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            // className="droppable-col"
          >
            {/* Maps through the leads of the stage */}
            {leads.map((lead, index) => {
              return (
                <Draggable
                  key={String(lead.id)}
                  index={index}
                  draggableId={String(lead.id)}>
                  {(provided) => {
                    return (
                      <div
                        className={classes.item}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <LeadPaper
                          keyVal={lead.id}
                          lead={lead}
                          handleDelete={handleDelete}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}
