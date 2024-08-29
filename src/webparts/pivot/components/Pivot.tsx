import * as React from 'react';
//import styles from './Pivot.module.scss';
import type { IPivotProps } from './IPivotProps';
import { Stack, Pivot, PivotItem, TextField, PrimaryButton } from '@fluentui/react';


import { RichText } from '@pnp/spfx-controls-react/lib/RichText';
import { IDavesPivotItem } from '../models/IDavesPivotItem';
//import { escape } from '@microsoft/sp-lodash-subset';

interface IPivotState {
  currentTab:IDavesPivotItem
}
export default class PivotRoot extends React.Component<IPivotProps, IPivotState> {
     /**
   * onTextChange
   */
     private onTextChange = (newText: string):string => {
   
      return newText;
    }
    
  constructor(props:IPivotProps){
    super(props);
    this.state={
      currentTab:{
        id:1,
        headerText:'T',
        content:''
      }
    }
    this.onSubmit=this.onSubmit.bind(this);
    this.onHeaderUpdate=this.onHeaderUpdate.bind(this);
  }
  private onSubmit():void{
    let newArray:IDavesPivotItem[]=this.props.tabs;
    newArray.push(this.state.currentTab);
    this.props.onSave(newArray);
  }
  private onHeaderUpdate(ev: any,newValue: any):void{
    const tab:IDavesPivotItem=this.state.currentTab;
    this.setState({
      currentTab:{
        id:tab.id,
        headerText:newValue,
        content:tab.content
      }
    })
  }
  public render(): React.ReactElement<IPivotProps> {
    const {
       tabs,
       displayMode
       
    } = this.props;

    return (
     <Stack>
        <Stack.Item>
          <Pivot>
            {displayMode===2 &&( 
            <PivotItem
               key={0}
               headerText={'Add'}
              >
                <Stack>
                  <Stack.Item align='end'>
                    <PrimaryButton iconProps={{iconName:'Save'}} onClick={this.onSubmit}/>
                  </Stack.Item>
                    <Stack.Item>
                        <TextField label='Tab Header' value={this.state.currentTab.headerText} onChange={this.onHeaderUpdate} />
                    </Stack.Item>
                    <Stack.Item>
                        <RichText value={''}/>
                    </Stack.Item>
                    
                </Stack>
              </PivotItem>
            )}
            {tabs.map((item)=>(
              <PivotItem
               key={item.id}
               headerText={item.headerText}
              >
                <Stack>
                  {displayMode==2 && (
                    <Stack.Item>
                        <TextField label='Header' value={item.headerText} />
                    </Stack.Item>
                  )}
                    <Stack.Item>
                        <RichText isEditMode={displayMode==2} value={item.content} onChange={(text)=>this.onTextChange(text)}/>
                    </Stack.Item>
                </Stack>
              </PivotItem>
            ))}
          </Pivot>
        </Stack.Item>
     </Stack>
    );
  }
}
