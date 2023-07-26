import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import LeadPaper from './LeadPaper';
import { makeStyles } from '@material-ui/core';
//---------------------------------------------------------
const useStyles = makeStyles((theme) => {
  return {
    item: {
      margin: '5px',
    },
  };
});
//---------------------------------------------------------
function DroppableDraggable({ stage, leads }) {
  const classes = useStyles();
  return (
    <Droppable droppableId={String(stage.id)}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="droppable-col">
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
                        <LeadPaper keyVal={lead.id} lead={lead} />
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
export default React.memo(DroppableDraggable);
