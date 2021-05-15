import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Member } from '../member.model';
import { MembersService } from '../../services/members.service';


@Component({
  selector: 'business-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  @ViewChild('paginator') paginator;
  @ViewChild('topAnchor') topAnchor;

  currentMemberList: Member[];
  membersToDisplay: Member[];
  members: Member[];
  sections: string[];
  activeSection: string;

  constructor(private m: MembersService) { }

  ngOnInit(): void {
    this.members = this.m.AllMembers();
    this.currentMemberList = this.members;
    this.setMembersToDisplay(0);
    this.sections =
    [ 'All', 'Managers', 'Mechanical', 'Electrical', 'Software', 'Business'];
    this.activeSection = this.sections[0];
  }

  gotoFirstPage(): void {
    this.setMembersToDisplay(0);
    this.paginator.firstPage();
  }

  handleControlButtonClicked(section: string): void {
    switch (section) {
      case 'All':
        this.setDisplayToAllMembers();
        break;
      case 'Managers':
        this.setDisplayToManagers();
        break;
      case 'Mechanical':
        this.setDisplayToMechanicalMembers();
        break;
      case 'Electrical':
        this.setDisplayToElectricalMembers();
        break;
      case 'Software':
        this.setDisplayToSoftwareMembers();
        break;
      case 'Business':
        this.setDisplayToBusinessMembers();
        break;
    }
    this.activeSection = section;
  }

  setMembersToDisplay(pageNumber: number): void {
    // Determine range
    const low = (0 + 9 * pageNumber);
    const high = low + 9;
    this.membersToDisplay = this.currentMemberList.slice(low, high);
  }

  setDisplayToAllMembers(): void {
    this.currentMemberList = this.m.AllMembers();
    this.gotoFirstPage();
  }

  setDisplayToSoftwareMembers(): void {
    this.currentMemberList =  this.m.getSoftwareMembers();
    this.gotoFirstPage();
  }

  setDisplayToMechanicalMembers(): void {
    this.currentMemberList = this.m.getMechanicalMembers();
    this.gotoFirstPage();
  }

  setDisplayToElectricalMembers(): void {
    this.currentMemberList = this.m.getElectricalMembers();
    this.gotoFirstPage();
  }

  setDisplayToBusinessMembers(): void {
    this.currentMemberList =  this.m.getBusinessMembers();
    this.gotoFirstPage();
  }

  setDisplayToManagers(): void {
    this.currentMemberList = this.m.AllManagers();
    this.gotoFirstPage();
  }

  handlePaginatorClicked(pageEvent) {
    this.topAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.setMembersToDisplay(pageEvent.pageIndex);
  }
}
