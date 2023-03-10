import Icon from './Icon';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DragHandler, SortableWrapper, SortItem } from '../styles/sort';
import { reorder } from '../utils/core';
import EmptyState from './EmptyState';

type Props = {
  fields: any[];
  child: (field: any) => void;
  onChangeFields: (reorderedFields: any, destinationIndex?: number) => void;
  isModal?: boolean;
  showDragHandler?: boolean | true;
  isDragDisabled?: boolean;
  droppableId?: string;
  emptyMessage?: string;
};

class SortableList extends React.Component<Props> {
  static defaultProps = {
    droppableId: 'droppableId'
  };

  onDragEnd = result => {
    const { destination, source } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const { fields, onChangeFields } = this.props;
    const reorderedFields = reorder(fields, source.index, destination.index);

    onChangeFields(reorderedFields, destination.index);
  };

  renderDragHandler() {
    const { showDragHandler = true } = this.props;

    if (!showDragHandler) {
      return null;
    }

    return (
      <DragHandler>
        <Icon icon="move" />
      </DragHandler>
    );
  }

  render() {
    const {
      fields,
      child,
      isDragDisabled,
      droppableId = '',
      emptyMessage = 'There is no fields'
    } = this.props;

    if (fields.length === 0) {
      return <EmptyState text={emptyMessage} icon="ban" />;
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={droppableId.toString()} type="ITEMS">
          {provided => (
            <SortableWrapper
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field._id || index}
                  draggableId={field._id.toString() || index || Math.random()}
                  index={index}
                  isDragDisabled={isDragDisabled}
                >
                  {(dragProvided, snapshot) => (
                    <SortItem
                      innerRef={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      column={field.column}
                    >
                      {this.renderDragHandler()}
                      {child(field)}
                    </SortItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </SortableWrapper>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default SortableList;
