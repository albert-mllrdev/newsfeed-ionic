import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IPost } from '@albert/interfaces/IPost';
import { PostModalComponent } from '@albert/modals/post.modal/post.modal.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.list.component.html',
  styleUrls: ['./post.list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: IPost[] = [];
  @Output() reload = new EventEmitter();

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async showPost(postId: number){
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: {
        postId
      }
    });

    modal.onDidDismiss().then((returnData) => {
      if (returnData !== null && returnData.data.needReload) {
        this.reload.emit();
      }
    });

    return await modal.present();
  }
}
