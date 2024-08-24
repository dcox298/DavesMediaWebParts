import * as React from 'react';
//import styles from './Pivot.module.scss';
import type { IPivotProps } from './IPivotProps';
import { Stack, Pivot, PivotItem, TextField, PrimaryButton } from '@fluentui/react';


import { RichText } from '@pnp/spfx-controls-react/lib/RichText';
//import { escape } from '@microsoft/sp-lodash-subset';

export default class PivotRoot extends React.Component<IPivotProps, {}> {
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
                    <PrimaryButton iconProps={{iconName:'Save'}} />
                  </Stack.Item>
                    <Stack.Item>
                        <TextField label='Tab Header' value={''} />
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
                        <RichText isEditMode={displayMode==2} value={item.content}/>
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
