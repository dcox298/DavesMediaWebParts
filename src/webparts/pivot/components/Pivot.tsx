import * as React from 'react';
//import styles from './Pivot.module.scss';
import type { IPivotProps } from './IPivotProps';
import { Stack, Pivot, PivotItem, TextField, PrimaryButton } from '@fluentui/react';
import { IDavesPivotItem } from '../models/IDavesPivotItem';
import DavesRichText from './DavesRichText';

interface IPivotState {
  currentTab:IDavesPivotItem
}
export default class PivotRoot extends React.Component<IPivotProps, IPivotState> {

  constructor(props:IPivotProps){
    super(props);
    this.state={
      currentTab:{
        id:0,
        headerText:'',
        content:''
      }
    }
    this.onSubmit=this.onSubmit.bind(this);
    this.onHeaderUpdate=this.onHeaderUpdate.bind(this);
    this.onContentUpdate=this.onContentUpdate.bind(this);
  }
  private onSubmit():void{
    let newArray:IDavesPivotItem[]=this.props.tabs;
    newArray.push(this.state.currentTab);
    this.setState({currentTab:{
      id:0,
      headerText:'',
      content:''
    }});
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
  private onContentUpdate(text:string){
    const tab:IDavesPivotItem=this.state.currentTab;
    this.setState({
      currentTab:{
        id:tab.id,
        headerText:tab.headerText,
        content:text
      }
    })
    return text
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
                        <DavesRichText displayMode={displayMode} content={this.state.currentTab.content||''} onChange={this.onContentUpdate} />
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
                      <DavesRichText displayMode={displayMode} content={item.content || ''} onChange={undefined} />
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
