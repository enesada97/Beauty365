import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../../ceneric-service/crud-service";
import { Group } from "../../models/Group";
import { LookUp } from "../../models/LookUp";

@Injectable()
export class GroupService extends CrudService<Group, null, number> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/Groups/`);
  }
  getGroupClaims(id: number): Observable<LookUp[]> {
    return this.httpClient.get<LookUp[]>(
      environment.apiUrl + "/GroupClaims/getgroupclaimsbygroupid?id=" + id
    );
  }

  getGroupUsers(id: number): Observable<LookUp[]> {
    return this.httpClient.get<LookUp[]>(
      environment.apiUrl + "/UserGroups/getusersingroupbygroupid?id=" + id
    );
  }
  saveGroupClaims(groupId: number, claims: number[]): Observable<any> {
    var result = this.httpClient.put(
      environment.apiUrl + "/GroupClaims/",
      { GroupId: groupId, ClaimIds: claims },
      { responseType: "text" }
    );
    return result;
  }
  saveGroupUsers(groupId: number, userIds: number[]): Observable<any> {
    var result = this.httpClient.put(
      environment.apiUrl + "/UserGroups/updatebygroupid",
      { GroupId: groupId, UserIds: userIds },
      { responseType: "text" }
    );
    return result;
  }
}
