import { Injectable } from '@angular/core';
import { Member } from '../../models/member.model';
import members from 'src/assets/team-members/members.json';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() { }

  teamCaptain(): Member {
    const result = members.filter((member) => member.position === 'Team Captain');
    return result[0];
  }

  engineeringManager(): Member {
    const result = members.filter((member) => member.position === 'Engineering Team Manager');
    return result[0];
  }

  businessManager(): Member {
    const result = members.filter((member) => member.position === 'Business Team Manager');
    return result[0];
  }

  // Sort members by name
  sort(first: Member, second: Member): number {
    const firstUpper = first.name.toUpperCase();
    const secondUpper = second.name.toUpperCase();
    return (firstUpper < secondUpper) ? -1 :
      (firstUpper > secondUpper) ? 1 : 0;
  }

  // Return all non-captains
  allMembers(): Member[] {
    const result = members.filter((member) => member.position === 'Member' || member.position === 'Manager');

    return result.sort((a, b) => this.sort(a, b));
  }

  // Return all managers
  allManagers(): Member[] {
    const result = members.filter((member) => member.position === 'Manager');

    return result;
  }

  // Get all members of a team
  getTeamMembers(team: string): Member[] {
    const result = members.filter((member) => member.subteam === team);

    return result.sort((a, b) => this.sort(a, b));
  }

  // Get all software team members
  getSoftwareMembers(): Member[] {
    return this.getTeamMembers('Software');
  }

  // Get all mechanical team members
  getMechanicalMembers(): Member[] {
    return this.getTeamMembers('Mechanical');
  }

  // Get all electrical team members
  getElectricalMembers(): Member[] {
    return this.getTeamMembers('Electrical');
  }

  // Get all accounting team members
  getAccountingMembers(): Member[] {
  return this.getTeamMembers('Accounting');
  }

  // Get all sponsorship team members
  getSponsorshipMembers(): Member[] {
    return this.getTeamMembers('Sponsorship');
  }

  // Get all communication team members
  getCommunicationMembers(): Member[] {
    return this.getTeamMembers('Communication');
  }

  // Get all business team members
  getBusinessMembers(): Member[] {
    const sponsorshipMembers = this.getSponsorshipMembers();
    const accountingMembers = this.getAccountingMembers();
    const communicationMembers = this.getCommunicationMembers();
    const businessMembers =  sponsorshipMembers.concat(accountingMembers.concat(communicationMembers));
    return businessMembers;
  }

}
