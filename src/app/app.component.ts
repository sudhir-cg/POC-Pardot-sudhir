import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, MenuItem, TreeNode } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';
import {PrimeIcons} from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MessageService]
})
export class AppComponent {
  // @ViewChild("chart") chart: UIChart;
  constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService,private ref: ChangeDetectorRef) {}

  displayModal: boolean = false;

  displayBasic: boolean = false;

  displayBasic2: boolean = false;

  displayMaximizable: boolean = false;

  displayPosition: boolean = false;

  position: string = '';
  //primeNG part
  data1: TreeNode[] = [];
  selectedNode: TreeNode | undefined;
  campaignName: string = "";
  campaignDescription:string="";
  startDate: Date|undefined;
  endDate: Date|undefined;
  flowOfTree:[{}] = [{}]
  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  // -----//
  items: MenuItem[] = [];
  isFirstNode: boolean = true;
  radioVal = { value: '' };

  recentNodeClicked: any;

  isClicked(data1: any) {
    debugger
    console.log(data1);
    this.recentNodeClicked = data1;
    this.displayBasic = true;
  }

  sendEmail(email: string, message: string) {
  }

  campaignDescriptionSaveBtn() {
    // console.log(this.campaignName);
    // console.log(this.campaignDescription);
    // console.log(this.startDate);
    // console.log(this.endDate);
    // console.log("Recent Node Clicked When Campaing Description Save is Clicked :  ");
    // console.log(this.recentNodeClicked)
    // //need to modify accordingly to prime ng
    // console.log("Recent node clicked: ")
    // console.log(this.recentNodeClicked);

    //add data to recent node clicked and format all the things accordingly
    let firstNode = {
      id: this.recentNodeClicked.node.key,
      type: "firstNode",
      data: {
        campaignName: this.campaignName,
        campaignDescription: this.campaignDescription,
        recipiantList: "",
        supressionList: "",
        startDate: this.startDate,
        endDate: this.endDate,
      }
    }
    console.log("First Node: ")
    console.log(firstNode);
    this.flowOfTree.push(firstNode);

    //now change the recent node clicked: 
    this.recentNodeClicked.node.label = firstNode.data.campaignName;
    //add one empty children too.
    this.pushDefaultNewNode();
    this.isFirstNode = false;
    // if(value == "email"){
    //   this.isFirstNode=false;
    //   console.log(this.recentNodeClicked);
    //   this.recentNodeClicked.node.children.push({
    //     key: (parseInt(this.recentNodeClicked.node.key) + 1).toString(),
    //     label: "Send Email",
    //     parent: this.recentNodeClicked,
    //     expanded: true,
    //     children: [],
    //     styleClass: 'p-person',
    //   })
    // }
    // else{
    //   this.isFirstNode=true;
    // }
    this.ref.detectChanges();
  }
  endCalled(endEvent: any): void {
    if (endEvent.item['items'] == undefined) {
      this.displayBasic = false;
    }
    console.log('end');
    console.log(endEvent);
    let endNode = {
      key: (parseInt(this.recentNodeClicked.node.key) + 1).toString(),
      label: 'End Node',
      parent: this.recentNodeClicked,
      expanded: true,
      children: [],
      selectable: false,
      styleClass: 'p-endNode',
    };
    this.recentNodeClicked.node.children.push(endNode);
    //  document.getElementById("myModal").setAttribute("data-bs-dismiss","modal")
  }
  tabCalled(hello: any) {
    console.log(hello);
  }

 removeByAttr = function(arr:any, attr: any, value: any){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}
  deleteNode(deleteEvent: any){
    // console.log("Inside delete node")
    // console.log(this.recentNodeClicked);
    const myParent = this.recentNodeClicked.node.parent.node.children
    // console.log("My Parent is : ")
    // console.log(myParent);
    
    const myId = this.recentNodeClicked.node.key
    // console.log("My ID is : ")
    // console.log(myId);
    this.removeByAttr(myParent, 'key', myId);   
    // console.log("Data one after deleting")
    // console.log(this.data1)
  }
  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Action',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Send Mail to Two Groups',
            icon: 'pi pi-fw pi-plus',
            command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.sendTwoMail(event);
              console.log(
                "Send two mail : : "
              )
              console.log(event);
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
            command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.deleteNode(event);
            },
          },
          {
            separator: true,
          },
          {
            label: 'Send Email',
            icon: 'pi-at',
            items:[
              {
                label: 'Send By Quiq',
                icon: 'pi pi-fw pi-external-link',
                command: (event) => {
                  //event.originalEvent: Browser event
                  //event.item: menuitem metadata
                  this.sendByQuiq(event);
                },
              },
              {
                label: 'Send By Twilio',
                icon: 'pi pi-fw pi-external-link',
                command: (event) => {
                  //event.originalEvent: Browser event
                  //event.item: menuitem metadata
                  this.sendByTwilio(event);
                },
              },
            ]
          },
          
        ],
      },
      {
        label: 'Trigger',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Rule',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
            
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                    items: [],

                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },

      {
        label: 'End',
        icon: 'pi pi-fw pi-power-off',
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.endCalled(event);
        },
      },
    ];
    this.data1 = [{
      key: '1',
      label: '+',
      expanded: true,
      children:[],
      styleClass: 'p-person',
      icon: "pi pi-times",
      type:"startNode"
  }];
  
  }
  sendByTwilio(event: any) {
    if (event.item['items'] == undefined) {
      this.displayBasic = false;
    }
    //change node and label
    this.recentNodeClicked.node.label = "Send By Twilio";
    this.pushDefaultNewNode();
  }
  //service send message by Quiq
  sendByQuiq(event: any) {
    if (event.item['items'] == undefined) {
      this.displayBasic = false;
    }
    //change node and label;
    this.recentNodeClicked.node.label = "Send By Quiq";
    this.pushDefaultNewNode();
  }
  sendTwoMail(twoMailEvent: any) {
    console.log("Send two mail called; ")
    console.log(this.recentNodeClicked)
    if (twoMailEvent.item['items'] == undefined) {
      this.displayBasic = false;
    }
    let node1 = {
      key: (parseInt(this.recentNodeClicked.node.key) + 1).toString(),
      label: `Double Email `,
      children: [],
      parent: this.recentNodeClicked,
      expanded: true,
      icon:PrimeIcons.PLUS,
      styleClass: 'p-person',
    };
    let node2 = {
      key: (parseInt(node1.key) + 1).toString(),
      label: `Double Email`,
      children: [],
      parent: this.recentNodeClicked,
      expanded: true,
      styleClass: 'p-person',
    };
    this.recentNodeClicked.node.children.push(node1, node2);
  }
  pushDefaultNewNode(){
    this.recentNodeClicked.node.children.push({
      key:( parseInt(this.recentNodeClicked.node.key)+1).toString(),
      label:"Add New Task",
      styleClass: 'p-person',
      expanded: true,
      children:[]
    });
  }
  onNodeSelect(event: any) {
    console.log("Node is clicked.")
    console.log(event);
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
}
}
