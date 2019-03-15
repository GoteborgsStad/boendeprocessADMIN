import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { Goal } from '../_models/goal/goal.model';
import { Plan } from '../_models/plan/plan.model';
import { RegUser } from '../_models/user/reg-user.model';
import { UserRelationship } from '../_models/user/user-relationship.model';
import { UserRole } from '../_models/user/user-role.model';
import { User } from '../_models/user/user.model';
import { GlobalStatus } from './../_models/user/global-status.model';
import { UserType } from './../_models/user/user-type.enum';
import { ApiService } from './api.service';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService,
  ) { }

  public me(): Observable<User> {
    return this.apiService.API('GET', '/v1/cu/users/me');
  }

  public updateMe(value: object) {
    return this.apiService.API('PATCH', '/v1/cu/users', value);
  }

  public deleteMe() {
    return this.apiService.API('DELETE', '/v1/cu/users');
  }

  public deleteUser(id: number) {
    return this.apiService.API('DELETE', '/v1/cu/users/' + id);
  }

  public updateUser(user: User) {
    // console.log(user);
    const body = new RegUser(user.user_detail);
    body.personal_identity_number = user.personal_identity_number;
    return this.apiService.API('PATCH', '/v1/cu/users/' + user.id + '/userdetails', body);
  }

  public getAssignments(id: number) {
    return this.apiService.API('GET', '/v1/cu/users/' + id + '/assignments');
  }

  public getGoals(id: number): Observable<Goal[]> {
    return this.apiService.API('GET', '/v1/cu/users/' + id + '/goals').map((data: Goal[]) => {
      const goals = new Array<Goal>();
      data.forEach((goal: Goal) => {
        goals.push(new Goal(goal));
      });
      return goals;
    });
  }

  public getPlans(id: number): Observable<Plan> {
    return this.apiService.API('GET', '/v1/cu/users/' + id + '/plans').map((data: Plan) => {
      return new Plan(data);
    });
  }

  public getUser(id: number) {
    return this.apiService.API('GET', '/v1/cu/users/' + id);
  }

  public getChat(value: number) {
    return this.apiService.API('GET', `/v1/cu/users/${value}/chats`);
  }

  public getEvaluations(id: number) {
    return this.apiService.API('GET', '/v1/cu/users/' + id + '/evaluations');
  }

  public getPlan(id: number) {
    return this.apiService.API('GET', '/v1/cu/users/' + id + '/plans');
  }

  public getUsers(userType?: UserType): Observable<User[]> {
    return this.apiService.API('GET', '/v1/cu/users').map((contactPersons: User[]) => {
      const contactPeople: User[] = [];
      contactPersons.forEach((contactPerson: User) => {
        if (userType === UserType.all) {
          contactPeople.push(new User(contactPerson));
        } else if (userType === UserType.adolescentUser && contactPerson.user_role.name === UserType.adolescentUser) {
          contactPeople.push(new User(contactPerson));
        } else if (userType === UserType.contactUser && contactPerson.user_role.name === UserType.contactUser) {
          contactPeople.push(new User(contactPerson));
        } else if (userType === UserType.systemUser) {
          contactPeople.push(new User(contactPerson));
        }
      });
      // console.log("Contacts", contactPeople);
      return contactPeople;
    });
  }

  public getUsersByType(type: string): Observable<User[]> {
    return this.apiService.API('GET', '/v1/cu/users').map((contactPersons: User[]) => {
      const contactPeople: User[] = [];
      contactPersons.forEach((contactPerson: User) => {
        // console.log('Contact', contactPerson);
        if (contactPerson.user_role.id === 1) {
          contactPeople.push(new User(contactPerson));
        }
      });
      // console.log("Contacts", contactPeople);
      return contactPeople;
    });
  }

  public getUserById(userId: number): Observable<User> {
    return this.apiService.API('GET', '/v1/cu/users/' + userId).map((user: User) => {
      // console.log(adole);
      // console.log("Contacts", contactPeople);
      return new User(user);
    });
  }

  public registerUser(user: RegUser, userRole: UserType): Observable<User> {
    return this.apiService.API('GET', '/v1/cu/userroles').flatMap((data: UserRole[]) => {
      data.forEach((element: UserRole) => {
        if (element.name === userRole) {
          user.user_role_id = element.id;
        }
      });
      return this.apiService.API('POST', '/v1/cu/users', user).map((newUser: User) => {
        return newUser;
      });
    });
  }

  public addConnections(child: User, parents: User[]) {
    const relationshipRequests: Array<Observable<any>> = [];
    parents.forEach((parent: User) => {
      const relationship = { parent_id: parent.id, user_id: child.id };
      relationshipRequests.push(this.apiService.API('POST', '/v1/cu/userrelationships', relationship));
    });
    return Observable.forkJoin(relationshipRequests).map((relationShips: UserRelationship[]) => relationShips);
  }

  public getGlobalStatuses(): Observable<GlobalStatus[]> {
    return this.apiService.API('GET', '/v1/cu/users/globalstatuses').map((data: GlobalStatus[]) => {
      const statuses: GlobalStatus[] = [];
      data.forEach((status: GlobalStatus) => {
        statuses.push(new GlobalStatus(status));
      });
      return statuses;
    });
  }

  public deleteRelationship(id: number) {
    return this.apiService.API('DELETE', '/v1/cu/userrelationships/' + id);
  }

}
