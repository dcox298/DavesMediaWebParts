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
    this.onSelectedTab=this.onSelectedTab.bind(this);
  }
  private onDelete():void{

  }
  private onHeaderUpdate(ev: any,newValue: any):void{

  }
  private onContentUpdate(text:string){

  }
  private onSelectedTab(item?: any, ev?: React.MouseEvent<HTMLElement>){

  }
  public render(): React.ReactElement<IAccordionProps> {
    const {
      displayMode
    } = this.props;

    return (
      <>
      {displayMode===2 && (
        <Stack horizontal >
          <Stack.Item>
            <PrimaryButton iconProps={{iconName:'add'}} />
          </Stack.Item>
        </Stack>
      )}
      <Stack>
        <Stack.Item>
          <Accordion title={'once'} defaultCollapsed={displayMode!==2}>
            <RichText isEditMode={displayMode===2} value='<p>sample text</p>'/>
          </Accordion>
          <Accordion title={'twp'} defaultCollapsed={displayMode!==2}>
            <RichText isEditMode={displayMode===2} value='<p>sample text 2</p>'/>
          </Accordion>
        </Stack.Item>
      </Stack>
      </>
    );
  }
}
