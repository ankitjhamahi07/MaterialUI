import { Injectable, ɵConsole } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { emp } from '../emp.model';
//import { Tech } from 'src/app/tech.model';
import { environment } from '/home/nineleaps/Desktop/material-dashboard-angular2-master/src/environments/environment';
import { EmployeeCompany } from '../EmployeeCompany.model';
import { EmployeeProjects } from '../EmployeeProjects.model';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class EmpService {
  ROOT_URL = environment.apiURL;
  formData: emp;
  data: emp[];
  CompanyData: EmployeeCompany[];
  ProjectData: EmployeeProjects[];
  EmployeeId: number = 0;
  customizeResume: boolean = false;
  constructor(private http: HttpClient) { }
 
  updateEmployeeDetails(formData:NgForm, id: number) {
    
    console.log(formData);
    return this.http.put(this.ROOT_URL + '/employees/' + id, formData);
  }

  getEmployeeById(id: number) {
    console.log(id);
    return this.http.get<any>(this.ROOT_URL + '/employees/' + id);
  }

  getEmployeeProjects(id: number) {

    return this.http.get<any>(this.ROOT_URL + '/Employees/ProjectDetails/' + id);
  }

  getUserRole(email: string) {
    return this.http.get<any>(this.ROOT_URL + '/UserRole?email=' + email);
  }


  getEmployee() {
    return this.http.get<any>(this.ROOT_URL + '/Employees')
  }

  getEmployeeTechCount() {
    return this.http.get<any>(this.ROOT_URL + '/EmployeeTechCount');
  }

  getEmployeeProjectDetails(id: number) {
    // return this.http.get<any>(this.baseUrl+'/Employees/ProjectDetails/'+id);

    return this.http.get<any>(this.ROOT_URL + '/Employees/ProjectDetails/' + id);
  }

  getEmployeeList() {
    return this.http.get<any>(this.ROOT_URL + '/EmployeeList')
  }

  getProfilePhoto(accessToken: string) {
    return this.http.get<any>('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  AddCompany(CompanyData, id: number) {
    console.log("we are in service");
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
    // body.set('CompanyId', CompanyData.get("CompanyId"));
    body.set('EmployeeId', CompanyData.get("EmployeeId"));
    body.set('CompanyName', CompanyData.get("CompanyName"));
    body.set('Designation', CompanyData.get("Designation"));
    body.set('Roles', CompanyData.get("Roles"));
    body.set('EmployeeStartDate', CompanyData.get("EmployeeStartDate"));
    body.set('EmployeeEndDate', CompanyData.get("EmployeeEndDate"));
    console.log(this.CompanyData);
    return this.http.post<any>(this.ROOT_URL + '/Companies/ ' + id, body.toString(), options);
    console.log("This is where service ends");
  }



  AddEmployeeProjectService(ProjectData) {
    console.log("we are in service of add employee projects");
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let body = new URLSearchParams();

    body.set('CompanyId', ProjectData.get("CompanyId"));
    body.set('EmployeeId', ProjectData.get("EmployeeId"));
    body.set('ProjectName', ProjectData.get("ProjectName"));
    body.set('ProjectDescription', ProjectData.get("ProjectDescription"));
    body.set('ProjectTech', ProjectData.get("ProjectTech"));
    console.log(body.toString());
    return this.http.post<any>(this.ROOT_URL + '/Projects', body.toString(), options);
    console.log("This is where service of add employee projects ends");
  }

  getCompanyDetails(id) {
    console.log(id);
    return this.http.get<any>(this.ROOT_URL + '/Companies?id=' + id);
  }

  GetEmployeeProjectDetails(id: number, cid:number) {
    console.log(id);
    return this.http.get(this.ROOT_URL + '/GetProjectData/'+id+'/'+cid);
  }

  GetEmployeeAllProjectDetails(id: number) {
    console.log(id);
    return this.http.get(this.ROOT_URL + '/GetAllProjects/'+id);
  }

  GetIndividualProjectDetails(id: number)
  {
    console.log("GetIndividualProjectDetails with id"+id);
    return this.http.get<any>(this.ROOT_URL + '/Project/'+id);

  }
  DeleteEmployeeCompany(id: number) {
    return this.http.delete(this.ROOT_URL + '/Companies/' + id);
  }

  EditIndividualProject(formData:NgForm, id:number)
  {
    console.log("Editing project with id"+id)
    console.log(formData);
    return this.http.put<any>(this.ROOT_URL + '/Projects/' + id, formData);
  }

  EditCompanyProject(formData:NgForm,id)
  {
    console.log(formData);
    return this.http.put<any>(this.ROOT_URL + '/Projects/' + id, formData);

  }


  getCompanyDetailsById(id:number)
  {
    console.log("Company" + id);
    return this.http.get<any>(this.ROOT_URL + '/CompanyById/'+4).map(res => res.json);

  }


  
  
  AddCompanyDetails(CompanyData, id)
  {
    
    console.log("Inside the service" + CompanyData.get("CompanyName"));


    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
    

    body.set('EmployeeId', CompanyData.get("EmployeeId"));
    
    body.set('CompanyName', CompanyData.get("CompanyName"));
    body.set('Designation', CompanyData.get("Designation"));
    body.set('Roles', CompanyData.get("Roles"));
    body.set('EmployeeStartDate', CompanyData.get("EmployeeStartDate"));
    body.set('EmployeeEndDate', CompanyData.get("EmployeeEndDate"));

    console.log(body.toString());
     
    return this.http.post(this.ROOT_URL+'/Companies/'+id,body.toString(), options)
  }
}

