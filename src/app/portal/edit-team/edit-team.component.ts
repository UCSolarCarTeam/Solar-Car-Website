import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Member } from 'src/app/models/member.model';
import { UserAction } from 'src/app/models/user-action';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileDeleteService } from 'src/app/services/file-delete.service';
import { MemberService } from 'src/app/services/member.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  addMemberForm: UntypedFormGroup;
  members: Member[];
  previewImgUrl: string;
  mainButtonText: string;
  image: File;
  updateMemberId: string;
  positions: string[];
  subteams: string[];
  actionHistory: UserAction[];
  deleteFlag: string;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
      this.transform = {
          ...this.transform,
          rotate: this.rotation
      };
  }

  constructor(private memberService: MemberService, private formBuilder: UntypedFormBuilder, private uploadService: FileUploadService,
              private userActionService: UserActionService, private deleteService: FileDeleteService) {
    this.addMemberForm = this.formBuilder.group({
      name: [''],
      position: [null],
      subteam: [null],
      major: [''],
      description: [''],
      year: [''],
      image: [''],
      releaseTime: ['']
    });
    this.mainButtonText = 'Add Member';
    this.positions = ['Member', 'Manager', 'Leads', 'Team Captain', 'Engineering Team Manager', 'Business Team Manager'];
    this.subteams = ['Mechanical', 'Electrical', 'Software', 'Multi-Team', 'Business'];
    this.actionHistory = [];
    this.deleteFlag = null;
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
    document.documentElement.scrollTop = 0;
  }
  
  deleteImage(){
    this.deleteFlag = this.previewImgUrl;
    this.previewImgUrl = '';
    this.image = null;
    console.log(this.deleteFlag);
    
  }

  manageMember() {
    const dateTime = this.addMemberForm.get('releaseTime').value;
    let date: string = null;
    if (dateTime !== '') {
      date = new Date(dateTime).toUTCString();
    }
    if (this.mainButtonText.startsWith('Update')) {
      if (this.deleteFlag){
        this.deleteService.deleteFile(this.deleteFlag);
      }
      if (this.image === null) {
        const newMember = {
          id: this.updateMemberId,
          name: this.addMemberForm.get('name').value,
          position: this.addMemberForm.get('position').value,
          subteam: this.addMemberForm.get('subteam').value,
          major: this.addMemberForm.get('major').value,
          description: this.addMemberForm.get('description').value,
          year: this.addMemberForm.get('year').value,
          imageName: this.previewImgUrl,
          image: null,
          releaseTime: date,
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
              image: null,
              releaseTime: date,
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
          image: null,
          releaseTime: date,
        };
        this.memberService.addMember(newMember);
      });
    });
    this.resetForm();
  }

  showActionHistory(member: Member) {
    this.actionHistory = [];
    this.userActionService.getEntityActions(member.id).then(userActions => {
      userActions.forEach((doc) => {
        this.actionHistory.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
      });
    });
    document.documentElement.scrollTop = 0;
  }
}
