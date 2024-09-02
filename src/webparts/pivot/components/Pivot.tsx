import * as React from 'react';
//import styles from './Pivot.module.scss';
import type { IPivotProps } from './IPivotProps';
import { Stack, Pivot, PivotItem, TextField,DefaultButton, DefaultPalette,  } from '@fluentui/react';
import { IDavesPivotItem } from '../models/IDavesPivotItem';
import DavesRichText from './DavesRichText';
import { RichText } from '@pnp/spfx-controls-react/lib/RichText';

interface IPivotState {
  currentTab:IDavesPivotItem;
}
export default class PivotRoot extends React.Component<IPivotProps, IPivotState> {

  constructor(props:IPivotProps){
    super(props);
    this.state={
      currentTab:this.props.tabs.length!==0?this.props.tabs[0]:{key:'add',headerText:'',content:''}
    }
    this.onDelete=this.onDelete.bind(this);
    this.onHeaderUpdate=this.onHeaderUpdate.bind(this);
    this.onContentUpdate=this.onContentUpdate.bind(this);
    this.onSelectedTab=this.onSelectedTab.bind(this);
  }
  private onDelete():void{
    const otherTab:IDavesPivotItem=this.props.onDelete(this.state.currentTab);
    this.setState({
      currentTab:otherTab
    })
  }
  private onHeaderUpdate(ev: any,newValue: any):void{
    const tab:IDavesPivotItem=this.state.currentTab;
    tab.headerText= newValue;
    this.setState({
      currentTab:tab
    })
  }
  private onContentUpdate(text:string){
    const tab:IDavesPivotItem=this.state.currentTab;
    tab.content= text;
    this.setState({
      currentTab:tab
    })
    return text
  }
  private onSelectedTab(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>){
    if(item?.props.itemKey==='add'){
      const newTab:IDavesPivotItem = this.props.onAdd();
      this.setState({
        currentTab:newTab
      })
    }else{
      this.setState({
        currentTab:this.props.tabs[Number(item?.props.itemKey)]
      })
    }
    
    
  }
  public render(): React.ReactElement<IPivotProps> {
    const {
       tabs,
       displayMode
    } = this.props;

   // tabs.reverse();
   const reversedArrary:IDavesPivotItem[]= [...tabs].reverse();

    return (
     <Stack>
        <Stack.Item>
          <Pivot
            onLinkClick={this.onSelectedTab}
            overflowBehavior={'menu'}
            selectedKey={this.state.currentTab.key}
          >
            {displayMode===2 &&( 
              <PivotItem
                itemKey={'add'}
                itemIcon='add'
              >
                {this.props.tabs.length===0 && (
                  <Stack>
                    <RichText isEditMode={false} value='<h3>Click + above to create your fist tab!</h3>'/>
                  </Stack>
                )}
              </PivotItem>
            )}
            {reversedArrary.map((item)=>(
              <PivotItem
                key={item.key}
                itemKey={item.key}
                headerText={item.headerText||'*New*'}
              >
                <Stack>
                  {(displayMode===2 && this.state.currentTab===item)? (
                    <>
                    <Stack.Item align='end'>
                        <DefaultButton iconProps={{iconName:'Delete'}} styles={{root:{backgroundColor:DefaultPalette.red}}} onClick={this.onDelete}/>
                    </Stack.Item>
                    <Stack.Item>
                        <TextField label='Tab Header'placeholder='New Tab' value={this.state.currentTab.headerText||''} onChange={this.onHeaderUpdate}/>
                    </Stack.Item>
                    <Stack.Item>
                      <DavesRichText displayMode={displayMode} content={item.content || ''} onChange={this.onContentUpdate} />
                    </Stack.Item>
                    </>
                  ):(
                    <Stack.Item>
                      <DavesRichText displayMode={displayMode} content={item.content || ''} onChange={undefined} />
                    </Stack.Item>
                  )}
                   
                </Stack>
              </PivotItem>
            ))}
          </Pivot>
        </Stack.Item>
     </Stack>
    );
  }
}
