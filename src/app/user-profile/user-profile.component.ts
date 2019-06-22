import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeCompany } from '/home/nineleaps/Desktop/material-dashboard-angular2-master/src/EmployeeCompany.model';
import { emp } from 'emp.model';
import { EmpService } from 'app/emp.service';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Globals} from '/home/nineleaps/Desktop/material-dashboard-angular2-master/src/globalid'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[Globals]
})
export class UserProfileComponent implements OnInit {

  empid:any;
  bool: boolean;
  visib: string;
  employee: emp;
  isLoadingResults: boolean;
  viewId: number;
  employeeId:number;
  private sub: any;
  e: emp;
  //empProjects: project[];
  employeeDetails: any[];
  EmployeeId: number;
  EmployeeCompanyDetails: EmployeeCompany[];
  EmployeeProjectDetails: any[];
uploadProfile:FormGroup;

EmployeeFirstName:string='';
EmployeeLastName:string='';
EmployeeSummary:string='';
EmployeeExperience:string='';
  



  constructor( private global:Globals, private route: ActivatedRoute, private details:EmpService,
    private formBuilder: FormBuilder) { 
      this.viewId=this.global.role;
    }

  ngOnInit() {


    // this.sub = this.route.params.subscribe(params => {
    //   this.viewId = +params['id'];
    // });

  this.empid= this.global.role;
  console.log("Global Id is "+ this.viewId);
  this.loadEmpDetails(this.viewId);

   this.uploadProfile = this.formBuilder.group({
    'EmployeeFirstName' : [null, Validators.required],
    'EmployeeLastName' : [null, Validators.required],
    'EmployeeSummary' : [null, Validators.required],
    'EmployeeExperience' : [null, Validators.required]
  });
  } 

  loadEmpDetails(id) {

    this.details.getEmployeeById(this.viewId).subscribe(res => {
      this.employee = res;
      this.employeeId=res.EmployeeId;
      this.uploadProfile=this.formBuilder.group(
        {
          EmployeeFirstName:res.EmployeeFirstName,
          EmployeeLastName:res.EmployeeLastName,
          EmployeeExperience:res.EmployeeExperience,
          EmployeeSummary:res.EmployeeSummary
        }
      )
      console.log(res);
     // console.log(2);

    })
  }

  Save(form: NgForm) {
    
    
    this.details.updateEmployeeDetails(form,this.employeeId) .subscribe(res => {
    })
    
    console.log("these are the changes for id", this.employeeId );
  }
}
