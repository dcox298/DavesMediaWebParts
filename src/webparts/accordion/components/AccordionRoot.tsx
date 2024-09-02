import * as React from 'react';

import type { IAccordionProps } from './IAccordionProps';
import { DefaultButton, DefaultPalette, PrimaryButton, Stack, TextField } from '@fluentui/react';
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
    this.onSelectedAccordion=this.onSelectedAccordion.bind(this);
  }
  private onDelete(key:string|undefined):void{
    const selAccordian:IDavesAccordion=this.props.accordianItems[Number(key)]||undefined;
    if(selAccordian){
      this.props.onDelete(selAccordian);
      this.setState({current:undefined});
    }
  }
  private onHeaderUpdate(ev: any,newValue: any):void{

  }
  private onContentUpdate(text:string){

  }
  private onAddButtonCLick(item?: any, ev?: React.MouseEvent<HTMLElement>){
    const newAccordian:IDavesAccordion=this.props.onAdd();
    this.setState({current:newAccordian});
  }
  private onSelectedAccordion(key:string|undefined):void{
    const selAccordian:IDavesAccordion=this.props.accordianItems[Number(key)]||undefined;
    if(selAccordian){
      this.setState({current:selAccordian});
    }
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
            <Accordion title={accordion.headerText||''} key={accordion.key} defaultCollapsed={displayMode!==2}>
              <Stack>       
              {displayMode===2 && (
                <Stack.Item align='end'>
                    {accordion===this.state.current?(
                      <Stack horizontal tokens={{childrenGap:10}}>
                        <Stack.Item>
                          <DefaultButton styles={{root:{backgroundColor:DefaultPalette.red}}} iconProps={{iconName:'delete'}} onClick={()=>this.onDelete(accordion.key)}/>
                        </Stack.Item>
                        <Stack.Item>
                          <PrimaryButton iconProps={{iconName:'save'}} />
                        </Stack.Item>
                      </Stack>
                      
                    ):
                    (
                      <DefaultButton iconProps={{iconName:'edit'}} onClick={()=>this.onSelectedAccordion(accordion.key)}/>
                    )
                    }       
                </Stack.Item>
               )}
               {(displayMode===2 && accordion===this.state.current) && (
                <Stack.Item>
                  <TextField styles={{root:{margin:5}}} label='Header' value={this.state.current.headerText} />
                </Stack.Item>
               )}
                <Stack.Item>
                  <RichText isEditMode={accordion===this.state.current} value={accordion.content}/>
                </Stack.Item>
              </Stack>
            </Accordion>
        ))}
        </Stack.Item>
      </Stack>
      </>
    );
  }
}
