import { Injectable } from '@angular/core';
import { Member } from '../team/member.model';
import members from '../../assets/team-members/members.json';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() { }

  TeamCaptain(): Member {
    const result = members.filter((member) => {
        return member.position === 'Team Captain';
    });
    return result[0];
  }

  EngineeringManager(): Member {
    const result = members.filter((member) => {
      return member.position === 'Engineering Team Manager';
    });
    return result[0];
  }

  BusinessManager(): Member {
    const result = members.filter((member) => {
        return member.position === 'Business Team Manager';
    });
    return result[0];
  }

  // Return all non-captains
  AllMembers(): Member[] {
    const result = members.filter((member) => {
      return member.position === 'Member' || member.position === 'Manager';
    });
    return result;
  }

  // Return all managers
  AllManagers(): Member[] {
    const result = members.filter((member) => {
      return member.position === 'Manager';
    });
    return result;
  }
}
