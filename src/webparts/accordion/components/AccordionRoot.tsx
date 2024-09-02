import * as React from 'react';

import type { IAccordionProps } from './IAccordionProps';
import { PrimaryButton, Stack } from '@fluentui/react';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { RichText } from '@pnp/spfx-controls-react/lib/RichText';
import { IDavesAccordion } from '../models/IDavesAccordion';

interface IAccordionState {
  current?:IDavesAccordion;
}

export default class AccordionRoot extends React.Component<IAccordionProps, IAccordionState> {

  constructor(props:IAccordionProps){
    super(props);
    this.state={
      
    }
    this.onDelete=this.onDelete.bind(this);
    this.onHeaderUpdate=this.onHeaderUpdate.bind(this);
    this.onContentUpdate=this.onContentUpdate.bind(this);
    this.onAddButtonCLick=this.onAddButtonCLick.bind(this);
  }
  private onDelete():void{

  }
  private onHeaderUpdate(ev: any,newValue: any):void{

  }
  private onContentUpdate(text:string){

  }
  private onAddButtonCLick(item?: any, ev?: React.MouseEvent<HTMLElement>){
    const newAccordian:IDavesAccordion=this.props.onAdd();
    this.setState({current:newAccordian});
  }
  public render(): React.ReactElement<IAccordionProps> {
    const {
      displayMode,

    } = this.props;
    const accordianItems:IDavesAccordion[]= [...this.props.accordianItems].reverse();
    return (
      <>
      {displayMode===2 && (
        <Stack horizontal >
          <Stack.Item>
            <PrimaryButton iconProps={{iconName:'add'}} onClick={this.onAddButtonCLick}/>
          </Stack.Item>
        </Stack>
      )}
      <Stack>
        <Stack.Item>
          {accordianItems.map((accordion,index)=>(
            <Accordion title={accordion.headerText||''} key={accordion.key} defaultCollapsed={displayMode!==2}         >
              <RichText isEditMode={displayMode===2} value={accordion.content}/>
            </Accordion>
        ))}
        </Stack.Item>
      </Stack>
      </>
    );
  }
}
