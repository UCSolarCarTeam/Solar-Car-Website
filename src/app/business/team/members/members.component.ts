import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Member } from '../../../models/member.model';


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

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.members = [];
    this.memberService.AllMembers().subscribe(res => {
      res.docs.forEach(doc => {
        const member = doc.data() as Member;
        const date = new Date();
        const releaseTime = new Date(member.releaseTime);
        if (member.releaseTime == null || releaseTime.getTime() <= date.getTime()) {
          this.members.push(doc.data() as Member);
        }
      });
    });
    this.memberService.AllManagers().subscribe(res => {
      res.docs.forEach(doc => {
        const member = doc.data() as Member;
        const date = new Date();
        const releaseTime = new Date(member.releaseTime);
        if (member.releaseTime == null || releaseTime.getTime() <= date.getTime()) {
          this.members.push(doc.data() as Member);
        }
      });
      this.currentMemberList = this.members;
      this.setMembersToDisplay(0);
      this.sections =
      [ 'All', 'Managers', 'Mechanical', 'Electrical', 'Software', 'Business'];
      this.activeSection = this.sections[0];
    });
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
    this.currentMemberList = this.members;
    this.gotoFirstPage();
  }

  setDisplayToSoftwareMembers(): void {
    this.currentMemberList = [];
    this.members.forEach(member => {
      if (member.subteam === 'Software') {
        this.currentMemberList.push(member);
      }
    });
    this.gotoFirstPage();
  }

  setDisplayToMechanicalMembers(): void {
    this.currentMemberList = [];
    this.members.forEach(member => {
      if (member.subteam === 'Mechanical') {
        this.currentMemberList.push(member);
      }
    });
    this.gotoFirstPage();
  }

  setDisplayToElectricalMembers(): void {
    this.currentMemberList = [];
    this.members.forEach(member => {
      if (member.subteam === 'Electrical') {
        this.currentMemberList.push(member);
      }
    });
    this.gotoFirstPage();
  }

  setDisplayToBusinessMembers(): void {
    this.currentMemberList = [];
    this.members.forEach(member => {
      if (member.subteam === 'Business') {
        this.currentMemberList.push(member);
      }
    });
    this.gotoFirstPage();
  }

  setDisplayToManagers(): void {
    this.currentMemberList = [];
    this.members.forEach(member => {
      if (member.position === 'Manager') {
        this.currentMemberList.push(member);
      }
    });
    this.gotoFirstPage();
  }

  handlePaginatorClicked(pageEvent) {
    this.topAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.setMembersToDisplay(pageEvent.pageIndex);
  }
}
