import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from './models/ApiResponse';
import { Asset } from './models/Asset';
import { Employee } from './models/Employee';
import { Facility } from './models/Facility';
import { LoginRefreshReq } from './models/LoginRefreshReq';
import { LoginRequest } from './models/LoginRequest';
import { Ticket } from './models/Ticket';
import { UpdateStatusReq } from './models/UpdateStatusReq';
import { TokenService } from './token.service';
import { Resource } from './models/Resource';
// import { TicketRe } from './models/TicketResp';

const reqOptions = {
  headers: {},
};

@Injectable({
  providedIn: 'root',
})
export class RestapiService {
  private baseUrl = 'http://localhost:8080';
  accessToken: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.accessToken =
      localStorage.getItem('access_token') !== null
        ? localStorage.getItem('access_token')
        : '';
  }

  public registerAsset(assetDto: Asset) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/assets/save`,
      assetDto
    );
  }

  public getAssets() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/assets/list`);
  }
  public getAssetById(assetId: number) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/assets/${assetId}`
    );
  }

  public updateAsset(assetId: number, assetDto: Asset) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/assets/${assetId}`,
      assetDto
    );
  }

  public deleteAsset(assetId: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/assets/${assetId}`
    );
  }

  public getAssetsByFacility(facility: string) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/assets/facilities/${facility}`
    );
  }

  public addAssetByCsv(file: any) {
    var formData = new FormData();
    console.log('Inside Calling');

    formData.append('file', file);
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/assets/csv`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8',
        },
      }
    );
  }

  //Authenticate APIS:

  public login(loginRequest: LoginRequest) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/authenticate/login`,
      loginRequest
    );
  }

  public refreshLogin(refreshRequest: LoginRefreshReq) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/authenticate/login`,
      refreshRequest
    );
  }

  // Employee APIS:

  public registerEmployee(employee: Employee) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/employees/save`,
      employee
    );
  }

  public getEmployees() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/employees/list`);
  }

  public getEmployeeById(empId: number) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/employees/${empId}`
    );
  }

  public updateEmployee(empId: number, employee: Employee) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/employees/${empId}`,
      employee
    );
  }

  //Ticket APIS:

  public createTicketAndMail(ticket: Ticket) {
    var formData = new FormData();
    formData.append('ticketBody', JSON.stringify(ticket));
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/tickets/mail`,
      formData
    );
  }

  public createTicketAndMailWithAttachment(ticket: Ticket, file: File) {
    var formData = new FormData();
    formData.append('ticketBody', JSON.stringify(ticket));
    formData.append('file', file);
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/tickets/mail`,
      formData
    );
  }

  public createkRepo(asset_name: String, file: File, userId: any) {
    var formData = new FormData();
    formData.append('dto', JSON.stringify(asset_name));
    formData.append('file', file);
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/knowledgerepo/uploadfile/${userId}`,
      formData
    );
  }

  public getAllRepo() {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/knowledgerepo/list`
    );
  }

  public deleteRepo(id: Number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/knowledgerepo/${id}`
    );
  }

  public getAllTickets() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/tickets/list`);
  }

  public getAllTicketsByStatus(status: string) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/tickets/list/status/${status}`
    );
  }

  public updateTicketStatus(ticketId: UpdateStatusReq) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/tickets/status`,
      ticketId
    );
  }

  public getAllTicketsEmployeeId(empId: number) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/tickets/list/employees/${empId}`
    );
  }

  public getTicket(ticketId: String) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/tickets/${ticketId}`
    );
  }

  //Facility APIS:

  public getAllFacilities() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/facilities/list`);
  }

  public createFacility(facility: Facility) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/facilities/save`,
      facility
    );
  }

  public deleteFacility(facilityId: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/facilities/${facilityId}`
    );
  }

  ////////////////////////-resource planner-///////////////////////////////////////

  public registerResource(resourceDto: Resource) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/resource/save`,
      resourceDto
    );
  }

  public getResourceById(id: number) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/resource/${id}`);
  }
  public getAllResource() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/resource/list`);
  }
  public updateResource(id: number, resourceDto: Resource) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/resource/${id}`,
      resourceDto
    );
  }
  public deleteById(id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/resource/${id}`
    );
  }
}
// public getAssets() {
//   let headers1 = new HttpHeaders();
//   headers1.append("token", this.accessToken)
//   console.log("Tkoen", this.tokenService.getToken());
//   this.accessToken = this.tokenService.getToken()
//   console.log(headers1);
//   return this.httpClient.get<ApiResponse>(`${this.baseUrl}/assets/list`,  {headers:{"Authorization":this.accessToken}});
// }
