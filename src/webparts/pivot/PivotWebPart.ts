import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PivotWebPartStrings';
import PivotRoot from './components/Pivot';
import { IPivotProps } from './components/IPivotProps';
import { IDavesPivotItem } from './models/IDavesPivotItem';

export interface IPivotWebPartProps {
  description: string;
  tabs:IDavesPivotItem[];
}

export default class PivotWebPart extends BaseClientSideWebPart<IPivotWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';


  private onDelete = (selTab:IDavesPivotItem):IDavesPivotItem =>{
    const currentTabs:IDavesPivotItem[]=this.properties.tabs;
    const newTabs:IDavesPivotItem[]= currentTabs.filter(tab => tab != selTab);
    let orderedTabs:IDavesPivotItem[]=newTabs.map((value,i)=>{
      return {
        key:i.toString(),
        headerText:value.headerText,
        content:value.content
      }
    });
    this.properties.tabs=orderedTabs;
    const otherTab=this.properties.tabs.length!==0?this.properties.tabs[0]:{key:'add',headerText:'',content:''};
    this.render();
    return otherTab
  }
  private onAdd = ():IDavesPivotItem =>{
    const currentTabs:IDavesPivotItem[]=this.properties.tabs;
    const newTab:IDavesPivotItem = {
      key:this.properties.tabs.length.toString(),
      headerText:undefined,
      content:''
    }
    currentTabs.push(newTab)
    this.properties.tabs=currentTabs;
    return newTab
  }

  public render(): void {
    const element: React.ReactElement<IPivotProps> = React.createElement(
      PivotRoot,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        tabs:this.properties.tabs,
        displayMode:this.displayMode,
        onDelete:this.onDelete,
        onAdd:this.onAdd
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
