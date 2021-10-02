import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from 'src/app/models/member.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  addMemberForm: FormGroup;
  members: Member[];
  previewImgUrl: string;
  mainButtonText: string;
  image: File;
  updateMemberId: string;

  constructor(private memberService: MemberService, private formBuilder: FormBuilder, private uploadService: FileUploadService) {
    this.addMemberForm = this.formBuilder.group({
      name: [''],
      position: [''],
      subteam: [''],
      major: [''],
      description: [''],
      year: [''],
      image: ['']
    });
    this.mainButtonText = 'Add Member';
  }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(res => {
      this.members = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Member;
      });
    });
  }

  setImage(files: any) {
    this.image = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImgUrl = event.target.result;
    };
    reader.readAsDataURL(this.image);
  }

  resetForm() {
    this.addMemberForm.reset();
    this.previewImgUrl = '';
    this.updateMemberId = '';
    this.mainButtonText = 'Add Member';
  }

  deleteMember(member: Member) {
    this.memberService.deleteMember(member);
  }

  setupMemberUpdate(member: Member) {
    this.updateMemberId = member.id;
    this.addMemberForm.get('name').setValue(member.name);
    this.addMemberForm.get('position').setValue(member.position);
    this.addMemberForm.get('subteam').setValue(member.subteam);
    this.addMemberForm.get('major').setValue(member.major);
    this.addMemberForm.get('description').setValue(member.description);
    this.addMemberForm.get('year').setValue(member.year);
    this.previewImgUrl = member.imageName;
    this.image = null;
    this.mainButtonText = 'Update Member';
  }

  manageMember() {
    if (this.mainButtonText.startsWith('Update')) {
      if (this.image == null) {
        const newMember = {
          id: this.updateMemberId,
          name: this.addMemberForm.get('name').value,
          position: this.addMemberForm.get('link').value,
          subteam: this.addMemberForm.get('subteam').value,
          major: this.addMemberForm.get('major').value,
          description: this.addMemberForm.get('description').value,
          year: this.addMemberForm.get('year').value,
          imageName: this.previewImgUrl,
          image: null
        };
        this.memberService.updateMember(newMember);
      } else {
        const memberId = this.updateMemberId;
        const memberName = this.addMemberForm.get('name').value;
        const memberPosition = this.addMemberForm.get('position').value;
        const memberSubteam = this.addMemberForm.get('subteam').value;
        const memberMajor = this.addMemberForm.get('major').value;
        const memberDescription = this.addMemberForm.get('description').value;
        const memberYear = this.addMemberForm.get('year').value;
        this.uploadService.uploadFile(this.image, 'assets/member_images/').then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadUrl) => {
            const newMember = {
              id: memberId,
              name: memberName,
              position: memberPosition,
              imageName: downloadUrl,
              subteam: memberSubteam,
              major: memberMajor,
              description: memberDescription,
              year: memberYear,
              image: null
            };
            this.memberService.updateMember(newMember);
          });
        });
      }
      this.resetForm();
      return;
    }
    const memberName = this.addMemberForm.get('name').value;
    const memberPosition = this.addMemberForm.get('position').value;
    const memberSubteam = this.addMemberForm.get('subteam').value;
    const memberMajor = this.addMemberForm.get('major').value;
    const memberDescription = this.addMemberForm.get('description').value;
    const memberYear = this.addMemberForm.get('year').value;
    this.uploadService.uploadFile(this.image, 'assets/member_images/').then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadUrl) => {
        const newMember = {
          name: memberName,
          position: memberPosition,
          imageName: downloadUrl,
          subteam: memberSubteam,
          major: memberMajor,
          description: memberDescription,
          year: memberYear,
          image: null
        };
        this.memberService.addMember(newMember);
      });
    });
    this.resetForm();
  }
}
