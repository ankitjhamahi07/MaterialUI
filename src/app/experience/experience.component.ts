import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FateType } from '/home/nineleaps/Desktop/material-dashboard-angular2-master/src/app/experience/fate-type.enum'
import { FateControllerService } from 'fate-editor';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Globals } from '/home/nineleaps/Desktop/material-dashboard-angular2-master/src/globalid'
import { ActivatedRoute } from '@angular/router';
import { EmpService } from 'app/emp.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeCompany } from 'EmployeeCompany.model';

export interface Section {
  name: string;
  updated: Date;
  id:number;
}




@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  providers: [Globals]
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class ExperienceComponent implements OnInit {

  text2: any = "hey";
  modules: any;
  viewId: any;
  uploadCompany: FormGroup;
  uploadProject:FormGroup;
  addProject:FormGroup;
  companyDetails:any;

  companyId: any;
  empid:any;
  company:any;
  EditCompany: FormGroup;
  currentEditId:number;
  currentCompanyId: number;

  constructor(private global: Globals, private route: ActivatedRoute,
    private details: EmpService,
    private formBuilder: FormBuilder, public dialog:MatDialog) {
    this.viewId = this.global.role;
  }


  ngOnInit() {
    this.empid = this.global.role;


    this.ListCompany(this.empid);
    this.uploadCompany=this.formBuilder.group(
      {
        'CompanyName': [null, Validators.required],
        'Designation': [null, Validators.required],
        'EmployeeStartDate':[null, Validators.required],
        'EmployeeEndDate': [null, Validators.required],
         'Roles': [null, Validators.required],
      } 
    )

    this.uploadProject=this.formBuilder.group(
      {
        'ProjectName': [null, Validators.required],
        'ProjectDescription': [null, Validators.required],
        'ProjectTech':[null, Validators.required],
        // 'EmployeeId':[null, Validators.required],
        // 'CompanyId':[null, Validators.required],
        'ProjectId':[null, Validators.required],
        
      } 
    )


    this.EditCompany=this.formBuilder.group(
      {
        'CompanyName': [null, Validators.required],
        'Designation': [null, Validators.required],
        'EmployeeStartDate':[null, Validators.required],
        'EmployeeEndDate': [null, Validators.required],
        'Roles': [null, Validators.required],
      } 
    )

    this.addProject=this.formBuilder.group(
      {
        'ProjectName': [null, Validators.required],
        'ProjectDescription': [null, Validators.required],
        'ProjectTech':[null, Validators.required],
      } 
    )


   

  }


  folders: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
      id:1
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
      id:2
    }
  ]; 
  
  

  organization: Section[] = [
    {
      name: 'Nineleaps',
      updated: new Date('2/20/16'),
      id:1
    },
    {
      name: 'Uber',
      updated: new Date('1/18/16'),
      id:2
    }
  ]; 


  AddCompanyDetails(formData:NgForm)
  {

    const productData = new FormData();
    console.log(this.uploadCompany.value['CompanyName']);
    console.log();
    productData.append('EmployeeId', this.empid.toString());
    productData.append('CompanyName', this.uploadCompany.value['CompanyName'].toString());
    productData.append('Designation', this.uploadCompany.value['Designation'].toString());
    productData.append('Roles', this.uploadCompany.value['Roles'].toString());
    productData.append('EmployeeStartDate', this.uploadCompany.value['EmployeeStartDate'].toString());
    productData.append('EmployeeEndDate', this.uploadCompany.value['EmployeeEndDate'].toString());
    console.log(productData);

    this.details.AddCompanyDetails(productData, this.empid).subscribe(res => {
      
     console.log("Success in making changes");

    })
  }

  GetCompanyById(id:number)
  {


    this.currentCompanyId=id;
    console.log("Get company details of id" +id);
    this.details.getCompanyDetailsById(id).subscribe( res=>
      {
        console.log(res);
        this.EditCompany=this.formBuilder.group(
          {
            CompanyName:res.CompanyName,
            Designation:res.Designation,
            EmployeeStartDate:res.EmployeeStartDate,
            EmployeeEndDate:res.EmployeeEndDate,
            Roles:res.Roles
            
            // EmployeeId:1,
            // CompanyId:4,
            //ProjectId:1
           // EmployeeSummary:res.EmployeeSummary
          }
        )
       // this.companyDetails=res;
      
      });

     // console.log(this.companyDetails);    

  }

  ListCompany(id:number)
  {

    this.details.getCompanyDetailsById(id).subscribe( res=>
      {
        
        this.companyDetails=res;

      });

  }


  AddCompanyProject(formData:NgForm)
  {
    const productData2 = new FormData();
    //console.log(form.value.ProjectName);
    //console.log(this.CId);
    productData2.append('CompanyId', "4");
    productData2.append('EmployeeId', this.empid.toString());
    productData2.append('ProjectName', this.addProject.value['ProjectName'].toString());
    productData2.append('ProjectDescription', this.addProject.value['ProjectDescription'].toString());
    productData2.append('ProjectTech', this.addProject.value['ProjectTech'].toString());
    console.log(productData2.toString());
    this.details.AddEmployeeProjectService(productData2).subscribe(res => {
      console.log(res);
    });
  }


  GetIndividualProject(id:number)
  {

    console.log("Inside Get with id+"+ id);
    this.currentEditId=id;
    console.log(this.currentEditId);
    
  this.details.GetIndividualProjectDetails(id).subscribe( res=>
    {
      console.log(res);
      this.uploadProject=this.formBuilder.group(
        {
          ProjectName:res.ProjectName,
          ProjectDescription:res.ProjectDescription,
          ProjectTech:res.ProjectTech,
          // EmployeeId:1,
          // CompanyId:4,
          ProjectId:res.ProjectId
         // EmployeeSummary:res.EmployeeSummary
        }
      ) 
      //this.uploadProject.get('ProjectId').disable();
      //this.uploadProject.get('ProjectId').hidden();
    });
  }


  EditIndividualProject(form:NgForm)
  {


    
    console.log("Current Edit"+this.currentEditId);
    console.log(form);
    
    
  this.details.EditIndividualProject(form,this.currentEditId).subscribe( res=>
    {
      console.log("Edit done");
      this.currentEditId=null;

    });
  }


  EditCompanyDetails(form:NgForm, id)
  {

    console.log("Company project editing with API" )

    this.details.EditCompanyProject(form,id).subscribe( res=>
      {
        console.log("Edit done");
  
      });

  }

}


