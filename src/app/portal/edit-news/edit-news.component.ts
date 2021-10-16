import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  article: File;
  previewArticleUrl: string;

  constructor(private newsService: NewsService, private uploadService: FileUploadService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }

  setArticle(files: any) {
    this.article = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //console.log(reader.result);
      this.previewArticleUrl = reader.result.toString();
    };
    reader.readAsDataURL(this.article);
  }

}
