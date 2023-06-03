import { Component, OnInit, VERSION } from "@angular/core";
import { NewsService } from "src/app/services/news.service";
import { News } from "src/app/models/news";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { FileUploadService } from "src/app/services/file-upload.service";

@Component({
  selector: "app-edit-news",
  templateUrl: "./edit-news.component.html",
  styleUrls: ["./edit-news.component.css"],
})
export class EditNewsComponent implements OnInit {
  addNewsForm: UntypedFormGroup;
  newsArticles: News[];
  thumbnail: File;
  previewThumbnailUrl: string;
  markdown: string;
  link: string;
  updateNewsId: string;
  mainButtonText: string;
  isLinkOnlyFormat: boolean;

  constructor(
    private newsService: NewsService,
    private uploadService: FileUploadService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.addNewsForm = this.formBuilder.group({
      name: [""],
      date: [""],
      thumnail: [""],
    });
    this.mainButtonText = "Add News Article";
    this.markdown = `Title
---
---
Something...
<img src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png">`;
    this.link = "";
    this.isLinkOnlyFormat = false;
  }

  ngOnInit(): void {
    this.newsService.getNewsArticles().subscribe((res) => {
      this.newsArticles = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as News;
      });
      this.newsArticles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    });
  }

  setThumbnail(files: any) {
    this.thumbnail = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewThumbnailUrl = event.target.result;
    };
    reader.readAsDataURL(this.thumbnail);
  }

  resetForm() {
    this.addNewsForm.reset();
    this.previewThumbnailUrl = "";
    this.updateNewsId = "";
    this.mainButtonText = "Add News Article";
    this.markdown = "";
  }

  manageNews() {
    let readMarkdown;
    let readLink;
    if (!this.isLinkOnlyFormat) {
      readMarkdown = this.markdown;
      readLink = null;
    } else {
      readMarkdown = "";
      readLink = this.link;
    }

    // Update
    if (this.mainButtonText.startsWith("Update")) {
      if (this.thumbnail === null) {
        const newNewsArticle = {
          id: this.updateNewsId,
          name: this.addNewsForm.get("name").value,
          date: this.addNewsForm.get("date").value,
          markdown: readMarkdown,
          link: readLink,
          thumbnail: null,
          thumbnailUrl: this.previewThumbnailUrl,
        };
        this.newsService.updateNews(newNewsArticle);
      } else {
        const newsId = this.updateNewsId;
        const newsName = this.addNewsForm.get("name").value;
        const newsDate = this.addNewsForm.get("date").value;
        this.uploadService
          .uploadFile(this.thumbnail, "assets/thumnails/")
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadUrl) => {
              const newNewsArticle = {
                id: newsId,
                name: newsName,
                date: newsDate,
                markdown: readMarkdown,
                link: readLink,
                thumbnail: null,
                thumbnailUrl: downloadUrl,
              };
              this.newsService.updateNews(newNewsArticle);
            });
          });
      }
      this.resetForm();
      return;
    }

    // Add
    if (this.thumbnail === null) {
      const newsName = this.addNewsForm.get("name").value;
      const newNewsArticle = {
        name: newsName,
        date: this.addNewsForm.get("date").value,
        markdown: readMarkdown,
        link: readLink,
        thumbnail: null,
        thumbnailUrl: "",
      };
      console.log(newNewsArticle);
      this.newsService.addNews(newNewsArticle);
      this.resetForm();
    } else {
      const newsName = this.addNewsForm.get("name").value;
      const newsDate = this.addNewsForm.get("date").value;
      this.uploadService
        .uploadFile(this.thumbnail, "assets/thumnails/")
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadUrl) => {
            const newNewsArticle = {
              name: newsName,
              date: newsDate,
              markdown: readMarkdown,
              link: readLink,
              thumbnail: null,
              thumbnailUrl: downloadUrl,
            };
            console.log(newNewsArticle);
            this.newsService.addNews(newNewsArticle);
          });
        });
      this.resetForm();
    }
  }

  deleteNews(news: News) {
    this.newsService.deleteNews(news);
  }

  setupNewsUpdate(news: News) {
    this.updateNewsId = news.id;
    this.addNewsForm.get("name").setValue(news.name);
    this.addNewsForm.get("date").setValue(news.date);
    this.markdown = news.markdown;
    this.link = news.link;
    this.previewThumbnailUrl = news.thumbnailUrl;
    this.thumbnail = null;
    this.mainButtonText = "Update News Article";

    if (this.link !== null) {
      this.isLinkOnlyFormat = true;
    } else {
      this.isLinkOnlyFormat = false;
    }
  }
}
