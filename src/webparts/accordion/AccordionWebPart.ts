import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AccordionWebPartStrings';
import Accordion from './components/AccordionRoot';
import { IAccordionProps } from './components/IAccordionProps';
import { IDavesAccordion } from './models/IDavesAccordion';

export interface IAccordionWebPartProps {
  description: string;
  accordianItems:IDavesAccordion[];
}

export default class AccordionWebPart extends BaseClientSideWebPart<IAccordionWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private onDelete = (selTab:IDavesAccordion):IDavesAccordion =>{
    const currentaccordianItems:IDavesAccordion[]=this.properties.accordianItems;
    const newaccordianItems:IDavesAccordion[]= currentaccordianItems.filter(tab => tab != selTab);
    let orderedaccordianItems:IDavesAccordion[]=newaccordianItems.map((value,i)=>{
      return {
        key:i.toString(),
        headerText:value.headerText,
        content:value.content
      }
    });

    this.properties.accordianItems=orderedaccordianItems;
    const otherTab=this.properties.accordianItems.length!==0?this.properties.accordianItems[0]:{key:'add',headerText:'',content:''};
    this.render();
    return otherTab
  }
  private onAdd = ():IDavesAccordion =>{
    const currentaccordianItems:IDavesAccordion[]=this.properties.accordianItems;
    const newTab:IDavesAccordion = {
      key:this.properties.accordianItems.length.toString(),
      headerText:'*new',
      content:''
    }
    currentaccordianItems.push(newTab)
    this.properties.accordianItems=currentaccordianItems;
    return newTab
  }

  public render(): void {
    const element: React.ReactElement<IAccordionProps> = React.createElement(
      Accordion,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        displayMode: this.displayMode,
        accordianItems:this.properties.accordianItems,
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
