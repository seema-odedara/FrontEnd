import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  APIUrl = "/employee";

  constructor(private http: HttpClient) { }

  loginEmployee(employee: any) {
    return this.http.post(this.APIUrl + '/login', employee, { responseType: "text" });
  }

  saveEmployee(employee: any) {
    console.log(employee)
    return this.http.post(this.APIUrl + '/saveEmployee', employee, { responseType: "text" });
  }

  getAllEmployees(pageNumber: number, perPageCount: number, sortColumn: string, sortDirection: string) {
    return this.http.get<any>(this.APIUrl + '/getEmployeesByPage/' + pageNumber + '/' + perPageCount + '/' + sortColumn + '/' + sortDirection);
  }


  getAllEmployeesByName(name: String, pageNumber: number, perPageCount: number) {
    return this.http.get<any>(this.APIUrl + '/search/' + name + '/' + pageNumber + '/' + perPageCount);
  }

  getEmployeeById(id: number) {
    return this.http.get(this.APIUrl + '/getEmployeeById/' + id);
  }

  // updateEmployee(id:number, employee: any){
  //   return this.http.put(this.APIUrl + '/updateEmployeeById/' + id , employee, {responseType:"text"});
  // }

  updateEmployee(id: number, formData: FormData) {
    return this.http.put(this.APIUrl + '/updateEmployeeById/' + id, formData, {
      responseType: 'text'
    });
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.APIUrl + '/deleteEmployeeById/' + id, { responseType: "text" });
  }

  getAdminByUsername(username: String) {
    return this.http.get(this.APIUrl + '/getAdminByUsername/' + username);
  }

  // sendResetLink(email: string) {
  //   console.log("inside sendResetLink")
  //   return this.http.post(this.APIUrl +`/forgot-password`, { email });
  // }

  // resetPassword(token: string, newPassword: string) {
  //   return this.http.post(this.APIUrl + `/reset-password`, { token, newPassword });
  // }

  forgotPassword(email: string) {
    console.log(email)
    return this.http.post(this.APIUrl + `/forgot-password/${email}`, null);
  }

  validateToken(token: string) {
    return this.http.get<boolean>(this.APIUrl + `/validate-token/${token}`);
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(this.APIUrl + `/reset-password/${token}`, { "password": newPassword });
  }

  downloadExcel() {
    return this.http.get(this.APIUrl + `/DownloadExcelFromDatabase`, { responseType: 'blob' });
  }
}
