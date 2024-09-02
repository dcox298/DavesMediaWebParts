import * as React from 'react';

import { RichText } from '@pnp/spfx-controls-react/lib/RichText';


interface IDavesRichTextProps {
  displayMode:number;
  content:string;
  onChange:any;
}
export default class DavesRichText extends React.Component<IDavesRichTextProps, {}> {
 
  constructor(props:IDavesRichTextProps){
    super(props);
  }
 

  public render(): React.ReactElement<IDavesRichTextProps> {
    const {
       displayMode,
       content
    } = this.props;

    return (
        <RichText isEditMode={displayMode===2} value={content} onChange={this.props.onChange}/>         
    );
  }
}
