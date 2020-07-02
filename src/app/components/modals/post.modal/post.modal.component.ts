import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post.modal.component.html',
  styleUrls: ['./post.modal.component.scss'],
})
export class PostModalComponent implements OnInit {  
  @Input() postId!: number;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  close(needReload: boolean = false) {
    this.modalController.dismiss({
      needReload
    });
  }
}
