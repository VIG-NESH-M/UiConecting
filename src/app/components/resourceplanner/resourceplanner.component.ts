import {
  Component,
  enableProdMode,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee } from 'src/app/models/Employee';
import { Resource } from 'src/app/models/Resource';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';

enableProdMode();

interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-resourceplanner',
  templateUrl: './resourceplanner.component.html',
  styleUrls: ['./resourceplanner.component.css'],
})
export class ResourceplannerComponent implements OnInit {
  restApiService: any;
  change($event: boolean) {
    throw new Error('Method not implemented.');
  }

  showSubmenu: boolean = false;

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }

  @Input()
  resourceData!: Resource | null;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  isUpdateComponent: boolean = true;

  validateForm!: UntypedFormGroup;
  userData: any;

  Atype = ['Yes', 'No'];
  employees: Employee[] = [];

  isusers: boolean = false;

  ColumnItem: any;

  employeeColumns: ColumnItem[] = [
    { name: 'Id' },
    { name: 'Email' },
    { name: 'userName' },
    { name: 'Phone Number' },
    { name: 'Department' },
    { name: 'Designation' },
  ];

  options = [
    {
      label: 'Users',
      children: [
        {
          value: 'Employee',
          label: 'Employee',
          isLeaf: true,
        },
        {
          value: 'Vendor',
          label: 'Vendor',
          isLeaf: true,
        },
        {
          value: 'Contractor',
          label: 'Contractor',
          isLeaf: true,
        },
      ],
    },
    {
      label: 'Inventory',
      value: 'Inventory',
      isLeaf: true,
    },
  ];

  users = [
    { id: 1, name: 'Employee' },
    { id: 2, name: 'Vendor' },
    { id: 3, name: 'Contractor' },
  ];

  selectedUser: any;
  selectedItem: any;

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NzMessageService,
    private restService: RestapiService,
    private router: Router,
    private tokenService: TokenService
  ) {
    if (this.resourceData == null) {
      this.validateForm = this.fb.group({
        workOrderId: [null, [Validators.required]],
        resourceId: [null, [Validators.required]],
        resourceName: [null, [Validators.required]],
        resourceType: [null, [Validators.required]],
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required, Validators.pattern]],
        availability: [null, [Validators.required]],
        userId: [null, [Validators.required]],
      });
    } else {
      this.isUpdateComponent = true;
      this.validateForm = this.fb.group({
        resourceId: [this.resourceData.resourceId, [Validators.required]],
        resourceName: [this.resourceData.resourceName, [Validators.required]],
        resourceType: [this.resourceData.resourceType, [Validators.required]],
        startDate: [this.resourceData.startDate, [Validators.required]],
        endDate: [this.resourceData.endDate, [Validators.required]],
        resourceAvailability: [
          this.resourceData.availability,
          [Validators.required],
        ],
        userId: [this.resourceData.userId, [Validators.required]],
        workOrderId: [this.resourceData.workOrderId, [Validators.required]],
      });
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if (!this.isUpdateComponent) {
        this.createresourceByData(this.validateForm.value);
      } else {
        this.updateresourceData(this.validateForm.value);
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    }
    this.userData = this.tokenService.getCurrentUserData();
    this.getEmployeeDetails();
  }

  createresourceByData(resource: Resource) {
    resource.userId = this.userData.userId;
    this.restService.registerResource(resource).subscribe(
      (data: any) => {
        console.log('Success', data);
        this.notification.success('Resource Created Successfully.');
        this.router.navigateByUrl('/resourcelist');
        this.handleClose();
      },
      (error: any) => {
        console.log('Error occcured', error);
      }
    );
  }
  updateresourceData(resource: any) {
    console.log('Updating............');
    resource.userId = this.userData.userId;
    this.restService.updateResource(resource.id, resource).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('resource Updated Successfully.');
        this.router.navigateByUrl('/resource');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  handleClose() {
    this.isUpdateComponent = false;
    this.resourceData = null;
    this.close.emit();
  }

  employeeList: any = [];
  searchString: any;
  searchResults: any = [];

  getEmployeeDetails() {
    this.restApiService.getEmployees().subscribe(
      (data: any) => {
        console.log('Success', data);
        this.employeeList = data.responseData;
        this.searchResults = this.employeeList;
        this.notification.success('Employee Details is Found!');
      },
      (error: any) => {
        console.log('Error occurred', error);
        this.notification.error('Error getting the employee Details!');
      }
    );
  }
}
